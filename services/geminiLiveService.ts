
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from "@google/genai";
import { arrayBufferToBase64, float32ToInt16, base64ToUint8Array, decodeAudioData } from "./audioUtils";
import { FeedbackData } from "../types";

interface LiveSessionConfig {
  scenarioContext: string;
  onAudioData: (buffer: AudioBuffer) => void;
  onFeedback: (data: FeedbackData) => void;
  onClose: () => void;
  onError: (error: Error) => void;
}

const feedbackTool: FunctionDeclaration = {
  name: "provide_feedback",
  description: "Provide a structured evaluation of the user's humor attempt. Call this tool IMMEDIATELY after you respond to the user in audio.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      score: {
        type: Type.NUMBER,
        description: "A score from 1 to 10 based on humor, technique application, and timing.",
      },
      analysis: {
        type: Type.STRING,
        description: "Brief explanation of why the user's response worked or failed.",
      },
      goldenResponse: {
        type: Type.STRING,
        description: "A better or alternative witty response the user could have used.",
      },
    },
    required: ["score", "analysis", "goldenResponse"],
  },
};

export class GeminiLiveService {
  private client: GoogleGenAI;
  private session: any = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private inputSource: MediaStreamAudioSourceNode | null = null;
  private nextStartTime: number = 0;
  private config: LiveSessionConfig;

  constructor(config: LiveSessionConfig) {
    this.config = config;
    this.client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public async start() {
    try {
      // 1. Initialize Audio Context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000, // Matched with output sample rate for consistency
      });
      
      // Resume context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // 2. Setup Gemini Live Connection
      const sessionPromise = this.client.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          tools: [{ functionDeclarations: [feedbackTool] }],
          systemInstruction: `You are a professional Humor Coach based on Li Xin's book "Sense of Humor" (幽默感).
          
          Context:
          ${this.config.scenarioContext}
          
          YOUR BEHAVIOR LOOP:
          1. **Roleplay (AUDIO)**: Start by acting out the role described. Be authentic. Speak Chinese unless the user speaks English.
          2. **Listen**: Wait for the user.
          3. **React & Evaluate**: 
             - First, respond verbally as the character (e.g., laugh, get angry, or be confused).
             - THEN, IMMEDIATELY call the 'provide_feedback' tool to give a structured rating. 
             - DO NOT speak the score or the analysis. Only speak the character's reaction.
          
          Evaluation Criteria:
          - Did they use the specific target technique?
          - Was it unexpected?
          - Was it socially calibrated (not mean)?
          `,
        },
        callbacks: {
          onopen: () => {
            console.log("Gemini Live Connected");
            this.startAudioCapture(sessionPromise);
          },
          onmessage: (msg: LiveServerMessage) => this.handleMessage(msg, sessionPromise),
          onclose: () => {
            console.log("Gemini Live Closed");
            this.config.onClose();
          },
          onerror: (err: any) => {
            console.error("Gemini Live Error", err);
            this.config.onError(new Error(err.message || "Unknown error"));
          },
        },
      });

      this.session = await sessionPromise;

    } catch (error: any) {
      this.config.onError(error);
    }
  }

  private async startAudioCapture(sessionPromise: Promise<any>) {
    if (!this.audioContext) return;

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.inputSource = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      // Use ScriptProcessor for raw PCM access (Note: AudioWorklet is preferred in modern apps but this is simpler for this demo)
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        
        // Downsample to 16kHz for Gemini if needed, or send 24kHz if supported. 
        // Here we assume input is resampled by browser or accepted. 
        // Gemini often prefers 16kHz for input. Let's strictly convert if we can, 
        // but for simplicity in this setup, we rely on the context.
        // Actually, the AudioContext was created with 24000. 
        
        const pcmInt16 = float32ToInt16(inputData);
        const base64Data = arrayBufferToBase64(pcmInt16.buffer);

        sessionPromise.then(session => {
            session.sendRealtimeInput({
                media: {
                    mimeType: "audio/pcm;rate=24000", // Matches ctx sampleRate
                    data: base64Data
                }
            });
        });
      };

      this.inputSource.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error: any) {
        this.config.onError(error);
    }
  }

  private async handleMessage(message: LiveServerMessage, sessionPromise: Promise<any>) {
    // Handle Audio
    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (base64Audio && this.audioContext) {
      try {
        const audioData = base64ToUint8Array(base64Audio);
        const audioBuffer = await decodeAudioData(
            audioData, 
            this.audioContext, 
            24000,
            1
        );
        
        this.config.onAudioData(audioBuffer);
        
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        const startTime = Math.max(now, this.nextStartTime);
        source.start(startTime);
        this.nextStartTime = startTime + audioBuffer.duration;

      } catch (e) {
        console.error("Error decoding audio", e);
      }
    }

    // Handle Tool Calls (Feedback)
    if (message.toolCall) {
        const functionCalls = message.toolCall.functionCalls;
        if (functionCalls && functionCalls.length > 0) {
            const call = functionCalls[0];
            if (call.name === "provide_feedback") {
                const args = call.args as unknown as FeedbackData;
                console.log("Feedback Received:", args);
                this.config.onFeedback(args);

                // We must respond to the tool call to keep the session alive
                sessionPromise.then(session => {
                    session.sendToolResponse({
                        functionResponses: [{
                            id: call.id,
                            name: call.name,
                            response: { result: "ok" }
                        }]
                    });
                });
            }
        }
    }
  }

  public stop() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (this.processor && this.inputSource) {
      this.inputSource.disconnect();
      this.processor.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
