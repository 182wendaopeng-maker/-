
export interface KnowledgePoint {
  title: string;
  definition: string;
  coreLogic?: string; // New: Deeper explanation
  steps?: string[];   // New: How to do it step by step
  example: string;
  application: string;
}

export interface GoldenSentence {
  text: string;
  context: string;
  note: string;
}

export interface PracticeScenario {
  id: string;
  title: string;
  description: string;
  roleplayContext: string;
  targetTechnique: string;
}

export interface FeedbackData {
  score: number;
  analysis: string;
  goldenResponse: string;
}

export interface DailyCurriculum {
  day: number;
  title: string;
  knowledge: KnowledgePoint;
  sentences: GoldenSentence[];
  scenarios: PracticeScenario[];
}

export enum Tab {
  KNOWLEDGE = 'knowledge',
  SENTENCES = 'sentences',
  PRACTICE = 'practice',
}
