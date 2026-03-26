import type {
  Article,
  BreedProfile,
  CommunityPost,
  FeedingGuideRecord,
  PetProfile,
  ServiceBooking,
  ServiceProvider,
  SymptomGuide,
  TopicTag,
  TrainingStep,
  UserProfile,
} from '@/types';

export const demoUser: UserProfile = {
  id: 'user-demo',
  nickname: '小满',
  avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  bio: '新手养犬 8 个月，热衷记录边牧成长日记，也在努力学会更科学地陪伴狗狗。',
  phone: '138****5678',
  email: 'demo@wangwang.cn',
  joinedAt: '2025-10-02',
};

export const demoPets: PetProfile[] = [
  {
    id: 'pet-latte',
    name: '拿铁',
    breed: '边境牧羊犬',
    birthday: '2025-05-08',
    gender: '公',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
  },
];

export const articleSeed: Article[] = [
  {
    id: 'article-breed-choice',
    title: '第一次养狗怎么选品种？先看家庭节奏再看“颜值”',
    category: '买前必读',
    summary:
      '别急着追热门犬种，先想清楚你的作息、住房、预算和耐心。选对品种，后面会轻松很多。',
    cover:
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-01-08',
    readCount: 3221,
    likeCount: 328,
    tags: ['品种选择', '新手入门', '家庭养犬'],
    featured: true,
    relatedIds: ['article-budget', 'article-channel', 'article-socialization'],
    blocks: [
      {
        type: 'paragraph',
        text: '对新手来说，最容易忽略的不是狗狗外形，而是日常相处成本。每天遛几次、能不能接受掉毛、是否愿意花时间训练，这些决定了你和狗狗能否长期相处得舒服。',
      },
      {
        type: 'steps',
        title: '3 步完成初筛',
        items: [
          {
            title: '先看居住条件',
            description: '小户型优先考虑中小型犬，避免精力爆棚、需要大运动量的犬种。',
          },
          {
            title: '再看陪伴时间',
            description: '长期独处的家庭，不适合极度黏人、容易分离焦虑的犬种。',
          },
          {
            title: '最后看训练耐心',
            description: '如果你希望“少操心”，优先选服从性较高、性格稳定的新手友好犬种。',
          },
        ],
      },
      {
        type: 'table',
        title: '新手常见选犬误区',
        headers: ['误区', '真实情况', '建议'],
        rows: [
          ['越贵越省心', '价格高不等于适合你', '先看家庭匹配度'],
          ['小狗都好养', '幼犬更需要时间陪伴和训练', '评估自己的精力'],
          ['网红品种更稳妥', '热门犬种可能训练和护理门槛更高', '多看真实饲养反馈'],
        ],
      },
      {
        type: 'tip',
        title: '新手提醒',
        text: '如果你只有“想养”的冲动，还没明确预算和作息安排，建议先去看预算清单和日常照顾指南。',
      },
    ],
  },
  {
    id: 'article-channel',
    title: '买狗渠道怎么辨别？看 5 个信号避开高风险卖家',
    category: '买前必读',
    summary:
      '售后、疫苗记录、看犬环境、交易凭证，一个都不能少。别被“今天定能便宜”催促下单。',
    cover:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-01-15',
    readCount: 2490,
    likeCount: 210,
    tags: ['渠道鉴别', '购犬风险'],
    relatedIds: ['article-breed-choice', 'article-budget', 'article-law'],
    blocks: [
      {
        type: 'paragraph',
        text: '靠谱渠道的核心不是“会不会砍价”，而是是否愿意让你完整看到狗狗的生长环境、健康记录和交易承诺。',
      },
      {
        type: 'steps',
        title: '看渠道时必问 5 件事',
        items: [
          {
            title: '是否能看犬舍或寄养环境',
            description: '环境脏乱、拥挤、通风差，都是高风险信号。',
          },
          {
            title: '是否提供免疫记录',
            description: '至少要有基础免疫、驱虫信息，不能只靠口头保证。',
          },
          {
            title: '是否给明确售后条款',
            description: '健康问题、运输问题、退换规则都要写清楚。',
          },
        ],
      },
      {
        type: 'tip',
        title: '一条底线',
        text: '凡是拒绝见面、催付款、只发“精修视频”的渠道，都建议直接放弃。',
      },
    ],
  },
  {
    id: 'article-budget',
    title: '养狗第一年要花多少钱？一张预算清单提前看明白',
    category: '买前必读',
    summary:
      '购买、疫苗、绝育、驱虫、训练和突发就医，新手最容易低估的是“持续支出”。',
    cover:
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-02-01',
    readCount: 3010,
    likeCount: 267,
    tags: ['预算', '新手成本'],
    featured: true,
    relatedIds: ['article-breed-choice', 'article-law', 'article-feeding'],
    blocks: [
      {
        type: 'paragraph',
        text: '新手往往只记得“买狗的钱”，却忽略了后续一年里更稳定、更刚性的支出。尤其是幼犬阶段，健康、训练和用品更新都会拉高总成本。',
      },
      {
        type: 'table',
        title: '首年基础预算示例',
        headers: ['项目', '预估金额', '备注'],
        rows: [
          ['疫苗与驱虫', '¥1200 - ¥2500', '按城市与品牌差异浮动'],
          ['狗粮与零食', '¥3000 - ¥9000', '体型越大成本越高'],
          ['用品与耗材', '¥1500 - ¥4000', '笼具、窝垫、牵引、清洁等'],
          ['训练/行为纠正', '¥0 - ¥5000+', '取决于是否上课'],
          ['突发就医预备金', '¥3000+', '建议单独预留'],
        ],
      },
      {
        type: 'tip',
        title: '务实建议',
        text: '如果首年预算挤压生活质量，建议先别着急买狗，等条件更稳定时再决定。',
      },
    ],
  },
  {
    id: 'article-feeding',
    title: '幼犬到成犬怎么喂？按年龄和体重快速查表',
    category: '日常照顾',
    summary: '把复杂的营养知识变成简单查表方式，帮助新手快速制定更稳妥的喂养节奏。',
    cover:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-02-08',
    readCount: 3877,
    likeCount: 422,
    tags: ['喂食指南', '幼犬', '成犬'],
    featured: true,
    relatedIds: ['article-toilet', 'article-vaccine', 'article-symptom'],
    blocks: [
      {
        type: 'paragraph',
        text: '喂食最怕“听谁都对”，结果越喂越乱。最实用的方法，是按年龄和体重做基础判断，再根据便便、精神和体态微调。',
      },
      {
        type: 'table',
        title: '喂食节奏参考',
        headers: ['阶段', '每天餐次', '观察重点'],
        rows: [
          ['2-4 月龄', '3-4 餐', '少量多餐，避免狼吞虎咽'],
          ['4-12 月龄', '2-3 餐', '关注体重增长和便便稳定'],
          ['1 岁以上', '2 餐', '根据运动量微调'],
        ],
      },
      {
        type: 'tip',
        title: '别只盯克数',
        text: '精神状态、便便形态和体态变化，是比包装建议更重要的三个观察指标。',
      },
    ],
  },
  {
    id: 'article-toilet',
    title: '厕所训练别急吼：把“失误”变成可复制的训练步骤',
    category: '日常照顾',
    summary:
      '新手最容易在如厕训练中情绪失控。其实关键是固定时机、固定地点、固定奖励。',
    cover:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-02-12',
    readCount: 2843,
    likeCount: 351,
    tags: ['如厕训练', '行为引导'],
    relatedIds: ['article-feeding', 'article-socialization', 'article-symptom'],
    blocks: [
      {
        type: 'paragraph',
        text: '厕所训练最重要的不是“骂没骂”，而是有没有让狗狗建立“这里才是对的”的稳定记忆。清晰步骤，比情绪更有效。',
      },
      {
        type: 'steps',
        title: '训练节奏',
        items: [
          {
            title: '抓固定时机',
            description: '起床后、喝水后、吃饭后、玩耍后，都是最容易成功的窗口期。',
          },
          {
            title: '成功立刻奖励',
            description: '在正确地点完成后 3 秒内奖励，狗狗更容易建立连接。',
          },
          {
            title: '失误先清理后调整',
            description: '不要当场打骂，清理气味并缩小活动范围，重新训练即可。',
          },
        ],
      },
    ],
  },
  {
    id: 'article-vaccine',
    title: '疫苗和驱虫怎么排？新手最常用的时间线参考',
    category: '健康护理',
    summary: '时间线排清楚后，很多“要不要打”“能不能出门”的焦虑都会少很多。',
    cover:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-02-18',
    readCount: 1996,
    likeCount: 188,
    tags: ['疫苗', '驱虫', '健康护理'],
    relatedIds: ['article-symptom', 'article-feeding', 'article-law'],
    blocks: [
      {
        type: 'paragraph',
        text: '免疫计划看起来复杂，但只要按时间线梳理，你会发现核心就是：按时、连续、记录完整。',
      },
      {
        type: 'table',
        title: '基础时间线',
        headers: ['阶段', '建议动作', '备注'],
        rows: [
          ['45-60 天', '首针免疫', '遵循医院建议'],
          ['间隔 21-28 天', '第二针/第三针', '尽量别拖太久'],
          ['完成免疫后 1 周', '逐步外出', '先从低风险环境开始'],
          ['每月/每季', '内外驱虫', '看体重与产品说明'],
        ],
      },
    ],
  },
  {
    id: 'article-symptom',
    title: '狗狗突然没精神怎么办？先看症状对比，再决定观察还是就医',
    category: '健康护理',
    summary:
      '食欲下降、呕吐、腹泻、发热、跛行，不同组合背后的风险差异很大，先把紧急程度分清楚。',
    cover:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-02',
    readCount: 4160,
    likeCount: 453,
    tags: ['症状判断', '家庭观察'],
    featured: true,
    relatedIds: ['article-vaccine', 'article-feeding', 'article-toilet'],
    blocks: [
      {
        type: 'paragraph',
        text: '同样是“没精神”，如果只是运动后疲劳，和伴随呕吐、持续发热、牙龈发白，风险等级完全不同。先判断严重程度，再决定下一步。',
      },
      {
        type: 'comparison',
        title: '常见症状快速对比',
        headers: ['症状', '轻度观察', '建议就医'],
        rows: [
          ['呕吐', '偶发 1 次，精神与食欲尚可', '频繁呕吐、无法进水、伴随腹泻'],
          ['腹泻', '软便 1 次，无其他异常', '血便、持续腹泻、精神差'],
          ['跛行', '短暂扭伤，休息后缓解', '明显疼痛、无法落地、持续超过 24 小时'],
        ],
      },
      {
        type: 'tip',
        title: '重要提醒',
        text: '如果你判断不清楚，优先拍视频、记录体温和发作时间，再联系医生。',
      },
    ],
  },
  {
    id: 'article-socialization',
    title: '怕生、爱叫、拉扯牵引？社会化训练可以从生活里开始',
    category: '行为引导',
    summary:
      '很多行为问题不是“天生坏习惯”，而是缺乏安全感和稳定训练。越早开始越容易建立好行为。',
    cover:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-10',
    readCount: 2230,
    likeCount: 197,
    tags: ['社会化', '牵引训练'],
    relatedIds: ['article-toilet', 'article-breed-choice', 'article-symptom'],
    blocks: [
      {
        type: 'paragraph',
        text: '社会化训练不是“多见世面”这么简单，而是让狗狗学会在陌生声音、气味和人群中保持可控和稳定。',
      },
      {
        type: 'steps',
        title: '生活化训练建议',
        items: [
          {
            title: '从低刺激环境开始',
            description: '先在楼下安静区域练习，再逐步过渡到公园、商圈等复杂场景。',
          },
          {
            title: '奖励 calm 状态',
            description: '看到狗狗安静观察、没有爆冲时，及时夸奖和投喂。',
          },
          {
            title: '缩短高压暴露时长',
            description: '害怕时不要硬撑，适度后退，给狗狗缓冲空间。',
          },
        ],
      },
    ],
  },
  {
    id: 'article-law',
    title: '养犬前别忽略：登记、牵引和公共责任有哪些底线？',
    category: '买前必读',
    summary:
      '不同城市规定略有差异，但办证、牵引、清理排泄物、文明养犬都是基础底线。',
    cover:
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-03-12',
    readCount: 1280,
    likeCount: 119,
    tags: ['法律责任', '文明养犬'],
    relatedIds: ['article-budget', 'article-channel', 'article-vaccine'],
    blocks: [
      {
        type: 'paragraph',
        text: '在决定养犬前，建议先查清本地养犬管理规则。即使是前端演示站，我们也希望用最通俗的方式提醒新手：养狗不只是喜欢，更是一种长期责任。',
      },
      {
        type: 'tip',
        title: '底线原则',
        text: '遵守登记与免疫要求，公共空间牵引，及时清理排泄物，尊重邻里感受。',
      },
    ],
  },
];

export const breeds: BreedProfile[] = [
  {
    id: 'breed-golden',
    name: '金毛犬',
    image:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
    suitableFor: '有稳定遛狗时间、喜欢互动、家庭成员较多的家庭',
    troubleNote: '掉毛明显，幼年阶段精力旺，外出运动量不能太少',
    beginnerRating: 4,
    personality: '亲人、愿意配合，情绪表达比较直接',
    truthTalk: '“只要你愿意天天带它认真消耗体力，金毛真的会让新手感到非常有陪伴感。”',
  },
  {
    id: 'breed-corgi',
    name: '柯基犬',
    image:
      'https://images.unsplash.com/photo-1611003229186-80e40cd54966?auto=format&fit=crop&w=900&q=80',
    suitableFor: '喜欢中小型犬、能接受活泼拆家的上班族或情侣',
    troubleNote: '掉毛量大，容易兴奋吠叫，也要注意脊椎保护',
    beginnerRating: 3,
    personality: '开朗、聪明、表现欲强',
    truthTalk: '“外表可爱是真的，但掉毛和精力也很真实，别只被短腿骗了。”',
  },
  {
    id: 'breed-poodle',
    name: '贵宾犬',
    image:
      'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&w=900&q=80',
    suitableFor: '喜欢小型犬、在意掉毛少、愿意定期美容的家庭',
    troubleNote: '美容维护成本高，太久不打理容易打结',
    beginnerRating: 5,
    personality: '聪明机灵，互动性强',
    truthTalk: '“它不是完全不需要打理，而是把掉毛焦虑换成了美容焦虑。”',
  },
  {
    id: 'breed-shiba',
    name: '柴犬',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    suitableFor: '愿意理解犬只边界感、接受“有自己想法”的主人',
    troubleNote: '独立且固执，召回训练和外出牵引需要更多耐心',
    beginnerRating: 2,
    personality: '独立、敏感、很有个性',
    truthTalk: '“柴犬不是不好养，是你要接受它经常不会像视频里那样配合。”',
  },
  {
    id: 'breed-border-collie',
    name: '边境牧羊犬',
    image:
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80',
    suitableFor: '有大量陪伴时间、愿意训练和安排脑力游戏的家庭',
    troubleNote: '精力极高，不仅要遛，还要动脑；长期无聊容易出现行为问题',
    beginnerRating: 2,
    personality: '学习快，精力充沛，工作欲强',
    truthTalk: '“边牧聪明到让人惊喜，但如果你陪不住，它也会聪明到让你头疼。”',
  },
];

export const services: ServiceProvider[] = [
  {
    id: 'service-trainer-luna',
    name: 'Luna 新手训练工作室',
    type: '训练师',
    rating: 4.9,
    distanceKm: 2.3,
    priceRange: '¥199 - ¥899',
    intro: '主打新手家庭犬基础训练和分离焦虑辅导，课程强调生活场景训练。',
    image:
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=80',
    badges: ['新手友好', '上门服务', '行为评估'],
    location: '浦东新区·杨高南路',
    featured: true,
    serviceItems: [
      { name: '首次行为评估', price: '¥199', duration: '60 分钟' },
      { name: '基础口令 4 节课', price: '¥799', duration: '4 周' },
      { name: '分离焦虑干预', price: '¥899', duration: '4 周' },
    ],
    reviews: [
      {
        id: 'review-1',
        author: '晨晨',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        content: '老师会把动作拆得很细，特别适合第一次养狗的家庭，回家也知道怎么继续练。',
        createdAt: '2026-03-03',
      },
      {
        id: 'review-2',
        author: '阿威',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 4.8,
        content: '不是那种一味压制的训练方式，更多是教主人怎么在日常里建立规则。',
        createdAt: '2026-02-27',
      },
    ],
  },
  {
    id: 'service-vet-bloom',
    name: 'Bloom 宠物门诊',
    type: '兽医',
    rating: 4.8,
    distanceKm: 4.6,
    priceRange: '¥80 - ¥680',
    intro: '提供疫苗、体检、常见皮肤问题与肠胃问题诊疗，支持夜间问诊。',
    image:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80',
    badges: ['夜间接诊', '免疫档案', '新手咨询'],
    location: '徐汇区·龙华中路',
    featured: true,
    serviceItems: [
      { name: '幼犬基础体检', price: '¥159', duration: '30 分钟' },
      { name: '疫苗咨询与接种', price: '¥80 起', duration: '20 分钟' },
      { name: '肠胃专项检查', price: '¥299 起', duration: '40 分钟' },
    ],
    reviews: [
      {
        id: 'review-3',
        author: 'Mika',
        avatar:
          'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        content: '医生解释得很直白，不会一上来堆专业术语，特别适合紧张的新手主人。',
        createdAt: '2026-03-08',
      },
    ],
  },
  {
    id: 'service-hotel-paw',
    name: 'Paw Time 家庭寄养',
    type: '寄养',
    rating: 4.7,
    distanceKm: 3.8,
    priceRange: '¥168 - ¥388/天',
    intro: '小规模家庭寄养，支持视频打卡和定制喂养计划，适合社交型狗狗。',
    image:
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=80',
    badges: ['视频日报', '接送服务'],
    location: '闵行区·七莘路',
    serviceItems: [
      { name: '日托体验', price: '¥168', duration: '8 小时' },
      { name: '家庭寄养', price: '¥288/天', duration: '24 小时' },
      { name: '上门接送', price: '¥60 起', duration: '按距离计算' },
    ],
    reviews: [
      {
        id: 'review-4',
        author: '大橘',
        avatar:
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
        rating: 4.7,
        content: '每天会发视频汇报，狗狗状态看起来比较放松，临时出差时很安心。',
        createdAt: '2026-02-14',
      },
    ],
  },
  {
    id: 'service-groom-sunny',
    name: 'Sunny 宠物美容屋',
    type: '美容',
    rating: 4.6,
    distanceKm: 1.9,
    priceRange: '¥99 - ¥368',
    intro: '提供洗护、美容、基础护理，支持新手第一次到店陪同讲解。',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80',
    badges: ['美容讲解', '透明洗护'],
    location: '长宁区·定西路',
    serviceItems: [
      { name: '基础洗护', price: '¥99 起', duration: '60 分钟' },
      { name: '小体型犬美容', price: '¥198 起', duration: '90 分钟' },
      { name: '精修造型', price: '¥368 起', duration: '120 分钟' },
    ],
    reviews: [
      {
        id: 'review-5',
        author: 'Ada',
        avatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        rating: 4.6,
        content: '第一次带狗美容时店员会先讲流程，焦虑感明显少很多。',
        createdAt: '2026-03-01',
      },
    ],
  },
];

export const topics: TopicTag[] = [
  { id: 'topic-shiba', name: '#柴犬#', count: 128 },
  { id: 'topic-help', name: '#新手求助#', count: 216 },
  { id: 'topic-training', name: '#训练打卡#', count: 174 },
  { id: 'topic-health', name: '#健康观察#', count: 143 },
];

export const basePosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: demoUser.nickname,
    authorId: 'user-demo',
    avatar: demoUser.avatar,
    content:
      '拿铁今天第一次在楼下安静地和别的狗狗打招呼，没有爆冲！虽然只坚持了 10 秒，但我已经超满足了。',
    createdAt: '2026-03-18T09:30:00',
    likeCount: 36,
    heat: 92,
    topicTags: ['#训练打卡#', '#新手求助#'],
    images: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    ],
    comments: [
      {
        id: 'post-1-comment-1',
        author: '乐乐',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        content: '这已经很棒啦，慢慢来，能停下来观察就是大进步。',
        createdAt: '2026-03-18T10:10:00',
      },
    ],
  },
  {
    id: 'post-2',
    author: '球球妈',
    authorId: 'user-2',
    avatar:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
    content:
      '分享一下我家柯基的洗护清单：吸水毛巾、吹水机、脚底毛修剪器真的太实用了，新手千万别省。',
    createdAt: '2026-03-17T20:00:00',
    likeCount: 48,
    heat: 78,
    topicTags: ['#新手求助#'],
    images: [],
    comments: [
      {
        id: 'post-2-comment-1',
        author: 'Luna',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        content: '脚底毛修剪器真的很重要，家里地板防滑也要注意。',
        createdAt: '2026-03-17T20:30:00',
      },
    ],
  },
  {
    id: 'post-3',
    author: '橙子',
    authorId: 'user-3',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    content:
      '狗狗昨晚吃太快有点吐，今天精神还不错。我整理了一个“观察清单”，如果有人需要我可以发出来。',
    createdAt: '2026-03-16T14:12:00',
    likeCount: 57,
    heat: 103,
    topicTags: ['#健康观察#'],
    images: [],
    comments: [],
  },
];

export const defaultFavorites = ['article-breed-choice', 'article-feeding', 'article-symptom'];

export const defaultBookings: ServiceBooking[] = [
  {
    id: 'booking-seed-1',
    serviceProviderId: 'service-vet-bloom',
    providerName: 'Bloom 宠物门诊',
    serviceName: '幼犬基础体检',
    date: '2026-03-25',
    time: '10:00',
    petName: '拿铁',
    petBreed: '边境牧羊犬',
    note: '最近换粮后便便有点软，想顺便咨询喂食节奏。',
    status: '待确认',
    createdAt: '2026-03-20T10:00:00',
  },
];

export const feedingGuide: FeedingGuideRecord[] = [
  { age: '2-4 月龄', weight: '1-5kg', foodAmount: '55-120g/天', frequency: '3-4 餐', tips: '以幼犬粮为主，少量多餐，注意观察便便。' },
  { age: '2-4 月龄', weight: '5-15kg', foodAmount: '120-240g/天', frequency: '3-4 餐', tips: '喂完适当休息，避免剧烈奔跑。' },
  { age: '4-12 月龄', weight: '1-5kg', foodAmount: '70-140g/天', frequency: '2-3 餐', tips: '进入换牙和训练高峰期，零食总量要控制。' },
  { age: '4-12 月龄', weight: '5-15kg', foodAmount: '180-320g/天', frequency: '2-3 餐', tips: '注意体重增长速度，不要只靠狗粮包装判断。' },
  { age: '1 岁以上', weight: '1-5kg', foodAmount: '65-115g/天', frequency: '2 餐', tips: '根据运动量和体态上下浮动 10%-15%。' },
  { age: '1 岁以上', weight: '5-15kg', foodAmount: '160-280g/天', frequency: '2 餐', tips: '如果久坐少动，建议先减零食再微调正餐。' },
  { age: '7 岁以上', weight: '1-5kg', foodAmount: '55-95g/天', frequency: '2 餐', tips: '关注牙口、肠胃和关节负担，必要时咨询医生。' },
  { age: '7 岁以上', weight: '5-15kg', foodAmount: '130-230g/天', frequency: '2 餐', tips: '优先控制体重，配合轻量运动。' },
];

export const toiletTrainingSteps: TrainingStep[] = [
  {
    title: '先缩小活动范围',
    description: '让狗狗先在可控区域活动，减少“乱上厕所”的随机性，增加成功率。',
    tips: ['围栏或围挡会比放任全屋更有效。', '成功率提高后再慢慢扩大范围。'],
  },
  {
    title: '抓住高概率时机',
    description: '睡醒、喝水后、饭后和玩耍后是最容易成功的几个时间点。',
    tips: ['提前把狗狗带到目标区域。', '不要边走边玩，保持安静等待。'],
  },
  {
    title: '成功后 3 秒内奖励',
    description: '及时奖励能让狗狗更快理解“这里是对的”，延迟奖励效果会明显下降。',
    tips: ['准备高价值零食。', '奖励同时加口令，例如“尿尿真棒”。'],
  },
  {
    title: '失误只做环境管理',
    description: '打骂容易让狗狗只学会“别在你面前上”，不会真正学会去正确地点。',
    tips: ['及时清洁味道残留。', '下一轮训练缩短间隔。'],
  },
];

export const symptomGuides: SymptomGuide[] = [
  {
    id: 'symptom-vomit',
    symptom: '偶发呕吐',
    level: '尽快咨询',
    summary: '如果只是 1 次且精神尚可，可以短暂观察；反复呕吐则建议尽快咨询。',
    suggestion: ['暂停零食和油腻食物', '少量多次补水', '记录呕吐频次和内容'],
  },
  {
    id: 'symptom-bloody-diarrhea',
    symptom: '血便 / 持续腹泻',
    level: '立即就医',
    summary: '出现血便、持续腹泻或精神明显变差时，应尽快就医，不建议继续拖延观察。',
    suggestion: ['立即联系医院', '记录发作时间', '尽量保留粪便照片供医生判断'],
  },
  {
    id: 'symptom-low-appetite',
    symptom: '食欲下降但精神尚可',
    level: '观察即可',
    summary: '如果只是一两顿食欲下降、精神和排便正常，可先在家观察 12-24 小时。',
    suggestion: ['减少零食干扰', '观察便便和饮水', '若伴随呕吐发热则升级处理'],
  },
  {
    id: 'symptom-limping',
    symptom: '跛行 / 不愿落地',
    level: '尽快咨询',
    summary: '如果休息后仍不愿落地，或触碰明显疼痛，建议尽快就诊拍片评估。',
    suggestion: ['限制跑跳', '避免自行按摩', '观察是否有外伤或指甲劈裂'],
  },
];

