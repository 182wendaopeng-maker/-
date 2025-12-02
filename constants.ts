
import { DailyCurriculum } from './types';

export const CURRICULUM: DailyCurriculum[] = [
  {
    day: 1,
    title: "Day 1: 错位逻辑 (Misdirection)",
    knowledge: {
      title: "错位逻辑与预期违背",
      definition: "幽默的本质是'情理之中，意料之外'。通过建立一个常规的心理预期，然后用一个出人意料但又合乎另一种逻辑的结局来打破它。",
      coreLogic: "铺垫 (Setup) + 连接词 (Connector) + 包袱 (Punchline)。关键在于找到一个'连接词'（通常是双关语或多义情境），前半段用它的常规含义误导听众，后半段突然切换到它的另一个含义。",
      steps: [
        "1. 聆听对方的话，找到那个可以被'曲解'的关键词。",
        "2. 在脑海中建立对方期待的常规回答（方向A）。",
        "3. 寻找该关键词的冷门或字面含义（方向B）。",
        "4. 顺着方向B给出回答，制造惊奇感。"
      ],
      example: "推销员：'大哥，买房吗？升值空间大。' 我：'我有恐高症，受不了太大的升值空间。'（曲解'升值'为'升高'）",
      application: "适用于推销电话、尴尬提问、化解严肃气氛。当你想拒绝别人又不想太生硬时，错位逻辑是最好的武器。",
    },
    sentences: [
      {
        text: "大家应该热爱小动物，因为它们非常好吃。",
        context: "大张伟名言。打破'保护动物'的常规道德预期。",
        note: "连接词：'热爱'（情感 vs 食欲）。",
      },
      {
        text: "乃悟酒后驾车，被交警拦下。交警问：'受伤了没有？' 乃悟：'没有，就是心有点痛。'",
        context: "面对严肃询问时的错位回答。",
        note: "连接词：'受伤'（身体 vs 心理）。",
      },
      {
        text: "我也想做一个优雅的淑女，是生活把老娘逼成了泼妇。",
        context: "自我辩解时的反转。",
        note: "预期是励志故事，结果是无奈吐槽。",
      }
    ],
    scenarios: [
      {
        id: "d1-s1",
        title: "朋友的凡尔赛",
        description: "朋友假装抱怨：'哎，我的新跑车底盘太低了，过减速带老是磕到底，好烦啊。' 请用错位逻辑'回怼'。",
        targetTechnique: "曲解重点",
        roleplayContext: "Role: You are a friend showing off your expensive sports car by complaining about it. Task: Complain about the 'low chassis' problem. If user sympathizes, continue bragging. If user misdirects (e.g., 'Yeah, that's why I take the bus, the chassis is high'), laugh and act impressed.",
      },
      {
        id: "d1-s2",
        title: "推销电话轰炸",
        description: "推销员：'先生，我是XX理财的，我们有个年化20%的项目...' 用错位逻辑拒绝。",
        targetTechnique: "逻辑滑坡",
        roleplayContext: "Role: You are an aggressive scammer/salesperson. 'Sir, 20% return guaranteed! Do you want to be rich?'. Task: Push the sale. If user says 'No money', push loans. If user says something absurd (e.g., 'Can I pay with monopoly money?'), act confused.",
      },
      {
        id: "d1-s3",
        title: "借钱的艺术",
        description: "多年不联系的同学突然发微信：'老同学，最近手头紧吗？想借点钱。' 用错位逻辑拒绝。",
        targetTechnique: "字面曲解",
        roleplayContext: "Role: You are a distant classmate asking for money. 'Hey, long time no see. Can I borrow 5000?'. Task: Guilt trip them. If user says 'I am broke', say 'You possess a job'. If user misdirects (e.g., 'My hands are very tight, I can't open my wallet'), give up.",
      },
      {
        id: "d1-s4",
        title: "面试官的刁难",
        description: "面试官：'我们公司加班很多，你能接受996吗？' 用错位逻辑幽默化解（不要直接怼，也不要卑微接受）。",
        targetTechnique: "偷换概念",
        roleplayContext: "Role: You are a tough HR. 'We work 996 here. Can you handle the pressure?'. Task: Test their resilience. If user says 'Yes', look bored. If user uses humor (e.g., 'Does 996 mean 9am to 9pm, 6 days? I thought it meant 9 beers, 9 pizzas, 6 friends'), laugh.",
      },
      {
        id: "d1-s5",
        title: "相亲尴尬时刻",
        description: "相亲对象：'你真人好像比照片胖一点啊？' 用错位逻辑化解尴尬。",
        targetTechnique: "重新定义",
        roleplayContext: "Role: You are a rude date. 'You look fatter than your profile pic.' Task: Be judgmental. If user gets mad, leave. If user jokes (e.g., 'That's because my phone camera slims people down, I am actually 3D printed'), laugh.",
      }
    ]
  },
  {
    day: 2,
    title: "Day 2: 自嘲 (Self-Deprecation)",
    knowledge: {
      title: "自嘲是你的铠甲",
      definition: "自嘲不是自我贬低，而是以一种'高姿态'主动展示自己的无伤大雅的缺点。这是一种自信的表现，能迅速降低他人的防御心。",
      coreLogic: "我吃亏 + 对方占便宜 = 优越感。通过降低自己的身份或能力，让听众产生心理上的优越感，从而感到安全和快乐。",
      steps: [
        "1. 诚实面对自己的缺点（胖、穷、矮、单身、发际线...）。",
        "2. 将这个缺点进行极度的夸张，甚至荒诞化。",
        "3. 在合适的时机（如自我介绍、被批评、气氛紧张时）抛出。",
        "4. 态度要坦然，不要让人觉得你真的很自卑。"
      ],
      example: "别人说我腿粗。我说：'对啊，大象腿嘛，稳重！台风来了只有我能站在原地不动。'",
      application: "初次见面打破僵局、犯错后寻求原谅、面对他人攻击时以退为进。",
    },
    sentences: [
      {
        text: "虽然我长得丑，但是我想得美啊。",
        context: "回应外貌评价。",
        note: "心态要极其自信。",
      },
      {
        text: "我的钱包就像洋葱，每次打开都让我泪流满面。",
        context: "朋友聚会哭穷。",
        note: "生动的比喻。",
      },
      {
        text: "我不是单身狗，我是孤狼，还是不回家的那种。",
        context: "回应情感状态。",
        note: "把凄惨说成潇洒。",
      }
    ],
    scenarios: [
      {
        id: "d2-s1",
        title: "新公司自我介绍",
        description: "入职第一天，大家都在看你。请用一个关于自己外貌或名字的自嘲梗来破冰。",
        targetTechnique: "人设自嘲",
        roleplayContext: "Role: You are a colleague at a welcome meeting. 'Welcome! Tell us a bit about yourself.' Task: Be polite but reserved. If user brags, stay polite. If user cracks a self-deprecating joke (e.g., about their hair line or name), laugh warmly.",
      },
      {
        id: "d2-s2",
        title: "工作搞砸了",
        description: "你把PPT格式弄乱了，被领导发现了。用自嘲（不是找借口）来缓解领导的怒气。",
        targetTechnique: "主动示弱",
        roleplayContext: "Role: You are a detail-oriented boss. 'Look at this slide! The fonts are all over the place.' Task: Scold them. If user argues, get mad. If user admits it with a joke (e.g., 'My artistic style is Abstract Chaos'), chuckle and correct them.",
      },
      {
        id: "d2-s3",
        title: "被夸奖'富二代'",
        description: "朋友看你买了新手机，调侃你是'隐形富豪'。用哭穷式自嘲回应。",
        targetTechnique: "比惨",
        roleplayContext: "Role: You are a friend. 'Wow, iPhone 16? You must be secretly rich!' Task: Tease them. If user agrees, be jealous. If user self-deprecates (e.g., 'I am eating dirt for the next 6 months'), laugh.",
      },
      {
        id: "d2-s4",
        title: "才艺展示的尴尬",
        description: "年会强行被拉上去唱歌，但你五音不全。上台前说一句自嘲的话。",
        targetTechnique: "降低预期",
        roleplayContext: "Role: You are the MC hosting the party. 'Next up, [User] will give us a song!' Task: Hype the crowd. If user is nervous, encourage them. If user jokes (e.g., 'Get your earplugs ready, the weapon is loaded'), laugh.",
      },
      {
        id: "d2-s5",
        title: "忘词了",
        description: "正在做演讲，突然忘词了。与其尴尬沉默，不如自嘲一下脑容量。",
        targetTechnique: "坦然面对",
        roleplayContext: "Role: You are an audience member listening. The user suddenly stops speaking. Task: Look confused. If user panics, feel awkward. If user jokes (e.g., 'Buffering... my brain needs an update'), laugh.",
      }
    ]
  },
  {
    day: 3,
    title: "Day 3: 温柔冒犯 (Roast)",
    knowledge: {
      title: "吐槽与温柔冒犯",
      definition: "吐槽是一种'攻击'，但因为包裹了幽默的糖衣，所以被称为温柔冒犯。它能拉近关系，表达真实的（负面）情绪，或者指出显而易见的荒谬。",
      coreLogic: "攻击性 (Aggression) + 安全感 (Safety) = 幽默。关键在于'对事不对人'，或者攻击对方明显的、无伤大雅的特点。",
      steps: [
        "1. 观察对方的言行，找到不合理、虚伪或夸张的地方（槽点）。",
        "2. 运用'把球踢回去'的技巧，用对方的逻辑打败对方。",
        "3. 或者运用'夸张'，将对方的荒谬放大到极致。",
        "4. 确保语气是调侃的，而不是真的愤怒。",
      ],
      example: "朋友：'我又胖了。' 我：'没事，你这不叫胖，是对生活过敏导致的肿胀。'",
      application: "熟人互怼、反击凡尔赛、聚会活跃气氛、回击无礼冒犯。",
    },
    sentences: [
      {
        text: "你这人没啥缺点，就是优点不明显。",
        context: "评价损友。",
        note: "适合关系好的人。",
      },
      {
        text: "别说话，让我感受一下你那迷人的智商。",
        context: "对方说了蠢话时。",
        note: "语气要夸张，否则像骂人。",
      },
      {
        text: "你长得真有创意，活得真有勇气。",
        context: "回击恶意攻击。",
        note: "防御性吐槽。",
      }
    ],
    scenarios: [
      {
        id: "d3-s1",
        title: "亲戚的夺命连环问",
        description: "过年回家，亲戚问：'工资多少啊？买房了吗？' 用温柔冒犯（把球踢回去）来回击。",
        targetTechnique: "反客为主",
        roleplayContext: "Role: You are a nosy auntie at a family dinner. 'So, how much do you make a month? Enough for a house?' Task: Be persistent. If user answers seriously, judge them. If user roasts back gently (e.g., 'Auntie, you ask so much, are you planning to inherit my debt?'), laugh shocked.",
      },
      {
        id: "d3-s2",
        title: "朋友的凡尔赛",
        description: "朋友发朋友圈：'哎呀，老公又送了一个爱马仕，颜色我不喜欢，好烦。' 当面吐槽她。",
        targetTechnique: "揭穿假象",
        roleplayContext: "Role: You are a friend showing off a bag. 'Ugh, this color is so ugly, but he insisted.' Task: Show off. If user praises, be happy. If user roasts (e.g., 'Give it to me, I love ugly things'), laugh.",
      },
      {
        id: "d3-s3",
        title: "面对只会画饼的老板",
        description: "老板：'大家好好干，明年公司上市，大家都能财富自由！' (大家知道没戏)。吐槽这个'饼'。",
        targetTechnique: "指出屋里的大象",
        roleplayContext: "Role: You are an optimistic boss giving a speech. 'Next year, IPO! We will all be rich!' Task: Be inspiring. If user cheers, be happy. If user makes a subtle roast (e.g., 'Boss, I am full from the pie already'), laugh awkwardly.",
      },
      {
        id: "d3-s4",
        title: "各种迟到的朋友",
        description: "朋友迟到了一个小时才来，理由是'出门找不到袜子'。吐槽他。",
        targetTechnique: "夸张逻辑",
        roleplayContext: "Role: You are a late friend. 'Sorry! I couldn't find my socks!' Task: Make excuses. If user is mad, apologize. If user roasts (e.g., 'Did you knit the socks yourself before coming?'), laugh.",
      },
      {
        id: "d3-s5",
        title: "尴尬的沉默",
        description: "电梯里只有你和不熟的同事，气氛死寂。用吐槽这个尴尬氛围来破冰。",
        targetTechnique: "元幽默(吐槽尴尬本身)",
        roleplayContext: "Role: You are a colleague in an elevator. Silence. Task: Look at phone. If user says 'Hi', say 'Hi'. If user jokes about the silence (e.g., 'The elevator music is really banging today'), laugh.",
      }
    ]
  }
];
