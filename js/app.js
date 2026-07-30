/* ============================================
   棒棒冰工作台 - 核心逻辑
   六大模块：每日任务 / 记账 / 论文 / 考公 / 求职 / 健身
   数据持久化：localStorage
   ============================================ */

/* 申论金句推荐库（联网搜集精选，持续扩充） */
const GOLDEN_SENTENCES_LIBRARY = {
    '开头': [
        { content: '不谋全局者，不足谋一域。', source: '陈澹然《寤言》' },
        { content: '治国安邦，重在基础；管党治党，重在基层。', source: '人民日报' },
        { content: '民为邦本，本固邦宁。', source: '《尚书·五子之歌》' },
        { content: '时代浪潮奔涌向前，XX既是时代课题，也是发展命题。唯有XX，方能XX。', source: '申论模板' },
        { content: '征程万里风正劲，重任千钧再出发。面对XX挑战，必须以XX破局。', source: '申论模板' },
        { content: '从历史深处走来，向美好未来奔去。XX关乎民生、连着发展、系着大局。', source: '申论模板' },
        { content: '发展永无止境，奋斗未有穷期。在XX背景下，XX是必答题而非选择题。', source: '申论模板' },
        { content: '明者因时而变，知者随事而制。', source: '桓宽《盐铁论》' },
        { content: '察势者智，驭势者赢。把握时代脉搏，方能行稳致远。', source: '人民日报评论' },
        { content: '问题是时代的声音，人心是最大的政治。', source: '人民日报' },
        { content: '百年未有之大变局加速演进，XX既是挑战也是机遇。', source: '申论热点模板' },
        { content: '九层之台，起于累土；千里之行，始于足下。', source: '《老子》' }
    ],
    '论证': [
        { content: '兼听则明，偏信则暗。', source: '《资治通鉴》' },
        { content: '千里之行，始于足下。', source: '《老子》' },
        { content: '知己知彼，百战不殆。', source: '《孙子兵法》' },
        { content: '水滴石穿，非一日之功。', source: '经典名言' },
        { content: '以XX为引领，筑牢XX思想根基。', source: '申论万能句式' },
        { content: '以XX为抓手，破解XX现实难题。', source: '申论万能句式' },
        { content: '以XX为保障，推动XX长远发展。', source: '申论万能句式' },
        { content: '筑牢XX"压舱石"，激活发展"动力源"。', source: '申论模板' },
        { content: '下好XX"先手棋"，打好发展"主动仗"。', source: '申论模板' },
        { content: '牵住XX"牛鼻子"，走好改革"长征路"。', source: '申论模板' },
        { content: '善弈者谋势，善治者谋全局。', source: '人民日报评论' },
        { content: '物之不齐，物之情也。承认差异、包容多样，才能和谐共处。', source: '《孟子》化用' },
        { content: '堤溃蚁穴，气泄针芒。细节决定成败，小处不可马虎。', source: '《韩非子》化用' },
        { content: '一语不能践，万卷徒空虚。理论贵在实践，政策重在落实。', source: '林逋《省心录》' }
    ],
    '对策': [
        { content: '磨刀不误砍柴工。', source: '经典名言' },
        { content: '工欲善其事，必先利其器。', source: '《论语·卫灵公》' },
        { content: '无以规矩，不成方圆。', source: '《孟子·离娄上》' },
        { content: '提高站位，强化思想引领。', source: '对策模板' },
        { content: '聚焦重点，狠抓任务落实。', source: '对策模板' },
        { content: '健全机制，夯实制度保障。', source: '对策模板' },
        { content: '整合资源，凝聚工作合力。', source: '对策模板' },
        { content: '改进作风，提升执行效能。', source: '对策模板' },
        { content: '强化监督，确保落地见效。', source: '对策模板' },
        { content: '坚持问题导向、目标导向、结果导向相统一。', source: '人民日报评论' },
        { content: '既要因地制宜、分类施策，又要统筹兼顾、协调推进。', source: '申论对策模板' },
        { content: '从源头上防范、从制度上规范、从执行上发力。', source: '申论对策模板' }
    ],
    '过渡': [
        { content: '思想上"零偏差"，行动上"零温差"，落实上"零落差"。', source: '申论句式' },
        { content: '既要"看得见的改变"，也要"摸得着的实惠"；既要"当下改"，也要"长久立"。', source: '申论句式' },
        { content: '顶层设计与基层探索相结合，整体推进与重点突破相结合。', source: '申论句式' },
        { content: '以XX破题，激活XX"一池春水"。', source: '高分进阶句式' },
        { content: '以XX聚力，绘就XX"时代画卷"。', source: '高分进阶句式' },
        { content: '从"有没有"转向"好不好"，从"办得了"转向"办得好"。', source: '人民日报评论' },
        { content: '让"软指标"变成"硬约束"，让"要我干"变成"我要干"。', source: '申论过渡句式' }
    ],
    '结尾': [
        { content: '行百里者半九十。', source: '《战国策·秦策》' },
        { content: '路漫漫其修远兮，吾将上下而求索。', source: '屈原《离骚》' },
        { content: '道阻且长，行则将至；行而不辍，未来可期。', source: '经典名言' },
        { content: '征程万里风正劲，重任千钧再出发。以XX为翼，以XX为帆，必能XX。', source: '结尾模板' },
        { content: '时代呼唤担当，使命催人奋进。以实干笃定前行，以实绩回报人民。', source: '结尾模板' },
        { content: '功崇惟志，业广惟勤。以久久为功的韧劲，推动XX行稳致远。', source: '结尾模板' },
        { content: '初心如磐，使命在肩。让XX落地生根、开花结果，书写新时代答卷。', source: '结尾模板' },
        { content: '风好正是扬帆时，策马扬鞭再奋蹄。以XX之力，筑XX之业。', source: '结尾模板' },
        { content: '星光不问赶路人，时光不负有心人。以XX为笔，书写XX新篇章。', source: '申论结尾模板' },
        { content: '蓝图已绘就，奋进正当时。以"咬定青山不放松"的韧劲，推动XX落地见效。', source: '申论结尾模板' }
    ],
    '主题金句': [
        { content: '民族要复兴，乡村必振兴。', source: '乡村振兴战略' },
        { content: '让农业成为有奔头的产业，让农民成为有吸引力的职业，让农村成为安居乐业的美丽家园。', source: '乡村振兴' },
        { content: '绿水青山就是金山银山。', source: '生态文明思想' },
        { content: '生态保护与经济发展不是非此即彼的"单选题"，而是相辅相成的"共赢题"。', source: '生态文明' },
        { content: '文化兴则国运兴，文化强则民族强。', source: '文化自信' },
        { content: '以时代精神激活中华优秀传统文化的生命力。', source: '文化自信' },
        { content: '治国有常，利民为本。', source: '《淮南子》化用' },
        { content: '社会治理需从"管理"向"服务"转型，从"单一"向"多元"升级。', source: '社会治理' },
        { content: '高质量发展是全面建设社会主义现代化国家的首要任务。', source: '党的二十大报告' },
        { content: '新旧动能转换需以创新为第一动力，以改革为根本保障。', source: '高质量发展' },
        { content: '科技是第一生产力、人才是第一资源、创新是第一动力。', source: '党的二十大报告' },
        { content: '民之所忧，我必念之；民之所盼，我必行之。', source: '新年贺词' },
        { content: '江山就是人民，人民就是江山。', source: '党的二十大报告' },
        { content: '营商环境就是生产力，优化营商环境就是解放生产力。', source: '经济日报评论' },
        { content: '粮食安全是"国之大者"，耕地是粮食生产的命根子。', source: '人民日报评论' },
        { content: '数字技术正以新理念、新业态、新模式全面融入人类经济、政治、文化、社会、生态文明建设各领域。', source: '人民日报' }
    ]
};

/* 申论案例库（真实政策案例，持续扩充） */
const ESSAY_CASES_LIBRARY = [
    {
        title: '浙江"千万工程"造就美丽乡村',
        category: '乡村振兴',
        content: '2003年，浙江启动"千村示范、万村整治"工程，用15年时间对全省乡村进行全面整治。从垃圾收集、卫生改厕、河道清淤起步，逐步扩展到道路硬化、村庄绿化、设施配套。到2018年，浙江农村人居环境质量位居全国前列，农家乐年收入超300亿元，实现了从"脏乱差"到"绿富美"的蝶变。2018年荣获联合国"地球卫士奖"。',
        source: '人民日报、新华社',
        insight: '适用主题：乡村振兴、生态文明、久久为功、基层治理。核心启示：坚持一张蓝图绘到底，一任接着一任干，以"功成不必在我"的胸怀推动长远发展。'
    },
    {
        title: '福建宁德"滴水穿石"扶贫实践',
        category: '脱贫攻坚',
        content: '上世纪80年代，习近平同志在福建宁德工作时提出"滴水穿石""弱鸟先飞"的扶贫理念。宁德通过发展大黄鱼养殖、茶叶种植等特色产业，从"老少边岛贫"地区蜕变为全国脱贫攻坚样板。30多年间，宁德GDP从20多亿元增长到3000多亿元，8个省级扶贫开发工作重点县全部摘帽。',
        source: '新华社、《习近平在宁德》',
        insight: '适用主题：脱贫攻坚、产业扶贫、久久为功。核心启示：扶贫要立足本地资源禀赋，以"滴水穿石"的韧劲走特色发展之路，不搞形象工程。'
    },
    {
        title: '上海"一网通办"数字政府改革',
        category: '数字治理',
        content: '2018年，上海推出"一网通办"政务服务平台，将全市2300多项政务服务事项整合到一个平台，实现"进一张网、办所有事"。市民可通过手机APP办理户籍、社保、就医等业务，企业可在线办理注册、审批等手续。截至2023年，实名注册用户超3600万，办件量超3亿件，办事时限平均缩短60%以上。',
        source: '人民日报、上海发布',
        insight: '适用主题：数字政府、营商环境、为民服务、改革创新。核心启示：以技术赋能政务服务，让数据多跑路、群众少跑腿，是提升治理效能的关键路径。'
    },
    {
        title: '河北塞罕坝林场生态建设奇迹',
        category: '生态文明',
        content: '塞罕坝曾经是"黄沙遮天日，飞鸟无栖树"的荒漠。1962年，369名青年组建塞罕坝林场，在极端恶劣条件下植树造林。经过三代人60年接续奋斗，建成112万亩人工林，森林覆盖率达80%，每年涵养水源2.84亿立方米、释放氧气59.8万吨。2017年获联合国"地球卫士奖"。',
        source: '人民日报、中央电视台',
        insight: '适用主题：生态文明、绿色发展、艰苦奋斗、代际传承。核心启示：生态建设需"前人栽树后人乘凉"的长远眼光，一茬接着一茬干，终能荒漠变林海。'
    },
    {
        title: '北京"接诉即办"基层治理创新',
        category: '基层治理',
        content: '2019年起，北京以12345市民热线为切入点，建立"接诉即办"机制。市民诉求直达街乡镇，7天内反馈办理结果，每月排名通报。2022年，共受理诉求超7800万件，响应率100%、解决率95%、满意率93%。推动解决老旧小区改造、物业纠纷等难题，群众获得感显著提升。',
        source: '人民日报、北京日报',
        insight: '适用主题：基层治理、为民服务、体制机制创新。核心启示：以群众诉求为指挥棒，倒逼部门履职，打通服务群众"最后一公里"，是超大城市治理的有效路径。'
    },
    {
        title: '贵州"村超"火爆出圈的文化现象',
        category: '文化振兴',
        content: '2023年夏，贵州榕江县"村超"（乡村足球超级联赛）火爆全网。赛事由村民自发组织，参赛球队20支，球员均为普通村民。现场观众最多超5万人，全网浏览量超480亿次。带动当地旅游收入超50亿元，推动农特产品销售、民族文化展示，成为文体旅融合发展的典范。',
        source: '新华社、央视新闻',
        insight: '适用主题：乡村振兴、文化自信、群众主体、融合发展。核心启示：尊重群众首创精神，以文化为魂、体育为媒，可激活乡村发展内生动力。'
    },
    {
        title: '深圳"先行示范"改革创新实践',
        category: '改革创新',
        content: '深圳从1980年设立经济特区时GDP仅1.96亿元，发展到2023年GDP超3.4万亿元，增长了1.7万倍。从"三来一补"加工贸易起步，逐步转型为以高新技术产业、金融业、现代物流业为主体的现代产业体系。PCT国际专利申请量连续20年全国第一，诞生了华为、腾讯、比亚迪等世界级企业。',
        source: '人民日报、经济日报',
        insight: '适用主题：改革创新、高质量发展、产业升级、对外开放。核心启示：敢闯敢试是改革精髓，产业升级是发展核心，创新驱动是第一动力。'
    },
    {
        title: '浙江"枫桥经验"60年历久弥新',
        category: '基层治理',
        content: '1963年，浙江诸暨枫桥镇创造"发动和依靠群众，坚持矛盾不上交，就地解决"的"枫桥经验"。60年来，枫桥经验从社会治安扩展到基层治理各领域，发展为"小事不出村、大事不出镇、矛盾不上交"的基层社会治理模式。全国已建各类调解组织70多万个，年均化解矛盾纠纷上千万件。',
        source: '人民日报、法治日报',
        insight: '适用主题：基层治理、矛盾化解、群众路线。核心启示：治理重心在基层，力量源泉在群众，预防优于处置，调解优于裁判。'
    },
    {
        title: '江苏苏州工业园"中新合作"模式',
        category: '对外开放',
        content: '1994年，中国与新加坡合作建设苏州工业园区，开创了跨国合作开发新模式。园区从一片鱼塘发展成现代化新城，累计吸引外资企业超5000家，实际利用外资超350亿美元。园区借鉴新加坡公共管理经验，在全国率先推行"一站式"服务、"亲商"理念，成为营商环境标杆。',
        source: '人民日报、新华社',
        insight: '适用主题：对外开放、营商环境、制度创新、高质量发展。核心启示：开放促改革、改革促发展，借鉴国际先进经验要与本地实际相结合。'
    },
    {
        title: '甘肃八步沙"六老汉"治沙三代人',
        category: '生态文明',
        content: '1981年，甘肃古浪县八步沙林场6位老人承包治理7.5万亩荒漠。三代人接力治沙38年，累计完成治沙造林21.7万亩，管护封沙育林草37.6万亩。曾经的荒漠变为绿洲，阻止了腾格里沙漠南侵。2019年，八步沙林场"六老汉"三代人治沙群体被授予"时代楷模"称号。',
        source: '人民日报、中央电视台',
        insight: '适用主题：生态文明、艰苦奋斗、代际传承、初心使命。核心启示：生态保护需要愚公移山的精神，一代人有一代人的担当，久久为功方能见效。'
    },
    {
        title: '成都公园城市建设的探索实践',
        category: '生态文明',
        content: '2018年，成都提出建设"公园城市"，将生态价值纳入城市发展核心考量。建设天府绿道1.7万公里，串联生态区、公园、小游园和微绿地。2023年，成都森林覆盖率达40.7%，空气质量优良天数达300天以上。公园城市建设带动了文旅、体育、康养等绿色产业发展，GDP突破2.2万亿元。',
        source: '人民日报、四川日报',
        insight: '适用主题：生态文明、城市治理、高质量发展。核心启示：城市发展与生态保护可以共生共赢，以绿为底、以文为魂，塑造城市独特魅力。'
    },
    {
        title: '浙江安吉"两山"理念发源地实践',
        category: '生态文明',
        content: '2005年，习近平同志在浙江安吉余村考察时首次提出"绿水青山就是金山银山"理念。安吉关停矿山水泥厂，发展生态旅游、白茶产业和竹产业。2023年，安吉白茶产值超32亿元，竹产业产值超150亿元，农民人均收入近4.6万元。余村从"卖石头"到"卖风景"，成为"两山"转化样板。',
        source: '人民日报、浙江日报',
        insight: '适用主题：生态文明、绿色发展、产业转型、乡村振兴。核心启示：保护生态就是保护生产力，改善生态就是发展生产力，"两山"转化需要找到产业载体。'
    },
    {
        title: '广东"粤菜师傅"工程助力乡村振兴',
        category: '乡村振兴',
        content: '2018年起，广东实施"粤菜师傅"工程，以技能培训促进就业创业。截至2023年，累计培训粤菜师傅超12万人次，带动就业创业超30万人。全省建成61个粤菜师傅大师工作室、100条乡村美食精品线路，推动农餐文旅融合，乡村美食消费超600亿元。',
        source: '新华社、南方日报',
        insight: '适用主题：乡村振兴、技能培训、就业创业、产业融合。核心启示：立足地方特色资源，以小切口推动大变化，技能培训是促进就业的有效抓手。'
    },
    {
        title: '雄安新区"未来之城"规划建设',
        category: '高质量发展',
        content: '2017年4月，雄安新区设立，是继深圳经济特区和上海浦东新区之后又一具有全国意义的新区。规划"蓝绿空间占比稳定在70%"，建设"15分钟生活圈"。目前，雄安高铁站已投入使用，启动区基础设施基本成型，中国星网、中国中化等央企总部落位，一座绿色低碳、智能高效的"未来之城"正在拔地而起。',
        source: '人民日报、新华社',
        insight: '适用主题：高质量发展、城市规划、绿色低碳、疏解非首都功能。核心启示：规划先行、生态优先，以高标准引领高质量发展，打造新时代标杆城市。'
    },
    {
        title: '山东烟台海洋牧场"蓝色粮仓"建设',
        category: '高质量发展',
        content: '山东烟台大力发展现代化海洋牧场，将传统渔业升级为"养殖+旅游+科技"融合产业。截至2023年，建成国家级海洋牧场示范区20处，投放人工鱼礁超300万空方。海洋牧场年产值超500亿元，带动海上垂钓、休闲渔业等新业态，渔民收入翻倍增长，实现"海上粮仓"与"海上乐园"双丰收。',
        source: '人民日报、大众日报',
        insight: '适用主题：高质量发展、产业升级、海洋经济、乡村振兴。核心启示：传统产业转型升级需以科技赋能、融合发展为路径，拓展产业新空间。'
    },
    {
        title: '"最多跑一次"改革的浙江实践',
        category: '数字治理',
        content: '2016年底，浙江率先提出"最多跑一次"改革，将政务服务事项从"跑多次"压缩到"跑一次"甚至"零跑腿"。通过数据共享、流程再造、一窗受理，全省政务服务事项100%实现"最多跑一次"。改革催生了"浙里办"APP，汇聚便民服务400余项，企业开办从20天压缩到1天。',
        source: '人民日报、浙江日报',
        insight: '适用主题：数字政府、营商环境、为民服务、改革创新。核心启示：以群众需求倒逼改革，以数据共享打破部门壁垒，是提升政府效能的有效路径。'
    },
    {
        title: '江西赣南脐橙品牌富民之路',
        category: '乡村振兴',
        content: '赣南脐橙从上世纪70年代试种起步，发展为品牌价值超600亿元的中国农产品区域公用品牌。2023年，赣州脐橙种植面积近180万亩，产量超150万吨，带动100万果农增收致富，人均年增收超8000元。通过建立质量追溯体系、电商直播销售，赣南脐橙远销30多个国家和地区。',
        source: '新华社、江西日报',
        insight: '适用主题：乡村振兴、品牌建设、产业扶贫。核心启示：特色农产品要走品牌化道路，以品质铸品牌、以品牌拓市场，带动农民持续增收。'
    },
    {
        title: '中国天眼FAST科技自立自强',
        category: '科技创新',
        content: '被誉为"中国天眼"的500米口径球面射电望远镜（FAST），由南仁东带领团队历时22年建成。2016年落成以来，FAST发现脉冲星超900颗，超过同期国际同类设备总和。2023年发现轨道仅53分钟的脉冲双星系统，为检验广义相对论提供独特样本。FAST是全球最大最灵敏的单口径射电望远镜。',
        source: '新华社、科技日报',
        insight: '适用主题：科技自立自强、创新驱动、人才强国。核心启示：核心技术买不来要不来，唯有以"板凳甘坐十年冷"的精神自主创新，才能赢得未来。'
    },
    {
        title: '河南兰考"焦裕禄精神"传承脱贫',
        category: '脱贫攻坚',
        content: '兰考是焦裕禄精神发源地。2014年，兰考县委作出"三年脱贫、七年小康"承诺。通过发展泡桐产业（民族乐器、家具制造）、务工经济和政策兜底，2017年兰考在河南省率先脱贫摘帽。当年焦裕禄亲手栽种的泡桐已繁衍成林，年产值超60亿元，带动15万人就业，"焦桐"精神生生不息。',
        source: '人民日报、新华社',
        insight: '适用主题：脱贫攻坚、精神传承、产业发展。核心启示：精神力量是发展的不竭动力，将优良传统与产业发展结合，方能实现可持续脱贫。'
    },
    {
        title: '北京冬奥遗产可持续利用',
        category: '高质量发展',
        content: '2022年北京冬奥会所有场馆实现100%绿电供应，"冰丝带"采用二氧化碳制冰技术碳排放趋近于零。赛后，国家速滑馆向公众开放，首钢园转型为城市更新地标和体育文化园区，冬奥场馆已成为大众冰雪运动场地。2023年冰雪季，全国冰雪旅游收入超4100亿元，"带动三亿人参与冰雪运动"目标实现。',
        source: '新华社、北京日报',
        insight: '适用主题：可持续发展、绿色低碳、体育强国。核心启示：大型赛会要提前谋划赛后利用，以赛事遗产撬动产业发展和城市更新，实现"冬奥效应"最大化。'
    },
    {
        title: '四川凉山"悬崖村"搬迁下山',
        category: '脱贫攻坚',
        content: '四川凉山昭觉县阿土列尔村被称为"悬崖村"，村民进出需攀爬800米悬崖、过218级藤梯。2016年，钢梯替代藤梯；2020年5月，84户村民搬迁至县城集中安置点，告别"悬崖上的生活"。搬迁后，村民通过务工、公益岗位、旧村旅游开发等多元渠道增收，年人均收入从搬迁前不足3000元增长到超1.2万元。',
        source: '新华社、央视新闻',
        insight: '适用主题：脱贫攻坚、易地搬迁、民生改善。核心启示：脱贫攻坚要"挪穷窝"与"换穷业"并举，搬得出还要稳得住、能致富，后续产业是关键。'
    },
    {
        title: '上海浦东"引领区"改革开放再出发',
        category: '改革创新',
        content: '2021年，中央赋予浦东新区"打造社会主义现代化建设引领区"新使命。浦东率先试点"一业一证"改革，将多个许可证整合为一张行业综合许可证。率先推出跨境数据流动、外籍人才永居等制度创新。2023年，浦东GDP达1.67万亿元，累计设立外资企业超4万家，跨国公司地区总部447家。',
        source: '人民日报、上海发布',
        insight: '适用主题：改革开放、制度创新、营商环境。核心启示：改革永远在路上，以制度创新释放发展活力，以开放促改革促发展，是引领区建设的核心要义。'
    },
    {
        title: '广西"螺蛳粉"小产业大文章',
        category: '乡村振兴',
        content: '广西柳州将一碗螺蛳粉发展成百亿级产业。2014年首家预包装螺蛳粉企业注册，2023年柳州螺蛳粉全产业链销售收入超669亿元，带动55万农民就业增收。通过制定地方标准、建设产业园、培育品牌，柳州螺蛳粉从街边小吃走向标准化、品牌化、国际化，远销30多个国家和地区。',
        source: '新华社、广西日报',
        insight: '适用主题：乡村振兴、产业升级、品牌建设。核心启示：小产品可做大文章，以标准化保障品质、以品牌化提升价值，是特色产业高质量发展的路径。'
    },
    {
        title: '宁夏闽宁镇东西部协作样板',
        category: '脱贫攻坚',
        content: '1997年，习近平同志提议福建和宁夏共建移民示范区，命名"闽宁村"。20多年来，闽宁镇从"干沙滩"变为"金沙滩"，6个移民村陆续建成。通过发展酿酒葡萄、枸杞种植、肉牛养殖等特色产业，2023年闽宁镇农民人均可支配收入超1.8万元，较搬迁初期增长近30倍。电视剧《山海情》再现了这段动人故事。',
        source: '人民日报、宁夏日报',
        insight: '适用主题：脱贫攻坚、东西部协作、产业扶贫。核心启示：东西部协作是共同富裕的重要制度安排，先发地区帮后发地区，要"输血"更要"造血"。'
    },
    {
        title: '海南自贸港高水平对外开放探索',
        category: '对外开放',
        content: '2020年，《海南自由贸易港建设总体方案》发布，实施"零关税、低税率、简税制"制度。2023年，海南自贸港货物贸易额超2312亿元，实际使用外资超45亿美元。离岛免税销售额超438亿元，吸引国内外游客超9000万人次。"封关运作"准备工作全面推进，中国特色自贸港政策体系基本成型。',
        source: '新华社、海南日报',
        insight: '适用主题：对外开放、制度创新、营商环境。核心启示：对外开放是中国基本国策，以高水平开放促深层次改革，以制度创新打造国际竞争新优势。'
    },
    {
        title: '陕西延安苹果产业高质量发展',
        category: '乡村振兴',
        content: '陕西延安将苹果作为首位产业，种植面积超330万亩，年产苹果超400万吨。推广"苹果+沼气+养殖"循环模式、冰雹防御系统和智慧果园。2023年，延安苹果鲜果产值超240亿元，品牌价值达82亿元。建成全国最大苹果集散中心，出口80多个国家和地区，带动80万果农人均增收超万元。',
        source: '人民日报、陕西日报',
        insight: '适用主题：乡村振兴、产业升级、科技赋能。核心启示：传统农业需以科技提质增效，以品牌化拓展市场，推动农业从"卖原料"向"卖品牌"转变。'
    },
    {
        title: '江苏"放管服"改革优化营商环境',
        category: '营商环境',
        content: '江苏持续深化"放管服"改革，推行"证照分离""照后减证"，企业开办时间压缩至0.5个工作日。2023年，全省市场主体总量超1450万户，连续多年位居全国第一。建立省市县三级"好差评"制度，政务服务好评率超99.9%。"不见面审批"模式被国务院在全国推广。',
        source: '人民日报、新华日报',
        insight: '适用主题：营商环境、数字政府、改革创新。核心启示：营商环境就是生产力，以减审批优服务降成本，激发市场活力和社会创造力。'
    },
    {
        title: '云南普洱"绿色经济"示范区建设',
        category: '生态文明',
        content: '云南普洱市建设国家绿色经济试验示范区，将绿色发展贯穿经济社会发展全过程。发展有机茶、咖啡、生物药业等绿色产业，有机认证面积达50万亩。2023年，普洱绿色GDP占比超60%，林下经济产值超80亿元。景迈山古茶林文化景观2023年入选《世界遗产名录》，成为全球首个茶文化世界遗产。',
        source: '人民日报、云南日报',
        insight: '适用主题：生态文明、绿色发展、产业转型。核心启示：绿色发展是高质量发展的底色，以生态优势培育绿色产业，实现生态效益与经济效益双赢。'
    },
    {
        title: '湖北武汉光谷科技创新走廊',
        category: '科技创新',
        content: '武汉东湖高新区（光谷）是国内最大光电子信息产业基地。从1988年成立至今，聚集了华为、小米、华大基因等数万家企业，"中国光谷"光电子信息产业规模超5000亿元。2023年，光谷GDP超3200亿元，发明专利授权量超2.3万件。光谷科技创新大走廊连接鄂州、黄石、黄冈、咸宁，带动湖北都市圈协同创新。',
        source: '人民日报、科技日报',
        insight: '适用主题：科技创新、产业升级、区域协调。核心启示：创新是第一动力，以创新平台集聚创新要素，以产业链协同推动区域协调发展。'
    },
    {
        title: '内蒙古库布其沙漠生态治理模式',
        category: '生态文明',
        content: '库布其沙漠是中国第七大沙漠。30多年来，亿利资源集团联合当地群众，探索"政府政策性支持+企业产业化投资+农牧民市场化参与"的治沙模式。累计治理沙漠面积超6000平方公里，种植甘草等沙生植物，发展光伏治沙、生态旅游。2023年，库布其沙漠绿化率达35%，被联合国授予"全球治沙领导者奖"。',
        source: '新华社、人民日报',
        insight: '适用主题：生态文明、绿色发展、政企合作。核心启示：生态治理需要多元主体参与，以市场化机制将"治沙"变"用沙"，实现生态效益与经济效益统一。'
    }
];

/* 联网搜索资源链接 */
const SENTENCE_SEARCH_LINKS = [
    { name: '百度搜索·申论金句', url: 'https://www.baidu.com/s?wd=%E7%94%B3%E8%AE%BA%E9%87%91%E5%8F%A5%E5%A4%A7%E5%85%A8', icon: '🔍' },
    { name: '人民日报金句', url: 'http://www.people.com.cn/', icon: '📰' },
    { name: '学习强国', url: 'https://www.xuexi.cn/', icon: '📚' },
    { name: '半月谈', url: 'http://www.banyuetan.org/', icon: '📖' },
    { name: '知乎·申论好词好句', url: 'https://www.zhihu.com/search?type=content&q=%E7%94%B3%E8%AE%BA%E9%87%91%E5%8F%A5', icon: '💡' },
    { name: '微信搜索·申论素材', url: 'https://weixin.sogou.com/weixin?type=2&query=%E7%94%B3%E8%AE%BA%E9%87%91%E5%8F%A5', icon: '💬' }
];

/* 常识知识库（每日轮换5个） */
const COMMON_SENSE_LIBRARY = [
    { q: '我国宪法规定，中华人民共和国的根本制度是什么？', a: '社会主义制度', cat: '法律常识', source: '宪法第一条' },
    { q: '我国的国家宪法日是哪一天？', a: '12月4日', cat: '法律常识', source: '2014年设立' },
    { q: '我国的根本政治制度是什么？', a: '人民代表大会制度', cat: '政治常识', source: '宪法第二条' },
    { q: '我国的基本政治制度有哪些？', a: '中国共产党领导的多党合作和政治协商制度、民族区域自治制度、基层群众自治制度', cat: '政治常识', source: '宪法' },
    { q: '"四个全面"战略布局是什么？', a: '全面建设社会主义现代化国家、全面深化改革、全面依法治国、全面从严治党', cat: '政治理论', source: '党的十九大' },
    { q: '"五位一体"总体布局是什么？', a: '经济建设、政治建设、文化建设、社会建设、生态文明建设', cat: '政治理论', source: '党的十八大' },
    { q: '新发展理念是什么？', a: '创新、协调、绿色、开放、共享', cat: '政治理论', source: '十八届五中全会' },
    { q: '我国社会主要矛盾是什么？', a: '人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾', cat: '政治理论', source: '党的十九大' },
    { q: '"两个一百年"奋斗目标是什么？', a: '到建党一百年时全面建成小康社会；到新中国成立一百年时全面建成社会主义现代化强国', cat: '政治理论', source: '党的十九大' },
    { q: '我国最深的海沟是？', a: '马里亚纳海沟，中国"奋斗者"号曾下潜至10909米', cat: '地理常识', source: '地理' },
    { q: '世界上海拔最高的高原是？', a: '青藏高原，平均海拔4000米以上，被称为"世界屋脊"', cat: '地理常识', source: '地理' },
    { q: '我国最长的河流是？', a: '长江，全长约6300公里', cat: '地理常识', source: '地理' },
    { q: '唐诗"初唐四杰"是谁？', a: '王勃、杨炯、卢照邻、骆宾王', cat: '文学常识', source: '文学史' },
    { q: '"唐宋八大家"是谁？', a: '韩愈、柳宗元、欧阳修、苏洵、苏轼、苏辙、王安石、曾巩', cat: '文学常识', source: '文学史' },
    { q: '中国古代四大发明是？', a: '造纸术、印刷术、火药、指南针', cat: '历史常识', source: '历史' },
    { q: '辛亥革命发生在哪一年？', a: '1911年', cat: '历史常识', source: '历史' },
    { q: '丝绸之路的起点是哪里？', a: '长安（今西安）', cat: '历史常识', source: '历史' },
    { q: 'GDP的全称是什么？', a: 'Gross Domestic Product，国内生产总值', cat: '经济常识', source: '经济学' },
    { q: 'CPI的全称是什么？反映什么？', a: 'Consumer Price Index，居民消费价格指数，反映通货膨胀水平', cat: '经济常识', source: '经济学' },
    { q: '什么是"三去一降一补"？', a: '去产能、去库存、去杠杆、降成本、补短板', cat: '经济常识', source: '供给侧结构性改革' },
    { q: '我国的国歌是什么？', a: '《义勇军进行曲》，田汉作词，聂耳作曲', cat: '文化常识', source: '文化' },
    { q: '二十四节气中"夏至"是什么意思？', a: '太阳直射北回归线，北半球白昼最长、黑夜最短的一天', cat: '文化常识', source: '传统文化' },
    { q: '光的传播速度是多少？', a: '在真空中约为3x10^8米/秒（30万公里/秒）', cat: '科技常识', source: '物理' },
    { q: 'DNA的全称是什么？', a: 'Deoxyribonucleic Acid，脱氧核糖核酸', cat: '科技常识', source: '生物' },
    { q: '社会主义核心价值观是什么？', a: '国家层面：富强、民主、文明、和谐；社会层面：自由、平等、公正、法治；个人层面：爱国、敬业、诚信、友善', cat: '政治理论', source: '十八大报告' },
    { q: '"一带一路"是什么？', a: '"丝绸之路经济带"和"21世纪海上丝绸之路"', cat: '政治理论', source: '2013年提出' },
    { q: '人类命运共同体理念是谁提出的？', a: '习近平主席，2013年在莫斯科国际关系学院首次提出', cat: '政治理论', source: '外交' },
    { q: '我国最高国家权力机关是？', a: '全国人民代表大会', cat: '法律常识', source: '宪法' },
    { q: '我国的行政机关是？', a: '国务院（中央人民政府），是最高国家权力机关的执行机关', cat: '法律常识', source: '宪法' },
    { q: '我国的审判机关是？', a: '人民法院', cat: '法律常识', source: '宪法' },
    { q: '我国的法律监督机关是？', a: '人民检察院', cat: '法律常识', source: '宪法' },
    { q: '"三严三实"是什么？', a: '严以修身、严以用权、严以律己；谋事要实、创业要实、做人要实', cat: '政治理论', source: '2014年' },
    { q: '"两学一做"是什么？', a: '学党章党规、学系列讲话，做合格党员', cat: '政治理论', source: '2016年' },
    { q: '黄河全长约多少公里？', a: '约5464公里，是中国第二长河', cat: '地理常识', source: '地理' },
    { q: '我国面积最大的省级行政区是？', a: '新疆维吾尔自治区，面积约166万平方公里', cat: '地理常识', source: '地理' },
    { q: '三角形的内角和是多少度？', a: '180度', cat: '科技常识', source: '数学' },
    { q: '水的化学式是什么？', a: 'H2O，由两个氢原子和一个氧原子组成', cat: '科技常识', source: '化学' },
    { q: '地球绕太阳公转一周大约需要多少天？', a: '约365.25天（一年）', cat: '科技常识', source: '天文' },
    { q: '什么是基尼系数？', a: '衡量收入分配差异的指标，0-1之间，越接近1表示收入差距越大，0.4为国际警戒线', cat: '经济常识', source: '经济学' },
    { q: '恩格尔系数是什么？', a: '食品支出占家庭总支出的比重，系数越低说明生活水平越高', cat: '经济常识', source: '经济学' }
];

/* 政治经济热点库（每日轮换5个） */
const HOTSPOT_LIBRARY = [
    { title: '新质生产力', cat: '经济', content: '新质生产力是创新起主导作用，摆脱传统经济增长方式、生产力发展路径，具有高科技、高效能、高质量特征，符合新发展理念的先进生产力质态。特点是创新，关键在质优，本质是先进生产力。', source: '2024年政府工作报告', insight: '申论角度：从科技创新、产业升级、人才培养三方面论述。可结合人工智能、新能源等案例。' },
    { title: '人工智能+行动', cat: '科技', content: '2024年政府工作报告提出开展"人工智能+"行动，推动AI与制造业、服务业深度融合。涵盖智能制造、智慧医疗、自动驾驶等领域。中国AI核心产业规模超5000亿元，相关企业超4400家。', source: '2024年政府工作报告', insight: '申论角度：论述技术赋能传统产业、就业结构转型、伦理监管。可结合大模型等热点。' },
    { title: '粮食安全与种业振兴', cat: '农业', content: '我国粮食产量连续9年稳定在1.3万亿斤以上。2024年中央一号文件强调抓紧抓好粮食和重要农产品稳产保供，深入实施种业振兴行动。种子是农业的"芯片"，打好种业翻身仗是粮食安全的关键。', source: '2024年中央一号文件', insight: '申论角度：可联系农林经济管理专业，从耕地保护、种业创新、农业现代化论述。' },
    { title: '银发经济', cat: '社会', content: '2024年国务院办公厅印发《关于发展银发经济增进老年人福祉的意见》，这是我国首个以银发经济命名的政策文件。预计2035年我国银发经济规模将达到30万亿元，占GDP约10%。', source: '国务院办公厅2024年', insight: '申论角度：人口老龄化既是挑战也是机遇，发展银发经济可促进消费、扩大就业、改善民生。' },
    { title: '碳达峰碳中和', cat: '生态', content: '"双碳"目标：力争2030年前实现碳达峰，2060年前实现碳中和。2024年全国碳排放权交易市场扩围，钢铁、水泥、电解铝等行业纳入。新能源汽车产销量连续多年全球第一。', source: '国家发改委', insight: '申论角度：绿色发展、能源转型、产业结构调整。可结合新能源汽车、光伏产业等案例。' },
    { title: '统一大市场建设', cat: '经济', content: '2022年《关于加快建设全国统一大市场的意见》发布，要求破除地方保护和市场分割。2024年国务院持续推进要素市场化配置改革，打通制约经济循环的关键堵点。', source: '中共中央、国务院', insight: '申论角度：市场在资源配置中起决定性作用，打通国内大循环，释放内需潜力。' },
    { title: '乡村全面振兴', cat: '农业', content: '2024年中央一号文件以学习运用"千万工程"经验为引领，推进乡村全面振兴。聚焦产业振兴、人才振兴、文化振兴、生态振兴、组织振兴"五大振兴"。', source: '2024年中央一号文件', insight: '申论角度：可联系农林经济管理专业，从产业兴旺、生态宜居、乡风文明、治理有效、生活富裕论述。' },
    { title: '数据要素市场化', cat: '科技', content: '2023年国家数据局成立，2024年《"数据要素x"三年行动计划》发布，推动数据在工业、农业、金融等12个行业深度应用。数据已成为继土地、劳动力、资本、技术之后的第五大生产要素。', source: '国家数据局', insight: '申论角度：数据要素是数字经济核心引擎，需平衡数据利用与安全保护。' },
    { title: '人民币国际化', cat: '金融', content: '2023年人民币跨境支付系统（CIPS）业务量持续增长，人民币在全球支付中占比超4.6%。越来越多国家将人民币纳入外汇储备，中俄、中沙等双边贸易中人民币结算比例大幅提升。', source: '中国人民银行', insight: '申论角度：从国际货币体系改革、金融安全、对外开放角度论述。' },
    { title: '房地产新发展模式', cat: '经济', content: '2024年政府工作报告提出适应新型城镇化发展趋势和房地产市场供求关系变化，加快构建房地产发展新模式。加大保障性住房建设和供给，完善商品房相关基础性制度。', source: '2024年政府工作报告', insight: '申论角度：住房问题是重大民生问题，需坚持"房住不炒"，构建多主体供给、多渠道保障制度。' },
    { title: '延迟退休政策', cat: '社会', content: '2024年9月，全国人大常委会审议通过《关于实施渐进式延迟法定退休年龄的决定》，从2025年1月1日起，用15年时间逐步将男职工退休年龄从60岁延至63岁，女职工从50/55岁延至55/58岁。', source: '全国人大常委会', insight: '申论角度：应对人口老龄化的必要举措，需配套就业保障、技能培训、弹性退休等措施。' },
    { title: '营商环境优化', cat: '经济', content: '2024年《政府工作报告》强调全面落实促进民营经济发展壮大的意见及配套举措。市场化、法治化、国际化一流营商环境建设持续推进，民营经济促进法起草工作启动。', source: '国务院', insight: '申论角度：营商环境就是生产力，需从制度保障、公平竞争、减税降费等方面论述。' },
    { title: '科技自立自强', cat: '科技', content: '党的二十大报告强调"必须坚持科技是第一生产力、人才是第一资源、创新是第一动力"。2024年我国全社会研发经费超3.3万亿元，全球创新指数排名升至第11位。', source: '科技部', insight: '申论角度：核心技术买不来要不来，需加大基础研究投入，培养创新人才，完善创新生态。' },
    { title: '黄河流域生态保护', cat: '生态', content: '黄河流域生态保护和高质量发展是重大国家战略。2024年黄河连续25年不断流，干流全线水质达到III类以上。沿黄九省区协同推进生态保护、水资源节约集约利用。', source: '水利部', insight: '申论角度：生态保护与高质量发展并重，上下游协同、左右岸共治。' },
    { title: '中医药传承创新', cat: '社会', content: '2024年《"十四五"中医药发展规划》持续推进，中医药在疫情防控中发挥重要作用。全国中医医院超7700家，中医药"走出去"步伐加快，针灸等已在全球196个国家和地区应用。', source: '国家中医药管理局', insight: '申论角度：中医药是中华优秀传统文化瑰宝，需传承精华、守正创新。' },
    { title: '海洋经济', cat: '经济', content: '2024年我国海洋生产总值预计超10万亿元。海上风电、海洋牧场、深海采矿等新兴产业快速发展。"奋斗者"号全海深载人潜水器创造万米深潜纪录。', source: '自然资源部', insight: '申论角度：海洋是高质量发展战略要地，需坚持陆海统筹、人海和谐。' },
    { title: '自贸试验区升级', cat: '经济', content: '2023年自贸试验区第七批改革试点经验复制推广。上海自贸区成立十周年，累计形成300多项制度创新成果。海南自贸港封关运作准备工作全面推进。', source: '商务部', insight: '申论角度：以开放促改革促发展，制度创新是自贸区核心使命。' },
    { title: '县域经济', cat: '经济', content: '县域是国民经济的基本单元。2024年中央强调推进以县城为重要载体的城镇化建设，培育壮大县域特色优势产业，促进农民就近就业增收。', source: '国家发改委', insight: '申论角度：县域经济是城乡融合发展的关键节点，可联系农林经济管理专业。' },
    { title: '消费品以旧换新', cat: '经济', content: '2024年3月，国务院印发《推动大规模设备更新和消费品以旧换新行动方案》。涵盖汽车、家电、家居等领域，预计每年拉动消费万亿级市场。', source: '国务院', insight: '申论角度：促进消费升级与绿色发展结合，既扩内需又推动节能减排。' },
    { title: '数字乡村建设', cat: '农业', content: '2024年中央一号文件强调持续推进数字乡村建设。农村互联网普及率超66%，电商进农村覆盖超八成县市。数字技术赋能农业生产、流通、治理各环节。', source: '中央网信办', insight: '申论角度：数字技术缩小城乡差距，可联系农林经济管理专业，论述数字农业、智慧乡村。' },
    { title: '长江经济带发展', cat: '生态', content: '长江经济带覆盖11省市，人口和GDP均占全国约40%。坚持"共抓大保护，不搞大开发"，长江干流连续3年保持II类水质。2023年长江"十年禁渔"取得阶段性成效。', source: '国家发改委', insight: '申论角度：生态优先、绿色发展，上下游联动、干支流协同治理。' },
    { title: '专精特新企业', cat: '经济', content: '"专精特新"指专业化、精细化、特色化、新颖化的中小企业。截至2024年，我国已培育专精特新"小巨人"企业1.2万余家，它们是产业链供应链的关键节点。', source: '工信部', insight: '申论角度：中小企业是国民经济的毛细血管，需政策扶持、金融支持、创新赋能。' },
    { title: '低空经济', cat: '科技', content: '2024年"低空经济"首次写入政府工作报告。低空经济是以无人机、eVTOL为核心的新经济形态，涵盖物流配送、空中游览、应急救援等。预计2025年规模达1.5万亿元。', source: '2024年政府工作报告', insight: '申论角度：新业态新模式的培育，需完善法规标准、基础设施、安全保障。' },
    { title: '粮食节约行动', cat: '社会', content: '2021年《反食品浪费法》施行，2024年中央持续深入推进粮食节约行动。我国每年餐饮浪费约340-360亿斤粮食，约占粮食总产量的2.5%。', source: '国家发改委', insight: '申论角度：粮食安全是国之大者，节约粮食是每个公民的责任，需法治保障和道德约束并重。' },
    { title: '中国式现代化', cat: '政治', content: '党的二十大明确了中国式现代化的五大特征：人口规模巨大、全体人民共同富裕、物质文明和精神文明相协调、人与自然和谐共生、走和平发展道路。', source: '党的二十大报告', insight: '申论角度：中国式现代化是必由之路，需从五大特征展开论述，结合新质生产力、共同富裕等。' }
];

const App = {
    currentModule: 'daily-tasks',
    currentSubTab: {},
    data: null,

    // ==================== 初始化 ====================
    init() {
        this.loadData();
        this.updateTopBar();
        this.registerSW();
        // 桌面端默认展开侧边栏，移动端默认收起（抽屉）
        if (window.innerWidth >= 769) document.body.classList.add('sidebar-open');
        this.navigate('daily-tasks');
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 769) document.body.classList.add('sidebar-open');
        });
    },

    // ==================== 数据层 ====================
    getDefaultData() {
        return {
            dailyTasks: {},      // { "2026-07-29": [{id, text, done, reward}] }
            accounting: {},      // { "2026-07": [{id, type, category, amount, note, date}] }
            thesis: {
                sections: [
                    { id: 'theory', name: '理论分析', icon: '📖', progress: 0, status: 'pending', notes: '', wordCount: 0 },
                    { id: 'mechanism', name: '影响机制构建', icon: '🔗', progress: 0, status: 'pending', notes: '', wordCount: 0 },
                    { id: 'descriptive', name: '描述统计', icon: '📊', progress: 0, status: 'pending', notes: '', wordCount: 0 },
                    { id: 'model', name: '模型分析', icon: '🧮', progress: 0, status: 'pending', notes: '', wordCount: 0 },
                    { id: 'results', name: '结果讨论', icon: '💡', progress: 0, status: 'pending', notes: '', wordCount: 0 },
                    { id: 'policy', name: '政策建议', icon: '📜', progress: 0, status: 'pending', notes: '', wordCount: 0 }
                ],
                logs: [],        // [{id, date, section, content, words}]
                modelDeadline: '2026-08-31',
                draftDeadline: '2026-12-31',
                customDeadlines: []  // [{id, name, date}]
            },
            exam: {
                countdowns: [
                    { id: 'guokao', name: '国考', date: '2025-11-28' },
                    { id: 'xiaoliankao', name: '小联考', date: '2025-12-07' },
                    { id: 'neimeng', name: '内蒙省考', date: '2026-03-13' }
                ],
                practice: [],    // [{id, date, subject, total, correct}]
                mistakes: [],    // [{id, date, subject, question, correctAnswer, myAnswer, analysis}]
                courses: [
                    { id: 'logic', name: '逻辑', teacher: '花生13', icon: '🧠', completed: 0, total: 0, targetDate: '' },
                    { id: 'graphic', name: '图推', teacher: '刘义恒', icon: '🔍', completed: 0, total: 0, targetDate: '' },
                    { id: 'essay', name: '申论', teacher: '白鹭', icon: '✍️', completed: 0, total: 0, targetDate: '' }
                ],
                essays: [],      // [{id, date, title, content, score, feedback, aiAnalysis}]
                goldenSentences: []  // [{id, category, content}]
            },
            job: {
                bookmarks: [],   // [{id, company, position, deadline, status, requirements, note, date}]
                filters: {
                    degree: '双非硕士',
                    gender: '女',
                    major: '农林经济管理'
                },
                pushEnabled: false
            },
            fitness: {
                bodyData: [],    // [{id, date, weight, bodyFat, arm, thigh, calf, hip, note}]
                plans: [],       // [{id, day, exercise, duration}]
                exercises: {
                    back: [
                        { name: '高位下拉', desc: '背阔肌主导', sets: '4x12', tips: '155cm女生建议重量20-35kg，握距稍宽于肩，下拉到锁骨位置，肘部引导发力，避免手臂代偿。沉肩收核心，不要耸肩。', video: 'https://www.bilibili.com/search?keyword=高位下拉教学' },
                        { name: '杠铃划船', desc: '整体背部', sets: '4x10', tips: '155cm女生建议空杆或10-15kg起。微屈膝，背部平行地面，杠铃拉向肚脐。小个子优势是力臂短，可以更好感受背部收缩。', video: 'https://www.bilibili.com/search?keyword=杠铃划船教学' },
                        { name: '坐姿划船', desc: '中背部', sets: '3x12', tips: '建议重量15-25kg。保持脊柱中立，拉时肩胛骨后缩，想象用手肘画弧。155cm女生坐姿调整座椅使把手与胸部齐平。', video: 'https://www.bilibili.com/search?keyword=坐姿划船教学' },
                        { name: '直臂下压', desc: '背阔肌孤立', sets: '3x15', tips: '建议10-20kg。保持手臂微曲不动，用背阔肌发力下压。小个子女生优势是动作幅度可以做得更大，更好刺激目标肌群。', video: 'https://www.bilibili.com/search?keyword=直臂下压教学' }
                    ],
                    shoulder: [
                        { name: '哑铃推举', desc: '三角肌前束', sets: '4x10', tips: '155cm女生建议每只手2.5-7.5kg哑铃。坐姿背部贴实椅背，推到头顶上方不锁死，下落到下巴位置。核心收紧防止腰部过度反弓。', video: 'https://www.bilibili.com/search?keyword=哑铃推举教学' },
                        { name: '侧平举', desc: '三角肌中束', sets: '4x15', tips: '建议每只手1-3kg起。小拇指微微朝上引导，抬到与肩平行即可，不要超过肩高。155cm女生肘部微曲，想象倒水动作。', video: 'https://www.bilibili.com/search?keyword=哑铃侧平举教学' },
                        { name: '俯身飞鸟', desc: '三角肌后束', sets: '3x15', tips: '建议每只手1-3kg。俯身45度，手臂自然下垂，向两侧抬起至与肩平行。感受后肩收紧，不要借力甩起。', video: 'https://www.bilibili.com/search?keyword=俯身飞鸟教学' },
                        { name: '面拉', desc: '后束+肩袖', sets: '3x15', tips: '建议10-15kg绳索。拉向面部两侧，肘部外展高度超过手。对圆肩驼背很有效，155cm女生调整绳索高度在额头位置。', video: 'https://www.bilibili.com/search?keyword=面拉教学' }
                    ],
                    swimming: [
                        { name: '自由泳', desc: '全身有氧', sets: '30min', tips: '155cm女生建议先练打腿，保持身体流线型。换气时头部不要抬太高，保持一只眼在水面上。目标配速100m/2min。', video: 'https://www.bilibili.com/search?keyword=自由泳教学' },
                        { name: '蛙泳', desc: '腿部+胸部', sets: '30min', tips: '小个子女生蛙泳蹬腿效率高，注意收翻蹬夹完整动作。换气时手臂内划辅助抬头，不要只靠脖子。', video: 'https://www.bilibili.com/search?keyword=蛙泳教学' },
                        { name: '间歇游', desc: 'HIIT燃脂', sets: '20min', tips: '50m快游+30秒休息，重复8-10组。155cm女生建议从25m快+25m慢开始，逐渐增加强度。', video: 'https://www.bilibili.com/search?keyword=游泳间歇训练' }
                    ],
                    incline: [
                        { name: '跑步机爬坡', desc: '臀腿+有氧', sets: '30-40min', tips: '坡度8-12，速度4-5km/h。155cm女生步幅较小，可以适当提高坡度而非速度来增加强度。身体微前倾，手不要扶扶手。', video: 'https://www.bilibili.com/search?keyword=跑步机爬坡教学' },
                        { name: '楼梯机', desc: '臀腿塑形', sets: '20min', tips: '保持中等转速，全脚掌踩踏。身体微前倾可以更多刺激臀部。小个子女生步频可以快一些。', video: 'https://www.bilibili.com/search?keyword=楼梯机教学' },
                        { name: '坡度快走', desc: '低冲击有氧', sets: '30min', tips: '坡度6-10，速度4-5.5km/h。适合经期或恢复日。155cm女生步频快，保持自然步幅即可。', video: 'https://www.bilibili.com/search?keyword=爬坡快走教学' }
                    ],
                    glutesLegs: [
                        { name: '深蹲', desc: '整体下肢', sets: '4x10', tips: '155cm女生建议从空杆或高脚杯深蹲开始。脚距与肩同宽或稍宽，下蹲到大腿平行地面。小个子蹲得可以更深，有助于刺激臀大肌。膝盖方向与脚尖一致。', video: 'https://www.bilibili.com/search?keyword=女生深蹲教学' },
                        { name: '臀推', desc: '臀大肌主导', sets: '4x12', tips: '155cm女生建议20-40kg起。肩胛骨靠在凳子边缘，杠铃放在髋骨上方。向上顶髋至身体平行，顶峰收缩1-2秒。小个子调整凳子高度很关键。', video: 'https://www.bilibili.com/search?keyword=臀推教学' },
                        { name: '罗马尼亚硬拉', desc: '腘绳肌+臀', sets: '4x10', tips: '建议20-30kg。微屈膝，臀部后推，杠铃沿大腿前侧下放至膝盖下方。感受大腿后侧拉伸感。155cm女生行程相对短，注意控制离心。', video: 'https://www.bilibili.com/search?keyword=罗马尼亚硬拉教学' },
                        { name: '保加利亚分腿蹲', desc: '单腿力量', sets: '3x10', tips: '建议手持5-10kg哑铃。后脚放在凳子上，前脚距离调整为下蹲时前膝不超过脚尖。155cm女生凳子高度建议30-35cm。每侧10次。', video: 'https://www.bilibili.com/search?keyword=保加利亚分腿蹲教学' },
                        { name: '髋外展', desc: '臀中肌', sets: '3x15', tips: '建议20-35kg器械。背部贴实靠背，双腿向外打开至最大幅度，顶峰收缩1秒。改善臀部凹陷，155cm女生调整座椅使转轴与髋关节对齐。', video: 'https://www.bilibili.com/search?keyword=髋外展教学' }
                    ]
                },
                period: {
                    records: [],    // [{id, startDate, endDate}]
                    cycleLength: 28,
                    periodLength: 5
                }
            },
            streak: 0,
            lastActiveDate: null
        };
    },

    loadData() {
        const saved = localStorage.getItem('bangbangbing_data');
        if (saved) {
            try {
                this.data = JSON.parse(saved);
                // 合并默认值（防止新增字段缺失）
                const defaults = this.getDefaultData();
                this.data = this.mergeDefaults(this.data, defaults);
            } catch (e) {
                this.data = this.getDefaultData();
            }
        } else {
            this.data = this.getDefaultData();
        }
    },

    mergeDefaults(data, defaults) {
        for (const key in defaults) {
            if (!(key in data)) {
                data[key] = defaults[key];
            } else if (typeof defaults[key] === 'object' && !Array.isArray(defaults[key]) && defaults[key] !== null) {
                data[key] = this.mergeDefaults(data[key], defaults[key]);
            }
        }
        return data;
    },

    saveData() {
        localStorage.setItem('bangbangbing_data', JSON.stringify(this.data));
    },

    // ==================== 工具函数 ====================
    utils: {
        today() {
            const d = new Date();
            return d.getFullYear() + '-' +
                   String(d.getMonth() + 1).padStart(2, '0') + '-' +
                   String(d.getDate()).padStart(2, '0');
        },

        currentMonth() {
            const d = new Date();
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        },

        formatDate(dateStr) {
            const d = new Date(dateStr);
            return d.getMonth() + 1 + '月' + d.getDate() + '日';
        },

        daysBetween(dateStr) {
            const target = new Date(dateStr);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            target.setHours(0, 0, 0, 0);
            return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
        },

        uid() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        },

        escape(str) {
            if (!str) return '';
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        monthDays(monthStr) {
            const [y, m] = monthStr.split('-').map(Number);
            return new Date(y, m, 0).getDate();
        },

        firstDayOfWeek(monthStr) {
            const [y, m] = monthStr.split('-').map(Number);
            return new Date(y, m - 1, 1).getDay();
        }
    },

    // ==================== 顶部栏 ====================
    updateTopBar() {
        const d = new Date();
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        document.getElementById('dateDisplay').textContent =
            (d.getMonth() + 1) + '/' + d.getDate() + ' 周' + weekDays[d.getDay()];
        document.getElementById('streakBadge').textContent = '🔥 ' + (this.data.streak || 0);

        // 更新连续打卡
        this.updateStreak();
    },

    updateStreak() {
        const today = this.utils.today();
        const tasks = this.data.dailyTasks[today] || [];
        const hasCompletedTask = tasks.some(t => t.done);

        if (hasCompletedTask) {
            if (this.data.lastActiveDate !== today) {
                if (this.data.lastActiveDate) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yStr = yesterday.getFullYear() + '-' +
                        String(yesterday.getMonth() + 1).padStart(2, '0') + '-' +
                        String(yesterday.getDate()).padStart(2, '0');
                    if (this.data.lastActiveDate === yStr) {
                        this.data.streak = (this.data.streak || 0) + 1;
                    } else {
                        this.data.streak = 1;
                    }
                } else {
                    this.data.streak = 1;
                }
                this.data.lastActiveDate = today;
                this.saveData();
                document.getElementById('streakBadge').textContent = '🔥 ' + this.data.streak;
            }
        }
    },

    // ==================== 导航 ====================
    navigate(module) {
        this.currentModule = module;
        // 移动端选中后自动收起侧边栏，避免遮挡内容
        if (window.innerWidth < 769) document.body.classList.remove('sidebar-open');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.module === module);
        });
        const content = document.getElementById('content');
        content.innerHTML = '';
        content.classList.add('fade-in');

        const renderers = {
            'daily-tasks': () => this.renderDailyTasks(content),
            'accounting': () => this.renderAccounting(content),
            'thesis': () => this.renderThesis(content),
            'exam': () => this.renderExam(content),
            'job': () => this.renderJob(content),
            'fitness': () => this.renderFitness(content),
            'hotspot': () => this.renderHotspot(content)
        };

        if (renderers[module]) renderers[module]();

        setTimeout(() => content.classList.remove('fade-in'), 300);
    },

    // 侧边栏收起/展开（抽屉式）
    toggleSidebar() {
        document.body.classList.toggle('sidebar-open');
    },

    // ==================== Toast ====================
    toast(msg) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2500);
    },

    // ==================== 模态框 ====================
    showModal(title, contentHTML, onConfirm) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-title">${title}</div>
                <div class="modal-body">${contentHTML}</div>
                <div class="modal-actions">
                    <button class="btn btn-outline" onclick="this.closest('.modal-overlay').remove()">取消</button>
                    <button class="btn btn-primary" id="modalConfirmBtn">确定</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
        if (onConfirm) {
            document.getElementById('modalConfirmBtn').onclick = () => {
                onConfirm(overlay);
            };
        }
        return overlay;
    },

    // ==================== 每日任务模块 ====================
    renderDailyTasks(container) {
        const today = this.utils.today();
        const tasks = this.data.dailyTasks[today] || [];
        const doneCount = tasks.filter(t => t.done).length;
        const todayEarning = doneCount * 10;

        // 月度统计
        const month = this.utils.currentMonth();
        let monthEarning = 0;
        let monthDoneCount = 0;
        Object.entries(this.data.dailyTasks).forEach(([date, dayTasks]) => {
            if (date.startsWith(month)) {
                const done = dayTasks.filter(t => t.done).length;
                monthEarning += done * 10;
                monthDoneCount += done;
            }
        });

        // 按时段分组
        const periods = [
            { id: 'morning', label: '🌅 上午', placeholder: '如：8:00 听逻辑课' },
            { id: 'afternoon', label: '☀️ 下午', placeholder: '如：14:00 刷题100道' },
            { id: 'evening', label: '🌙 晚上', placeholder: '如：20:00 写申论' }
        ];

        container.innerHTML = `
            <div class="page-title"><span class="emoji">✅</span> 每日任务</div>

            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-icon">📋</div>
                    <div class="stat-value">${tasks.length}</div>
                    <div class="stat-label">今日任务</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎉</div>
                    <div class="stat-value">${doneCount}</div>
                    <div class="stat-label">已完成</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-value">¥${todayEarning}</div>
                    <div class="stat-label">今日奖励</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-value">¥${monthEarning}</div>
                    <div class="stat-label">本月累计</div>
                </div>
            </div>

            <div class="card">
                <div class="card-title">➕ 添加今日任务</div>
                <div class="form-row" style="align-items:flex-end">
                    <div class="form-group" style="max-width:120px;flex:0 0 120px">
                        <label class="label">时段</label>
                        <select class="select" id="newTaskPeriod">
                            <option value="morning">🌅 上午</option>
                            <option value="afternoon">☀️ 下午</option>
                            <option value="evening">🌙 晚上</option>
                        </select>
                    </div>
                    <div class="form-group" style="max-width:120px;flex:0 0 120px">
                        <label class="label">执行时间</label>
                        <input type="time" class="input" id="newTaskTime">
                    </div>
                    <div class="form-group" style="flex:1">
                        <label class="label">任务内容</label>
                        <input type="text" class="input" id="newTaskInput"
                               placeholder="输入任务内容，完成后可得 ¥10 奖励～"
                               onkeypress="if(event.key==='Enter')App.addTask()">
                    </div>
                    <button class="btn btn-primary" onclick="App.addTask()">添加</button>
                </div>
            </div>

            ${periods.map(p => {
                const periodTasks = tasks.filter(t => (t.period || 'morning') === p.id);
                const periodDone = periodTasks.filter(t => t.done).length;
                return `
                    <div class="card">
                        <div class="card-title">${p.label} <span style="font-size:13px;color:var(--text-sub);font-weight:400">(${periodDone}/${periodTasks.length})</span></div>
                        <div id="taskList_${p.id}">
                            ${this.renderTaskList(periodTasks)}
                        </div>
                    </div>
                `;
            }).join('')}

            <div class="card">
                <div class="card-title">📅 月度日历 (${month})</div>
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:8px;">
                    本月完成任务 ${monthDoneCount} 个 · 累计奖励 ¥${monthEarning}
                </div>
                ${this.renderMonthCalendar(month)}
            </div>
        `;
    },

    renderTaskList(tasks) {
        if (!tasks || tasks.length === 0) {
            return `<div class="empty-state" style="padding:16px">
                <div class="empty-state-text" style="font-size:13px">暂无任务</div>
            </div>`;
        }
        // 按时间排序
        const sorted = [...tasks].sort((a, b) => {
            const ta = a.time || '99:99';
            const tb = b.time || '99:99';
            return ta.localeCompare(tb);
        });
        return sorted.map(t => `
            <div class="task-item ${t.done ? 'done' : ''}">
                <div class="task-checkbox ${t.done ? 'checked' : ''}"
                     onclick="App.toggleTask('${t.id}')">${t.done ? '✓' : ''}</div>
                ${t.time ? `<span style="font-size:12px;font-weight:700;color:var(--primary);background:var(--primary-light);padding:2px 8px;border-radius:12px;flex-shrink:0">${this.utils.escape(t.time)}</span>` : ''}
                <div class="task-text">${this.utils.escape(t.text)}</div>
                <div class="task-reward">¥${t.reward}</div>
                <button class="task-delete" onclick="App.deleteTask('${t.id}')">🗑</button>
            </div>
        `).join('');
    },

    addTask() {
        const input = document.getElementById('newTaskInput');
        const periodSel = document.getElementById('newTaskPeriod');
        const timeInput = document.getElementById('newTaskTime');
        const text = input.value.trim();
        if (!text) {
            this.toast('请输入任务内容～');
            return;
        }
        const today = this.utils.today();
        if (!this.data.dailyTasks[today]) {
            this.data.dailyTasks[today] = [];
        }
        this.data.dailyTasks[today].push({
            id: this.utils.uid(),
            text: text,
            done: false,
            reward: 10,
            period: periodSel.value,
            time: timeInput.value || ''
        });
        this.saveData();
        input.value = '';
        timeInput.value = '';
        this.navigate('daily-tasks');
        this.toast('任务添加成功！');
    },

    toggleTask(taskId) {
        const today = this.utils.today();
        const tasks = this.data.dailyTasks[today] || [];
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const wasDone = task.done;
        task.done = !task.done;
        this.saveData();

        // 如果任务完成，自动在记账中添加奖励
        if (!wasDone && task.done) {
            this.addAccountingEntry({
                type: 'income',
                category: '任务奖励',
                amount: 10,
                note: '完成每日任务: ' + task.text,
                date: today
            });
            this.toast('🎉 完成任务！获得 ¥10 奖励！');
        } else if (wasDone && !task.done) {
            // 取消完成，撤销记账
            this.removeRewardEntry(today, taskId);
            this.toast('已取消完成');
        }

        this.updateStreak();
        this.navigate('daily-tasks');
    },

    deleteTask(taskId) {
        const today = this.utils.today();
        const tasks = this.data.dailyTasks[today] || [];
        const task = tasks.find(t => t.id === taskId);
        if (task && task.done) {
            this.removeRewardEntry(today, taskId);
        }
        this.data.dailyTasks[today] = tasks.filter(t => t.id !== taskId);
        this.saveData();
        this.navigate('daily-tasks');
        this.toast('任务已删除');
    },

    removeRewardEntry(date, taskId) {
        const month = date.substring(0, 7);
        const entries = this.data.accounting[month] || [];
        this.data.accounting[month] = entries.filter(e =>
            !(e.category === '任务奖励' && e.date === date && e.note && e.note.includes(taskId === undefined ? '' : ''))
        );
        // 更精确的删除：通过 note 中的任务内容匹配
        this.saveData();
    },

    renderMonthCalendar(monthStr) {
        const days = this.utils.monthDays(monthStr);
        const firstDay = this.utils.firstDayOfWeek(monthStr);
        const today = this.utils.today();
        const weekHeaders = ['日', '一', '二', '三', '四', '五', '六'];
        let html = '<div class="calendar">';
        weekHeaders.forEach(w => html += `<div class="calendar-header">${w}</div>`);

        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-cell empty"></div>';
        }

        for (let d = 1; d <= days; d++) {
            const dateStr = monthStr + '-' + String(d).padStart(2, '0');
            const tasks = this.data.dailyTasks[dateStr] || [];
            const doneCount = tasks.filter(t => t.done).length;
            const earning = doneCount * 10;
            const isToday = dateStr === today;
            const hasData = doneCount > 0;

            html += `<div class="calendar-cell ${isToday ? 'today' : ''} ${hasData ? 'has-data' : ''}">
                <span>${d}</span>
                ${hasData ? `<span class="calendar-earning">¥${earning}</span>` : ''}
            </div>`;
        }

        html += '</div>';
        return html;
    },

    // ==================== 记账模块 ====================
    renderAccounting(container) {
        if (!this.currentSubTab.accounting) this.currentSubTab.accounting = 'bill';
        if (!this.accountingMonth) this.accountingMonth = this.utils.currentMonth();
        this.tempPhoto = null; // 重置临时照片

        const month = this.accountingMonth;
        const entries = this.data.accounting[month] || [];
        const income = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
        const expense = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
        const balance = income - expense;
        const photoCount = entries.filter(e => e.photo).length;

        const subTabs = [
            { id: 'bill', label: '📋 账单' },
            { id: 'album', label: `📸 打卡相册${photoCount > 0 ? '(' + photoCount + ')' : ''}` }
        ];

        container.innerHTML = `
            <div class="page-title"><span class="emoji">💰</span> 记账</div>

            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-icon">💵</div>
                    <div class="stat-value" style="color:var(--success)">¥${income}</div>
                    <div class="stat-label">本月收入</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💸</div>
                    <div class="stat-value" style="color:var(--danger)">¥${expense}</div>
                    <div class="stat-label">本月支出</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🪙</div>
                    <div class="stat-value" style="color:${balance >= 0 ? 'var(--primary)' : 'var(--danger)'}">¥${balance}</div>
                    <div class="stat-label">结余</div>
                </div>
            </div>

            <div class="month-nav">
                <button class="month-nav-btn" onclick="App.changeAccountingMonth(-1)">‹</button>
                <span class="month-nav-label">${month.replace('-', '年')}月</span>
                <button class="month-nav-btn" onclick="App.changeAccountingMonth(1)" ${month >= this.utils.currentMonth() ? 'disabled style="opacity:0.3"' : ''}>›</button>
            </div>

            <div class="sub-tabs">
                ${subTabs.map(t => `<button class="sub-tab ${this.currentSubTab.accounting === t.id ? 'active' : ''}" onclick="App.switchAccountingTab('${t.id}')">${t.label}</button>`).join('')}
            </div>

            <div id="accountingTabContent"></div>
        `;

        const renderers = {
            bill: () => this.renderAccountingBill(entries, month),
            album: () => this.renderAccountingAlbum(entries, month)
        };
        renderers[this.currentSubTab.accounting]();
    },

    switchAccountingTab(tab) {
        this.currentSubTab.accounting = tab;
        this.navigate('accounting');
    },

    changeAccountingMonth(delta) {
        const [y, m] = this.accountingMonth.split('-').map(Number);
        let year = y, month = m + delta;
        if (month > 12) { month = 1; year++; }
        if (month < 1) { month = 12; year--; }
        this.accountingMonth = `${year}-${String(month).padStart(2, '0')}`;
        this.navigate('accounting');
    },

    /* 账单视图（含拍照） */
    renderAccountingBill(entries, month) {
        const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
        const container = document.getElementById('accountingTabContent');

        container.innerHTML = `
            <div class="card">
                <div class="card-title">➕ 记一笔</div>
                <div class="form-row">
                    <div class="form-group">
                        <select class="select" id="accType">
                            <option value="expense">💸 支出</option>
                            <option value="income">💵 收入</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="select" id="accCategory">
                            <option value="餐饮">餐饮</option>
                            <option value="美食打卡">📸 美食打卡</option>
                            <option value="饮品">🧋 饮品</option>
                            <option value="玩乐">🎉 玩乐</option>
                            <option value="交通">交通</option>
                            <option value="购物">购物</option>
                            <option value="学习">学习</option>
                            <option value="健身">健身</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="number" class="input" id="accAmount" placeholder="金额" step="0.01">
                    </div>
                    <div class="form-group">
                        <input type="text" class="input" id="accNote" placeholder="备注（可选）">
                    </div>
                </div>

                <div class="mb-2">
                    <div class="photo-preview-area" id="photoPreview" onclick="document.getElementById('photoInput').click()">
                        <div class="photo-preview-placeholder" id="photoPlaceholder">
                            <span class="icon">📸</span>
                            <span class="text">点击拍照 / 选择图片<br>记录好吃的、好喝的、好玩的</span>
                        </div>
                        <img class="photo-preview-img" id="photoImg" style="display:none" />
                        <button class="photo-clear-btn" id="photoClearBtn" style="display:none" onclick="event.stopPropagation();App.clearPhoto()">✕</button>
                    </div>
                    <input type="file" id="photoInput" accept="image/*" capture="environment" style="display:none" onchange="App.handlePhotoSelect(event)">
                </div>

                <button class="btn btn-primary" style="width:100%" onclick="App.addAccountingManual()">记录</button>
            </div>

            <div class="card">
                <div class="card-title">📋 ${month.replace('-', '年')}月账单 (${entries.length}笔)</div>
                ${sorted.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-state-icon">🧾</div>
                        <div class="empty-state-text">本月还没有记录哦</div>
                    </div>
                ` : sorted.map(e => `
                    <div class="list-item">
                        ${e.photo ?
                            `<img class="acc-thumb" src="${e.photo}" onclick="App.openLightbox('${e.id}')">` :
                            `<div style="font-size:24px;width:48px;text-align:center;flex-shrink:0">${e.type === 'income' ? '💵' : this.accCategoryIcon(e.category)}</div>`
                        }
                        <div class="list-item-content">
                            <div class="list-item-title">${this.utils.escape(e.category)} ${e.note ? '· ' + this.utils.escape(e.note) : ''}</div>
                            <div class="list-item-sub">${this.utils.formatDate(e.date)}</div>
                        </div>
                        <div style="font-weight:700;color:${e.type === 'income' ? 'var(--success)' : 'var(--danger)'};font-size:15px;flex-shrink:0">
                            ${e.type === 'income' ? '+' : '-'}¥${e.amount}
                        </div>
                        <button class="task-delete" onclick="App.deleteAccounting('${e.id}')">🗑</button>
                    </div>
                `).join('')}
            </div>
        `;
    },

    /* 打卡相册视图 */
    renderAccountingAlbum(entries, month) {
        const container = document.getElementById('accountingTabContent');
        const photoEntries = entries.filter(e => e.photo).sort((a, b) => b.date.localeCompare(a.date));

        if (photoEntries.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <div class="empty-state">
                        <div class="empty-state-icon">📸</div>
                        <div class="empty-state-text">还没有打卡照片<br>切到「📋 账单」记录美食/饮品/玩乐时拍照吧！</div>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="card">
                <div class="card-title">📸 ${month.replace('-', '年')}月打卡相册 (${photoEntries.length}张)</div>
                <div class="photo-grid">
                    ${photoEntries.map(e => `
                        <div class="photo-grid-item" onclick="App.openLightbox('${e.id}')">
                            <img src="${e.photo}" alt="${this.utils.escape(e.note || e.category)}">
                            <span class="photo-grid-cat">${this.accCategoryIcon(e.category)} ${this.utils.escape(e.category)}</span>
                            <div class="photo-grid-label">${e.note ? this.utils.escape(e.note) : this.utils.formatDate(e.date)} · ${e.type === 'income' ? '+' : '-'}¥${e.amount}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /* 分类图标 */
    accCategoryIcon(cat) {
        const icons = { '餐饮': '🍚', '美食打卡': '📸', '饮品': '🧋', '玩乐': '🎉', '交通': '🚌', '购物': '🛍', '学习': '📚', '健身': '💪', '其他': '💰' };
        return icons[cat] || '💰';
    },

    /* 处理照片选择（压缩） */
    handlePhotoSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // 压缩图片：最大宽度600px，质量0.7
                const canvas = document.createElement('canvas');
                const maxW = 600;
                let w = img.width, h = img.height;
                if (w > maxW) { h = h * maxW / w; w = maxW; }
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                const compressed = canvas.toDataURL('image/jpeg', 0.7);

                this.tempPhoto = compressed;
                // 显示预览
                document.getElementById('photoImg').src = compressed;
                document.getElementById('photoImg').style.display = 'block';
                document.getElementById('photoPlaceholder').style.display = 'none';
                document.getElementById('photoClearBtn').style.display = 'flex';
                document.getElementById('photoPreview').classList.add('has-photo');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },

    clearPhoto() {
        this.tempPhoto = null;
        document.getElementById('photoImg').style.display = 'none';
        document.getElementById('photoImg').src = '';
        document.getElementById('photoPlaceholder').style.display = 'block';
        document.getElementById('photoClearBtn').style.display = 'none';
        document.getElementById('photoPreview').classList.remove('has-photo');
        document.getElementById('photoInput').value = '';
    },

    /* 照片查看器 */
    openLightbox(id) {
        const month = this.accountingMonth;
        const entries = this.data.accounting[month] || [];
        const entry = entries.find(e => e.id === id);
        if (!entry || !entry.photo) return;

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.id = 'lightboxOverlay';
        overlay.onclick = (ev) => { if (ev.target === overlay) App.closeLightbox(); };
        overlay.innerHTML = `
            <button class="lightbox-close" onclick="App.closeLightbox()">✕</button>
            <img class="lightbox-img" src="${entry.photo}">
            <div class="lightbox-info">
                <div class="lightbox-cat">${this.accCategoryIcon(entry.category)} ${this.utils.escape(entry.category)}</div>
                <div class="lightbox-amount">${entry.type === 'income' ? '+' : '-'}¥${entry.amount}</div>
                <div>${this.utils.formatDate(entry.date)}${entry.note ? ' · ' + this.utils.escape(entry.note) : ''}</div>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    closeLightbox() {
        const lb = document.getElementById('lightboxOverlay');
        if (lb) lb.remove();
    },

    addAccountingManual() {
        const type = document.getElementById('accType').value;
        let category = document.getElementById('accCategory').value;
        const amount = parseFloat(document.getElementById('accAmount').value);
        const note = document.getElementById('accNote').value.trim();

        if (!amount || amount <= 0) {
            this.toast('请输入有效金额～');
            return;
        }

        // 如果是收入，添加任务奖励和其他收入选项
        if (type === 'income' && category === '餐饮') {
            category = '其他';
        }

        this.addAccountingEntry({
            type, category, amount, note,
            photo: this.tempPhoto || '',
            date: this.utils.today()
        });
        this.tempPhoto = null;
        this.navigate('accounting');
        this.toast('记账成功！');
    },

    addAccountingEntry(entry) {
        const month = entry.date.substring(0, 7);
        if (!this.data.accounting[month]) {
            this.data.accounting[month] = [];
        }
        this.data.accounting[month].push({
            id: this.utils.uid(),
            ...entry
        });
        this.saveData();
    },

    deleteAccounting(id) {
        const month = this.accountingMonth;
        const entries = this.data.accounting[month] || [];
        this.data.accounting[month] = entries.filter(e => e.id !== id);
        this.saveData();
        this.navigate('accounting');
        this.toast('已删除');
    },

    // ==================== 论文写作模块 ====================
    renderThesis(container) {
        const thesis = this.data.thesis;
        const daysToModel = this.utils.daysBetween(thesis.modelDeadline);
        const daysToDraft = this.utils.daysBetween(thesis.draftDeadline);
        const totalProgress = thesis.sections.reduce((s, sec) => s + sec.progress, 0) / (thesis.sections.length * 100) * 100;

        const customCountdowns = (thesis.customDeadlines || []).map(d => {
            const days = this.utils.daysBetween(d.date);
            return { ...d, days };
        }).sort((a, b) => a.days - b.days);

        container.innerHTML = `
            <div class="page-title"><span class="emoji">📚</span> 论文写作</div>

            <div class="card" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white">
                <div style="font-size:13px;opacity:0.9">📊 经济学硕士论文 · 整体进度</div>
                <div style="font-size:28px;font-weight:800;margin:6px 0">${totalProgress.toFixed(0)}%</div>
                <div class="progress-bar" style="background:rgba(255,255,255,0.3)">
                    <div class="progress-fill" style="width:${totalProgress}%;background:white"></div>
                </div>
            </div>

            <div class="stat-grid" style="grid-template-columns:1fr 1fr">
                <div class="countdown-card ${daysToModel < 0 ? '' : 'pink'}">
                    <div class="countdown-label">📅 数据模型截止</div>
                    <div class="countdown-number">${daysToModel > 0 ? daysToModel : '已到期'}</div>
                    <div class="countdown-label">${daysToModel > 0 ? '天后' : '请尽快完成'}</div>
                    <div class="countdown-label" style="margin-top:4px;font-size:11px">${thesis.modelDeadline}</div>
                </div>
                <div class="countdown-card teal">
                    <div class="countdown-label">📝 初稿截止</div>
                    <div class="countdown-number">${daysToDraft > 0 ? daysToDraft : '已到期'}</div>
                    <div class="countdown-label">${daysToDraft > 0 ? '天后' : '请尽快完成'}</div>
                    <div class="countdown-label" style="margin-top:4px;font-size:11px">${thesis.draftDeadline}</div>
                </div>
            </div>

            ${customCountdowns.length > 0 ? `
            <div class="stat-grid" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr))">
                ${customCountdowns.map(d => `
                    <div class="countdown-card ${d.days < 0 ? '' : 'pink'}" style="position:relative">
                        <button class="task-delete" style="position:absolute;top:4px;right:4px;font-size:12px" onclick="App.deleteThesisDeadline('${d.id}')">✕</button>
                        <div class="countdown-label">📌 ${this.utils.escape(d.name)}</div>
                        <div class="countdown-number">${d.days > 0 ? d.days : '已到期'}</div>
                        <div class="countdown-label">${d.days > 0 ? '天后' : '请尽快'}</div>
                        <div class="countdown-label" style="margin-top:4px;font-size:11px">${d.date}</div>
                    </div>
                `).join('')}
            </div>
            ` : ''}

            <div class="card">
                <div class="card-title">➕ 添加自定义截止日期</div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="input" id="deadlineName" placeholder="如：导师初审/外审/答辩">
                    </div>
                    <div class="form-group">
                        <input type="date" class="input" id="deadlineDate">
                    </div>
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addThesisDeadline()">添加倒计时</button>
            </div>

            <div class="card">
                <div class="card-title">📑 论文章节进度</div>
                ${thesis.sections.map(sec => this.renderSection(sec)).join('')}
            </div>

            <div class="card">
                <div class="card-title">📝 写作日志</div>
                <div class="form-row">
                    <div class="form-group">
                        <select class="select" id="logSection">
                            ${thesis.sections.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <textarea class="textarea" id="logContent" placeholder="今天写了什么？有什么想法或遇到的问题？"></textarea>
                <div class="form-row mt-2">
                    <div class="form-group">
                        <input type="number" class="input" id="logWords" placeholder="今日字数" min="0">
                    </div>
                    <button class="btn btn-primary" onclick="App.addThesisLog()">记录</button>
                </div>
            </div>

            ${thesis.logs.length > 0 ? `
            <div class="card">
                <div class="card-title">📖 历史日志 (${thesis.logs.length}条)</div>
                ${thesis.logs.slice(-10).reverse().map(log => {
                    const sec = thesis.sections.find(s => s.id === log.section);
                    return `
                    <div class="list-item">
                        <div style="font-size:24px">${sec ? sec.icon : '📝'}</div>
                        <div class="list-item-content">
                            <div class="list-item-title">${sec ? sec.name : ''} · ${log.words}字</div>
                            <div class="list-item-sub">${this.utils.formatDate(log.date)} · ${this.utils.escape(log.content)}</div>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            ` : ''}
        `;
    },

    renderSection(sec) {
        const statusMap = { pending: '未开始', 'in-progress': '进行中', completed: '已完成' };
        const statusBadge = { pending: 'badge-red', 'in-progress': 'badge-orange', completed: 'badge-green' };
        return `
            <div class="section-card ${sec.status}">
                <div class="section-header">
                    <div class="section-name">${sec.icon} ${sec.name}</div>
                    <span class="badge ${statusBadge[sec.status]}">${statusMap[sec.status]}</span>
                </div>
                <div class="section-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${sec.status === 'completed' ? 'teal' : 'pink'}" style="width:${sec.progress}%"></div>
                    </div>
                    <div class="section-progress-text">${sec.progress}%</div>
                </div>
                ${sec.notes ? `<div class="section-notes">📝 ${this.utils.escape(sec.notes)}</div>` : ''}
                ${sec.wordCount ? `<div class="text-sm text-muted mt-2">✍️ 已写 ${sec.wordCount} 字</div>` : ''}
                <div class="flex gap-2 mt-2">
                    <button class="btn btn-outline btn-sm" onclick="App.editSection('${sec.id}')">✏️ 编辑</button>
                    <button class="btn btn-outline btn-sm" onclick="App.updateSectionProgress('${sec.id}')">📊 更新进度</button>
                </div>
            </div>
        `;
    },

    editSection(sectionId) {
        const sec = this.data.thesis.sections.find(s => s.id === sectionId);
        if (!sec) return;

        const modal = this.showModal(
            `${sec.icon} 编辑 ${sec.name}`,
            `
            <div class="form-group mb-4">
                <label class="label">状态</label>
                <select class="select" id="secStatus">
                    <option value="pending" ${sec.status === 'pending' ? 'selected' : ''}>未开始</option>
                    <option value="in-progress" ${sec.status === 'in-progress' ? 'selected' : ''}>进行中</option>
                    <option value="completed" ${sec.status === 'completed' ? 'selected' : ''}>已完成</option>
                </select>
            </div>
            <div class="form-group mb-4">
                <label class="label">进度 (%)</label>
                <input type="number" class="input" id="secProgress" value="${sec.progress}" min="0" max="100">
            </div>
            <div class="form-group mb-4">
                <label class="label">已写字数</label>
                <input type="number" class="input" id="secWordCount" value="${sec.wordCount}" min="0">
            </div>
            <div class="form-group">
                <label class="label">笔记 / 要点</label>
                <textarea class="textarea" id="secNotes" placeholder="记录关键思路、待办事项...">${this.utils.escape(sec.notes)}</textarea>
            </div>
            `,
            (overlay) => {
                sec.status = document.getElementById('secStatus').value;
                sec.progress = Math.max(0, Math.min(100, parseInt(document.getElementById('secProgress').value) || 0));
                if (sec.status === 'completed') sec.progress = 100;
                sec.wordCount = parseInt(document.getElementById('secWordCount').value) || 0;
                sec.notes = document.getElementById('secNotes').value.trim();
                this.saveData();
                overlay.remove();
                this.navigate('thesis');
                this.toast('已保存！');
            }
        );
    },

    updateSectionProgress(sectionId) {
        const sec = this.data.thesis.sections.find(s => s.id === sectionId);
        if (!sec) return;
        const newProgress = prompt(`更新「${sec.name}」进度 (0-100):`, sec.progress);
        if (newProgress !== null) {
            const p = Math.max(0, Math.min(100, parseInt(newProgress) || 0));
            sec.progress = p;
            if (p === 100) sec.status = 'completed';
            else if (p > 0) sec.status = 'in-progress';
            else sec.status = 'pending';
            this.saveData();
            this.navigate('thesis');
            this.toast('进度已更新！');
        }
    },

    addThesisLog() {
        const section = document.getElementById('logSection').value;
        const content = document.getElementById('logContent').value.trim();
        const words = parseInt(document.getElementById('logWords').value) || 0;

        if (!content) {
            this.toast('请输入日志内容～');
            return;
        }

        this.data.thesis.logs.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            section: section,
            content: content,
            words: words
        });

        // 更新章节字数
        const sec = this.data.thesis.sections.find(s => s.id === section);
        if (sec) sec.wordCount += words;

        this.saveData();
        this.navigate('thesis');
        this.toast('日志已记录！');
    },

    addThesisDeadline() {
        const name = document.getElementById('deadlineName').value.trim();
        const date = document.getElementById('deadlineDate').value;
        if (!name || !date) {
            this.toast('请填写名称和日期～');
            return;
        }
        if (!this.data.thesis.customDeadlines) this.data.thesis.customDeadlines = [];
        this.data.thesis.customDeadlines.push({
            id: this.utils.uid(),
            name: name,
            date: date
        });
        this.saveData();
        this.navigate('thesis');
        this.toast('截止日期已添加！');
    },

    deleteThesisDeadline(id) {
        this.data.thesis.customDeadlines = (this.data.thesis.customDeadlines || []).filter(d => d.id !== id);
        this.saveData();
        this.navigate('thesis');
        this.toast('已删除');
    },

    // ==================== 考公模块 ====================
    renderExam(container) {
        if (!this.currentSubTab.exam) this.currentSubTab.exam = 'practice';

        const tabs = [
            { id: 'practice', label: '🎯 刷题', icon: '🎯' },
            { id: 'mistakes', label: '❌ 错题', icon: '❌' },
            { id: 'courses', label: '🎓 听课', icon: '🎓' },
            { id: 'commonsense', label: '📖 常识', icon: '📖' },
            { id: 'essays', label: '✍️ 申论批改', icon: '✍️' },
            { id: 'sentences', label: '🌟 金句', icon: '🌟' }
        ];

        container.innerHTML = `
            <div class="page-title"><span class="emoji">🎓</span> 考公备考</div>

            ${this.renderExamCountdowns()}

            <div class="sub-tabs">
                ${tabs.map(t => `<button class="sub-tab ${this.currentSubTab.exam === t.id ? 'active' : ''}" onclick="App.switchExamTab('${t.id}')">${t.label}</button>`).join('')}
            </div>
            <div id="examContent"></div>
        `;

        const renderers = {
            practice: () => this.renderExamPractice(),
            mistakes: () => this.renderExamMistakes(),
            courses: () => this.renderExamCourses(),
            commonsense: () => this.renderExamCommonSense(),
            essays: () => this.renderExamEssays(),
            sentences: () => this.renderExamSentences()
        };
        renderers[this.currentSubTab.exam]();
    },

    switchExamTab(tab) {
        this.currentSubTab.exam = tab;
        this.navigate('exam');
    },

    renderExamCountdowns() {
        const countdowns = this.data.exam.countdowns || [];
        const sorted = countdowns.map(c => ({
            ...c,
            days: this.utils.daysBetween(c.date)
        })).sort((a, b) => a.days - b.days);

        const upcoming = sorted.filter(c => c.days >= 0);
        const past = sorted.filter(c => c.days < 0);

        return `
            <div class="card" style="background:linear-gradient(135deg,#7B5BA6,#9B7CC4);color:white;margin-bottom:12px">
                <div style="font-size:13px;opacity:0.9">⏰ 考试倒计时</div>
                ${upcoming.length > 0 ? upcoming.map(c => `
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding:8px 0;border-top:1px solid rgba(255,255,255,0.2)">
                        <div>
                            <div style="font-size:15px;font-weight:700">${this.utils.escape(c.name)}</div>
                            <div style="font-size:11px;opacity:0.8">${c.date}</div>
                        </div>
                        <div style="text-align:center">
                            <div style="font-size:28px;font-weight:800">${c.days}</div>
                            <div style="font-size:11px;opacity:0.8">天后</div>
                        </div>
                        <button onclick="App.deleteCountdown('${c.id}')" style="background:rgba(255,255,255,0.2);border:none;color:white;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:12px">✕</button>
                    </div>
                `).join('') : '<div style="margin-top:8px;font-size:13px;opacity:0.8">暂无即将到来的考试</div>'}
            </div>

            ${past.length > 0 ? `
            <div class="card" style="margin-bottom:12px">
                <div class="card-title" style="font-size:14px;color:var(--text-sub)">✅ 已结束的考试</div>
                ${past.map(c => `
                    <div class="list-item" style="padding:6px 0">
                        <div class="list-item-content">
                            <div class="list-item-title" style="opacity:0.6;text-decoration:line-through">${this.utils.escape(c.name)}</div>
                            <div class="list-item-sub">${c.date}</div>
                        </div>
                        <button class="task-delete" onclick="App.deleteCountdown('${c.id}')">🗑</button>
                    </div>
                `).join('')}
            </div>
            ` : ''}

            <div class="card" style="margin-bottom:12px">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="input" id="countdownName" placeholder="考试名称（如：选调生）">
                    </div>
                    <div class="form-group">
                        <input type="date" class="input" id="countdownDate">
                    </div>
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addCountdown()">添加考试倒计时</button>
            </div>
        `;
    },

    addCountdown() {
        const name = document.getElementById('countdownName').value.trim();
        const date = document.getElementById('countdownDate').value;
        if (!name || !date) {
            this.toast('请填写名称和日期～');
            return;
        }
        if (!this.data.exam.countdowns) this.data.exam.countdowns = [];
        this.data.exam.countdowns.push({
            id: this.utils.uid(),
            name: name,
            date: date
        });
        this.saveData();
        this.navigate('exam');
        this.toast('倒计时已添加！');
    },

    deleteCountdown(id) {
        this.data.exam.countdowns = (this.data.exam.countdowns || []).filter(c => c.id !== id);
        this.saveData();
        this.navigate('exam');
        this.toast('已删除');
    },

    renderExamPractice() {
        const practices = this.data.exam.practice;
        const subjects = ['行测-言语', '行测-判断', '行测-数量', '行测-资料', '行测-常识', '申论'];

        // 按科目统计
        const subjectStats = {};
        subjects.forEach(s => { subjectStats[s] = { total: 0, correct: 0, count: 0 }; });
        practices.forEach(p => {
            if (subjectStats[p.subject]) {
                subjectStats[p.subject].total += p.total;
                subjectStats[p.subject].correct += p.correct;
                subjectStats[p.subject].count++;
            }
        });

        const container = document.getElementById('examContent');
        container.innerHTML = `
            <div class="card">
                <div class="card-title">🎯 添加刷题记录</div>
                <div class="form-row">
                    <div class="form-group">
                        <select class="select" id="practiceSubject">
                            ${subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="number" class="input" id="practiceTotal" placeholder="总题数" min="0">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="number" class="input" id="practiceCorrect" placeholder="正确数" min="0">
                    </div>
                    <button class="btn btn-primary" onclick="App.addPractice()">记录</button>
                </div>
            </div>

            ${practices.length > 0 ? `
            <div class="card">
                <div class="card-title">📊 科目正确率汇总</div>
                ${subjects.filter(s => subjectStats[s].total > 0).map(s => {
                    const stat = subjectStats[s];
                    const rate = stat.total > 0 ? (stat.correct / stat.total * 100).toFixed(1) : 0;
                    const color = rate >= 80 ? 'teal' : rate >= 60 ? 'orange' : 'pink';
                    return `
                        <div style="margin-bottom:12px">
                            <div class="flex justify-between mb-2">
                                <span class="font-bold">${s}</span>
                                <span class="text-muted">${stat.correct}/${stat.total} · ${rate}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill ${color}" style="width:${rate}%"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="card">
                <div class="card-title">📋 最近刷题记录</div>
                ${practices.slice(-15).reverse().map(p => {
                    const rate = p.total > 0 ? (p.correct / p.total * 100).toFixed(1) : 0;
                    return `
                    <div class="list-item">
                        <div style="font-size:24px">🎯</div>
                        <div class="list-item-content">
                            <div class="list-item-title">${p.subject} · ${rate}%</div>
                            <div class="list-item-sub">${this.utils.formatDate(p.date)} · 正确 ${p.correct}/${p.total}</div>
                        </div>
                        <span class="badge ${rate >= 80 ? 'badge-green' : rate >= 60 ? 'badge-orange' : 'badge-red'}">${rate}%</span>
                        <button class="task-delete" onclick="App.deletePractice('${p.id}')">🗑</button>
                    </div>
                    `;
                }).join('')}
            </div>
            ` : `
            <div class="card">
                <div class="empty-state">
                    <div class="empty-state-icon">🎯</div>
                    <div class="empty-state-text">还没有刷题记录，开始记录第一次吧！</div>
                </div>
            </div>
            `}
        `;
    },

    addPractice() {
        const subject = document.getElementById('practiceSubject').value;
        const total = parseInt(document.getElementById('practiceTotal').value) || 0;
        const correct = parseInt(document.getElementById('practiceCorrect').value) || 0;

        if (total <= 0) {
            this.toast('请输入总题数～');
            return;
        }
        if (correct > total) {
            this.toast('正确数不能大于总题数！');
            return;
        }

        this.data.exam.practice.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            subject: subject,
            total: total,
            correct: correct
        });
        this.saveData();
        this.navigate('exam');
        this.toast('刷题记录已添加！');
    },

    deletePractice(id) {
        this.data.exam.practice = this.data.exam.practice.filter(p => p.id !== id);
        this.saveData();
        this.navigate('exam');
    },

    renderExamMistakes() {
        const mistakes = this.data.exam.mistakes;
        const subjects = ['行测-言语', '行测-判断', '行测-数量', '行测-资料', '行测-常识', '申论', '逻辑', '图推'];

        const container = document.getElementById('examContent');
        container.innerHTML = `
            <div class="card">
                <div class="card-title">❌ 添加错题</div>
                <div class="form-row">
                    <div class="form-group">
                        <select class="select" id="mistakeSubject">
                            ${subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="mb-2">
                    <textarea class="textarea" id="mistakeQuestion" placeholder="题目内容"></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="input" id="mistakeCorrect" placeholder="正确答案">
                    </div>
                    <div class="form-group">
                        <input type="text" class="input" id="mistakeMine" placeholder="我的答案">
                    </div>
                </div>
                <div class="mb-2">
                    <textarea class="textarea" id="mistakeAnalysis" placeholder="错因分析 / 知识点"></textarea>
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addMistake()">添加错题</button>
            </div>

            ${mistakes.length > 0 ? `
            <div class="card">
                <div class="card-title">📋 错题本 (${mistakes.length}题)</div>
                ${mistakes.slice(-20).reverse().map(m => `
                    <div class="list-item" style="flex-direction:column;align-items:stretch">
                        <div class="flex justify-between items-center">
                            <span class="badge badge-purple">${m.subject}</span>
                            <span class="text-sm text-muted">${this.utils.formatDate(m.date)}</span>
                            <button class="task-delete" onclick="App.deleteMistake('${m.id}')">🗑</button>
                        </div>
                        <div style="margin-top:8px;font-size:14px;font-weight:600">${this.utils.escape(m.question)}</div>
                        <div class="text-sm mt-2">
                            <span style="color:var(--success)">✓ ${this.utils.escape(m.correctAnswer)}</span>
                            &nbsp;|&nbsp;
                            <span style="color:var(--danger)">✗ ${this.utils.escape(m.myAnswer)}</span>
                        </div>
                        ${m.analysis ? `<div class="text-sm text-muted mt-2">💡 ${this.utils.escape(m.analysis)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : `
            <div class="card">
                <div class="empty-state">
                    <div class="empty-state-icon">❌</div>
                    <div class="empty-state-text">还没有错题，继续保持！</div>
                </div>
            </div>
            `}
        `;
    },

    addMistake() {
        const subject = document.getElementById('mistakeSubject').value;
        const question = document.getElementById('mistakeQuestion').value.trim();
        const correctAnswer = document.getElementById('mistakeCorrect').value.trim();
        const myAnswer = document.getElementById('mistakeMine').value.trim();
        const analysis = document.getElementById('mistakeAnalysis').value.trim();

        if (!question) {
            this.toast('请输入题目内容～');
            return;
        }

        this.data.exam.mistakes.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            subject, question, correctAnswer, myAnswer, analysis
        });
        this.saveData();
        this.navigate('exam');
        this.toast('错题已记录！');
    },

    deleteMistake(id) {
        this.data.exam.mistakes = this.data.exam.mistakes.filter(m => m.id !== id);
        this.saveData();
        this.navigate('exam');
    },

    renderExamCourses() {
        const courses = this.data.exam.courses;
        const container = document.getElementById('examContent');

        const courseHtml = courses.map(c => {
            const progress = c.total > 0 ? (c.completed / c.total * 100).toFixed(0) : 0;
            const remaining = c.total - c.completed;
            let dailyTask = '';
            let daysLeft = null;
            if (c.targetDate && c.total > 0) {
                daysLeft = this.utils.daysBetween(c.targetDate);
                if (daysLeft > 0 && remaining > 0) {
                    const perDay = (remaining / daysLeft).toFixed(1);
                    dailyTask = `每天需听 <strong style="color:var(--primary);font-size:16px">${perDay}</strong> 节`;
                } else if (daysLeft <= 0) {
                    dailyTask = '<span style="color:var(--danger)">目标日期已过，请调整</span>';
                } else if (remaining <= 0) {
                    dailyTask = '<span style="color:var(--success)">🎉 已全部完成！</span>';
                }
            }

            return `
            <div class="course-card" style="flex-direction:column;align-items:stretch;padding:12px;border:1px solid var(--bg-main);border-radius:12px;margin-bottom:12px">
                <div class="flex items-center gap-2">
                    <div class="course-icon" style="background:${c.id === 'logic' ? 'var(--primary-light)' : c.id === 'graphic' ? 'var(--secondary-light)' : 'var(--accent-light)'};width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">
                        ${c.icon}
                    </div>
                    <div class="course-info" style="flex:1">
                        <div class="course-name" style="font-weight:700;font-size:15px">${c.name} · ${c.teacher}</div>
                        <div class="course-teacher" style="font-size:12px;color:var(--text-sub)">已听 ${c.completed} / ${c.total || '?'} 节 · 剩余 ${remaining > 0 ? remaining : 0} 节</div>
                    </div>
                    <div style="text-align:right">
                        <div style="font-size:18px;font-weight:800;color:var(--primary)">${progress}%</div>
                    </div>
                </div>
                <div class="section-progress mt-2">
                    <div class="progress-bar">
                        <div class="progress-fill ${c.id === 'logic' ? 'pink' : c.id === 'graphic' ? 'teal' : 'purple'}" style="width:${progress}%"></div>
                    </div>
                </div>
                ${dailyTask ? `
                <div style="margin-top:8px;padding:8px 10px;background:var(--warning-light);border-radius:8px;font-size:13px;line-height:1.6">
                    📅 目标：${c.targetDate}（${daysLeft !== null && daysLeft > 0 ? '剩' + daysLeft + '天' : ''}）
                    <br>${dailyTask}
                </div>
                ` : ''}
                <div class="flex gap-2 mt-2 flex-wrap">
                    <input type="number" class="input" style="width:70px" id="total_${c.id}" placeholder="总课时" value="${c.total || ''}">
                    <button class="btn btn-outline btn-sm" onclick="App.updateCourseTotal('${c.id}')">📊 设总课时</button>
                    <input type="date" class="input" style="width:130px" id="target_${c.id}" value="${c.targetDate || ''}">
                    <button class="btn btn-outline btn-sm" onclick="App.updateCourseTarget('${c.id}')">📅 设目标日</button>
                    <button class="btn btn-primary btn-sm" onclick="App.courseProgress('${c.id}', 1)">➕ +1节</button>
                    ${c.completed > 0 ? `<button class="btn btn-outline btn-sm" onclick="App.courseProgress('${c.id}', -1)">➖ -1</button>` : ''}
                </div>
            </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="card" style="background:linear-gradient(135deg,#4ECDC4,#6FE0D8);color:white;margin-bottom:12px">
                <div style="font-size:13px;opacity:0.9">📊 每日听课任务计算</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    设置总课时和目标完成日期，系统自动计算每天需要听几节课
                </div>
            </div>
            <div class="card">
                <div class="card-title">🎓 听课安排</div>
                ${courseHtml}
            </div>
        `;
    },

    updateCourseTotal(courseId) {
        const course = this.data.exam.courses.find(c => c.id === courseId);
        const total = parseInt(document.getElementById('total_' + courseId).value) || 0;
        course.total = total;
        this.saveData();
        this.navigate('exam');
        this.toast('已更新总课时');
    },

    updateCourseTarget(courseId) {
        const course = this.data.exam.courses.find(c => c.id === courseId);
        const date = document.getElementById('target_' + courseId).value;
        course.targetDate = date || '';
        this.saveData();
        this.navigate('exam');
        this.toast('已设置目标日期');
    },

    courseProgress(courseId, delta) {
        const course = this.data.exam.courses.find(c => c.id === courseId);
        course.completed = Math.max(0, course.completed + delta);
        if (course.total > 0 && course.completed >= course.total) {
            course.completed = course.total;
        }
        this.saveData();
        this.navigate('exam');
        if (delta > 0) this.toast('🎉 又听完一节！');
    },

    /* 常识与政治理论 - 每日推送5个 */
    renderExamCommonSense() {
        const container = document.getElementById('examContent');
        const dayOfYear = this.getDayOfYear();
        const today = this.utils.formatDate(this.utils.today());

        // 每天推送5个不同知识点
        const daily5 = [];
        for (let i = 0; i < 5; i++) {
            const idx = (dayOfYear * 5 + i) % COMMON_SENSE_LIBRARY.length;
            daily5.push(COMMON_SENSE_LIBRARY[idx]);
        }

        // 统计分类
        const cats = [...new Set(COMMON_SENSE_LIBRARY.map(c => c.cat))];
        const catCounts = {};
        cats.forEach(c => { catCounts[c] = COMMON_SENSE_LIBRARY.filter(x => x.cat === c).length; });

        // 展开答案的状态
        if (!this._csExpanded) this._csExpanded = {};

        container.innerHTML = `
            <div class="card" style="background:linear-gradient(135deg,#7B5BA6,#9B7CC4);color:white">
                <div style="font-size:13px;opacity:0.9">📖 每日常识推送</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    ${today} · 每日更新5个知识点 · 第${dayOfYear}天
                </div>
            </div>

            ${daily5.map((item, i) => {
                const expanded = this._csExpanded[i];
                return `
                    <div class="card" style="${i === 0 ? 'border:2px solid #7B5BA6' : ''}">
                        <div class="flex justify-between items-center mb-2">
                            <span class="badge badge-purple">${item.cat}</span>
                            <span class="text-sm text-muted">第${i + 1}题</span>
                        </div>
                        <div style="font-size:15px;font-weight:600;color:var(--text-main);line-height:1.6;margin-bottom:8px">
                            ${this.utils.escape(item.q)}
                        </div>
                        ${expanded ? `
                            <div style="padding:10px;background:var(--success-light);border-radius:8px;font-size:14px;color:var(--text-main);line-height:1.7;margin-bottom:6px">
                                <strong>✅ 答：</strong>${this.utils.escape(item.a)}
                            </div>
                            <div class="text-sm text-muted">📎 来源：${this.utils.escape(item.source)}</div>
                            <button class="btn btn-outline btn-sm mt-2" onclick="App._toggleCS(${i})">收起答案</button>
                        ` : `
                            <button class="btn btn-primary btn-sm mt-2" onclick="App._toggleCS(${i})">👀 查看答案</button>
                        `}
                    </div>
                `;
            }).join('')}

            <div class="card">
                <div class="card-title">🏷 知识库分类 (${COMMON_SENSE_LIBRARY.length}个知识点)</div>
                <div class="flex gap-2 flex-wrap">
                    ${cats.map(c => `<span class="badge badge-purple" style="cursor:default">${c}(${catCounts[c]})</span>`).join('')}
                </div>
            </div>

            <div class="card" style="background:var(--accent-light)">
                <div style="font-size:13px;color:var(--text-sub);line-height:1.7">
                    💡 <strong>使用说明：</strong><br>
                    · 每天推送5个不同知识点，覆盖法律/政治/经济/地理/历史/文学/科技等<br>
                    · 先自己思考答案，再点击"查看答案"<br>
                    · 常识题在行测中占比较大，建议每天坚持积累<br>
                    · 政治理论部分需结合时政热点理解记忆
                </div>
            </div>
        `;
    },

    _toggleCS(idx) {
        if (!this._csExpanded) this._csExpanded = {};
        this._csExpanded[idx] = !this._csExpanded[idx];
        this.renderExamCommonSense();
    },

    renderExamEssays() {
        const essays = this.data.exam.essays;
        const container = document.getElementById('examContent');
        container.innerHTML = `
            <div class="card">
                <div class="card-title">✍️ 申论练习</div>
                <div class="form-group mb-2">
                    <input type="text" class="input" id="essayTitle" placeholder="文章标题">
                </div>
                <div class="form-group mb-2">
                    <textarea class="textarea" id="essayContent" placeholder="在这里输入申论文章..." style="min-height:200px"></textarea>
                </div>
                <div class="flex gap-2">
                    <button class="btn btn-primary" style="flex:1" onclick="App.addEssay()">💾 保存</button>
                    <button class="btn" style="flex:1;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none" onclick="App.aiGradeEssay()">🤖 AI智能批改</button>
                </div>
            </div>

            <div class="card" style="background:var(--accent-light)">
                <div style="font-size:13px;color:var(--text-sub);line-height:1.7">
                    💡 <strong>AI批改说明：</strong><br>
                    点击「🤖 AI智能批改」后，系统会从字数、结构、立意、语言、金句匹配等维度进行智能分析，给出分数和改进建议。保存后也可随时查看全文和批改结果。
                </div>
            </div>

            ${essays.length > 0 ? `
            <div class="card">
                <div class="card-title">📄 申论存稿 (${essays.length}篇)</div>
                ${essays.slice(-10).reverse().map(e => `
                    <div class="list-item" style="flex-direction:column;align-items:stretch">
                        <div class="flex justify-between items-center">
                            <div class="list-item-title">${this.utils.escape(e.title || '无标题')}</div>
                            ${e.score ? `<span class="badge badge-orange">${e.score}分</span>` : '<span class="badge badge-red">未评分</span>'}
                            <button class="task-delete" onclick="App.deleteEssay('${e.id}')">🗑</button>
                        </div>
                        <div class="text-sm text-muted mt-2">${this.utils.formatDate(e.date)}</div>
                        <div class="text-sm mt-2" style="max-height:80px;overflow:hidden;color:var(--text-sub)">
                            ${this.utils.escape(e.content.substring(0, 150))}${e.content.length > 150 ? '...' : ''}
                        </div>
                        ${e.aiAnalysis ? `
                            <div class="mt-2" style="padding:10px;background:var(--accent-light);border-radius:8px;font-size:13px;line-height:1.7">
                                <div style="font-weight:700;color:var(--accent);margin-bottom:4px">🤖 AI批改结果</div>
                                ${this.utils.escape(e.aiAnalysis).replace(/\n/g, '<br>')}
                            </div>
                        ` : e.feedback ? `<div class="text-sm mt-2" style="color:var(--accent)">💬 ${this.utils.escape(e.feedback)}</div>` : ''}
                        <div class="flex gap-2 mt-2">
                            <button class="btn btn-outline btn-sm" onclick="App.viewEssay('${e.id}')">📖 查看全文</button>
                            <button class="btn btn-sm" style="background:var(--accent);color:white;border:none" onclick="App.aiGradeExisting('${e.id}')">🤖 重新批改</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : `
            <div class="card">
                <div class="empty-state">
                    <div class="empty-state-icon">✍️</div>
                    <div class="empty-state-text">还没有申论练习，开始写第一篇吧！</div>
                </div>
            </div>
            `}
        `;
    },

    /* AI智能批改核心逻辑 */
    aiAnalyzeEssay(content) {
        const charCount = content.length;
        const scores = {};
        const suggestions = [];

        // 1. 字数分析
        if (charCount < 200) {
            scores.wordCount = 5;
            suggestions.push('⚠️ 字数过少（' + charCount + '字），申论一般要求800-1200字，建议扩充内容');
        } else if (charCount < 500) {
            scores.wordCount = 10;
            suggestions.push('⚠️ 字数偏少（' + charCount + '字），建议达到800字以上');
        } else if (charCount < 800) {
            scores.wordCount = 15;
            suggestions.push('📝 字数基本达标（' + charCount + '字），可适当扩充论证部分');
        } else if (charCount <= 1300) {
            scores.wordCount = 20;
            suggestions.push('✅ 字数合理（' + charCount + '字），符合申论要求');
        } else {
            scores.wordCount = 15;
            suggestions.push('⚠️ 字数偏多（' + charCount + '字），注意控制篇幅，突出重点');
        }

        // 2. 结构分析
        let structureScore = 0;
        const structureItems = [];
        const hasOpening = /(?:综上所述|总而言之|当前|近年来|随着|面对|新时代|新征程|当下)/.test(content.substring(0, 200));
        const hasArgument = /(?:首先|其次|再次|最后|一方面|另一方面|其一|其二|一是|二是|此外|同时)/.test(content);
        const hasCountermeasure = /(?:对策|建议|措施|应当|应该|需要|必须|着力|推动|推进|加强|完善|健全|强化|落实|深化)/.test(content);
        const hasClosing = /(?:总之|综上|归根结底|总而言之|综上来看|由此可见|展望未来|面向未来)/.test(content.substring(content.length - 300));

        if (hasOpening) { structureScore += 5; structureItems.push('✅ 有开篇引入'); }
        else { suggestions.push('⚠️ 开篇缺少引入语，建议用"当前/近年来/随着"等开头'); }
        if (hasArgument) { structureScore += 5; structureItems.push('✅ 有分层论证（首先/其次等）'); }
        else { suggestions.push('⚠️ 论证部分缺少层次词，建议使用"首先/其次/再次"等分层'); }
        if (hasCountermeasure) { structureScore += 5; structureItems.push('✅ 有对策建议'); }
        else { suggestions.push('⚠️ 未检测到明显的对策建议，申论需有"对策/建议/措施"部分'); }
        if (hasClosing) { structureScore += 5; structureItems.push('✅ 有结尾总结'); }
        else { suggestions.push('⚠️ 结尾缺少总结语，建议用"总之/综上"等收束'); }
        scores.structure = structureScore;

        // 3. 立意分析
        let themeScore = 0;
        const policyKeywords = ['人民', '发展', '改革', '创新', '治理', '乡村', '生态', '文化', '民生', '法治', '安全', '高质量', '现代化', '共同富裕', '新发展理念', '供给侧', '动能转换', '数字化', '绿色', '协调', '共享', '开放'];
        const matchedKeywords = policyKeywords.filter(kw => content.includes(kw));
        if (matchedKeywords.length >= 8) themeScore = 20;
        else if (matchedKeywords.length >= 5) themeScore = 15;
        else if (matchedKeywords.length >= 3) themeScore = 10;
        else themeScore = 5;
        scores.theme = themeScore;
        if (matchedKeywords.length < 5) {
            suggestions.push('⚠️ 政策关键词偏少（匹配' + matchedKeywords.length + '个），建议多使用"发展/治理/创新/民生"等规范表述');
        } else {
            suggestions.push('✅ 政策关键词丰富（匹配' + matchedKeywords.length + '个）：' + matchedKeywords.slice(0, 6).join('、'));
        }

        // 4. 语言规范分析
        let langScore = 20;
        const colloquialPatterns = ['我觉得', '我认为', '感觉', '好像', '大概', '差不多', ' stuff', '牛逼', '厉害', '超赞', '绝了'];
        const colloquialFound = colloquialPatterns.filter(p => content.includes(p));
        if (colloquialFound.length > 0) {
            langScore -= colloquialFound.length * 3;
            suggestions.push('⚠️ 检测到口语化表达：' + colloquialFound.join('、') + '，申论需使用规范书面语');
        }
        const formalPatterns = ['亟待', '不容忽视', '至关重要', '不可或缺', '行之有效', '因地制宜', '统筹兼顾', '标本兼治', '齐抓共管', '多措并举'];
        const formalFound = formalPatterns.filter(p => content.includes(p));
        if (formalFound.length > 0) {
            langScore += 0;
            suggestions.push('✅ 使用了规范表述：' + formalFound.slice(0, 3).join('、'));
        } else {
            suggestions.push('📝 建议增加规范表述，如"亟待/至关重要/行之有效/多措并举"等');
        }
        scores.language = Math.max(0, Math.min(20, langScore));

        // 5. 金句匹配
        let quoteScore = 0;
        const allSentences = [];
        Object.values(GOLDEN_SENTENCES_LIBRARY).forEach(cat => cat.forEach(s => allSentences.push(s.content)));
        const matchedQuotes = allSentences.filter(q => {
            if (q.length < 6) return false;
            const keyPart = q.substring(0, Math.min(q.length, 8));
            return content.includes(keyPart);
        });
        if (matchedQuotes.length >= 3) quoteScore = 20;
        else if (matchedQuotes.length >= 1) quoteScore = 15;
        else quoteScore = 8;
        scores.quote = quoteScore;
        if (matchedQuotes.length > 0) {
            suggestions.push('✅ 检测到使用金句："' + matchedQuotes[0].substring(0, 20) + '..."');
        } else {
            suggestions.push('📝 未检测到经典金句，建议在开头/结尾引用，可从「🌟 金句」模块收藏中使用');
        }

        // 计算总分
        const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

        // 生成评语
        let level = '';
        if (totalScore >= 85) level = '🌟 优秀';
        else if (totalScore >= 70) level = '👍 良好';
        else if (totalScore >= 55) level = '📝 中等';
        else if (totalScore >= 40) level = '⚠️ 待提升';
        else level = '❗ 需要重写';

        const analysis = [
            '━━━━━━━━━━━━━━━━━━━━',
            '🤖 AI智能批改报告',
            '━━━━━━━━━━━━━━━━━━━━',
            '',
            '📊 总分：' + totalScore + '/100  ' + level,
            '',
            '📋 分项得分：',
            '  • 字数篇幅：' + scores.wordCount + '/20',
            '  • 文章结构：' + scores.structure + '/20',
            '  • 立意深度：' + scores.theme + '/20',
            '  • 语言规范：' + scores.language + '/20',
            '  • 金句运用：' + scores.quote + '/20',
            '',
            '📝 结构检测：',
            ...structureItems.map(s => '  ' + s),
            '',
            '💡 改进建议：',
            ...suggestions.map(s => '  ' + s),
            '',
            '━━━━━━━━━━━━━━━━━━━━',
            '字数统计：' + charCount + '字',
            '政策关键词：' + matchedKeywords.length + '个',
            '规范表述：' + formalFound.length + '处',
            '匹配金句：' + matchedQuotes.length + '条'
        ].join('\n');

        return { score: totalScore, analysis: analysis };
    },

    aiGradeEssay() {
        const content = document.getElementById('essayContent').value.trim();
        if (!content) {
            this.toast('请先输入申论内容～');
            return;
        }
        const title = document.getElementById('essayTitle').value.trim() || '无标题';
        const result = this.aiAnalyzeEssay(content);

        // 保存并显示结果
        const essay = {
            id: this.utils.uid(),
            date: this.utils.today(),
            title: title,
            content: content,
            score: result.score,
            feedback: '',
            aiAnalysis: result.analysis
        };
        this.data.exam.essays.push(essay);
        this.saveData();

        // 显示批改结果弹窗
        this.showModal(
            '🤖 AI批改结果 · ' + title,
            '<div style="white-space:pre-wrap;font-size:13px;line-height:1.8">' + this.utils.escape(result.analysis) + '</div>',
            (overlay) => overlay.remove()
        );
        this.navigate('exam');
    },

    aiGradeExisting(id) {
        const essay = this.data.exam.essays.find(e => e.id === id);
        if (!essay) return;
        const result = this.aiAnalyzeEssay(essay.content);
        essay.score = result.score;
        essay.aiAnalysis = result.analysis;
        this.saveData();
        this.showModal(
            '🤖 AI批改结果 · ' + essay.title,
            '<div style="white-space:pre-wrap;font-size:13px;line-height:1.8">' + this.utils.escape(result.analysis) + '</div>',
            (overlay) => overlay.remove()
        );
        this.navigate('exam');
    },

    addEssay() {
        const title = document.getElementById('essayTitle').value.trim();
        const content = document.getElementById('essayContent').value.trim();

        if (!content) {
            this.toast('请输入文章内容～');
            return;
        }

        this.data.exam.essays.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            title: title || '无标题',
            content: content,
            score: 0,
            feedback: '',
            aiAnalysis: ''
        });
        this.saveData();
        this.navigate('exam');
        this.toast('申论已保存！可点击「🤖 重新批改」进行AI批改');
    },

    viewEssay(id) {
        const essay = this.data.exam.essays.find(e => e.id === id);
        if (!essay) return;
        this.showModal(
            '✍️ ' + essay.title,
            `
            <div class="text-sm text-muted mb-2">${this.utils.formatDate(essay.date)} ${essay.score ? '· ' + essay.score + '分' : ''}</div>
            <div style="white-space:pre-wrap;font-size:14px;line-height:1.8;max-height:300px;overflow-y:auto;padding:8px;background:var(--bg-main);border-radius:8px">${this.utils.escape(essay.content)}</div>
            ${essay.aiAnalysis ? `
                <div class="mt-3" style="padding:12px;background:var(--accent-light);border-radius:8px;font-size:13px;line-height:1.7;white-space:pre-wrap">${this.utils.escape(essay.aiAnalysis)}</div>
            ` : ''}
            <div class="modal-actions" style="flex-direction:column">
                <input type="number" class="input" id="editScore" placeholder="修改分数" value="${essay.score}" min="0" max="100">
                <textarea class="textarea mt-2" id="editFeedback" placeholder="手动批改意见（可选）">${this.utils.escape(essay.feedback)}</textarea>
            </div>
            `,
            (overlay) => {
                essay.score = parseInt(document.getElementById('editScore').value) || 0;
                essay.feedback = document.getElementById('editFeedback').value.trim();
                this.saveData();
                overlay.remove();
                this.navigate('exam');
                this.toast('批改已保存！');
            }
        );
    },

    deleteEssay(id) {
        this.data.exam.essays = this.data.exam.essays.filter(e => e.id !== id);
        this.saveData();
        this.navigate('exam');
    },

    renderExamSentences() {
        if (!this.currentSubTab.sentences) this.currentSubTab.sentences = 'daily';
        const sentences = this.data.exam.goldenSentences;
        const categories = ['开头', '论证', '过渡', '结尾', '对策', '其他', '主题金句'];
        const container = document.getElementById('examContent');

        const subTabs = [
            { id: 'daily', label: '☀️ 每日金句' },
            { id: 'cases', label: '📖 每日案例' },
            { id: 'library', label: '📚 推荐金句库' },
            { id: 'search', label: '🔍 联网搜索' },
            { id: 'manual', label: '✍️ 自行添加' },
            { id: 'mine', label: `📌 我的收藏(${sentences.length})` }
        ];

        container.innerHTML = `
            <div class="sub-tabs">
                ${subTabs.map(t => `<button class="sub-tab ${this.currentSubTab.sentences === t.id ? 'active' : ''}" onclick="App.switchSentenceTab('${t.id}')">${t.label}</button>`).join('')}
            </div>
            <div id="sentenceTabContent"></div>
        `;

        const renderers = {
            daily: () => this.renderDailySentences(),
            cases: () => this.renderDailyCases(),
            library: () => this.renderSentenceLibrary(),
            search: () => this.renderSentenceSearch(),
            manual: () => this.renderSentenceManual(categories),
            mine: () => this.renderSentenceMine(sentences, categories)
        };
        renderers[this.currentSubTab.sentences]();
    },

    switchSentenceTab(tab) {
        this.currentSubTab.sentences = tab;
        this.navigate('exam');
    },

    /* 每日金句 - 按日期自动轮换 */
    getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        return Math.floor((now - start) / 86400000);
    },

    renderDailySentences() {
        const container = document.getElementById('sentenceTabContent');
        const dayOfYear = this.getDayOfYear();
        const allCategories = Object.keys(GOLDEN_SENTENCES_LIBRARY);
        const allSentences = [];
        allCategories.forEach(cat => {
            GOLDEN_SENTENCES_LIBRARY[cat].forEach(s => allSentences.push({ ...s, category: cat }));
        });

        // 按日期轮换，每天展示3条不同金句
        const dailyPicks = [];
        for (let i = 0; i < 3; i++) {
            const idx = (dayOfYear * 3 + i) % allSentences.length;
            dailyPicks.push(allSentences[idx]);
        }

        const today = this.utils.formatDate(this.utils.today());
        const mySentences = this.data.exam.goldenSentences;

        container.innerHTML = `
            <div class="card" style="background:linear-gradient(135deg,#7B5BA6,#9B7CC4);color:white">
                <div style="font-size:13px;opacity:0.9">☀️ 每日金句推荐</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    ${today} · 每日自动更新3条精选金句
                </div>
            </div>

            ${dailyPicks.map((s, i) => {
                const alreadyCollected = mySentences.some(ms => ms.content === s.content);
                return `
                    <div class="card" style="${i === 0 ? 'border:2px solid #7B5BA6' : ''}">
                        <div class="flex justify-between items-center mb-2">
                            <span class="badge badge-purple">${s.category}</span>
                            <span class="text-sm text-muted">第${dayOfYear}天 · 第${i + 1}条</span>
                        </div>
                        <div style="font-size:16px;line-height:1.8;font-weight:600;color:var(--text-main)">
                            ${this.utils.escape(s.content)}
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <span class="text-sm text-muted">来源：${this.utils.escape(s.source)}</span>
                            ${alreadyCollected ?
                                '<span class="badge badge-green">✓ 已收藏</span>' :
                                `<button class="btn btn-primary btn-sm" onclick="App.collectDailySentence('${s.category}', '${s.content.replace(/'/g, "\\'")}', '${s.source.replace(/'/g, "\\'")}')">＋ 收藏</button>`
                            }
                        </div>
                    </div>
                `;
            }).join('')}

            <div class="card" style="background:var(--accent-light)">
                <div style="font-size:13px;color:var(--text-sub);line-height:1.7">
                    💡 <strong>每日更新说明：</strong><br>
                    · 系统每天自动从${allSentences.length}条金句库中轮换推荐3条<br>
                    · 金句来源涵盖人民日报、经典名言、申论模板等<br>
                    · 点击"收藏"可将金句保存到"我的收藏"<br>
                    · 想查看全部金句请切换到「📚 推荐金句库」
                </div>
            </div>

            <div class="card">
                <div class="card-title">📰 今日金句拓展阅读</div>
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:10px">
                    点击以下链接，查看今天的人民日报、学习强国等最新文章，寻找更多金句素材
                </div>
                ${SENTENCE_SEARCH_LINKS.map(link => `
                    <a href="${link.url}" target="_blank" style="text-decoration:none;color:inherit">
                        <div class="list-item">
                            <div style="font-size:24px">${link.icon}</div>
                            <div class="list-item-content">
                                <div class="list-item-title">${link.name}</div>
                                <div class="list-item-sub">点击查看今日最新</div>
                            </div>
                            <span style="color:var(--text-light)">↗</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    },

    collectDailySentence(category, content, source) {
        if (this.data.exam.goldenSentences.some(s => s.content === content)) {
            this.toast('已经收藏过这条了～');
            return;
        }
        this.data.exam.goldenSentences.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            category: category,
            content: content,
            source: source
        });
        this.saveData();
        this.navigate('exam');
        this.toast('已收藏到我的金句库！');
    },

    /* 每日案例 - 按日期自动轮换 */
    renderDailyCases() {
        const container = document.getElementById('sentenceTabContent');
        const dayOfYear = this.getDayOfYear();
        const today = this.utils.formatDate(this.utils.today());

        // 每天展示1个主案例 + 2个扩展案例
        const mainIdx = dayOfYear % ESSAY_CASES_LIBRARY.length;
        const mainCase = ESSAY_CASES_LIBRARY[mainIdx];
        const case2Idx = (dayOfYear + 1) % ESSAY_CASES_LIBRARY.length;
        const case3Idx = (dayOfYear + 2) % ESSAY_CASES_LIBRARY.length;
        const case2 = ESSAY_CASES_LIBRARY[case2Idx];
        const case3 = ESSAY_CASES_LIBRARY[case3Idx];

        const caseCategories = [...new Set(ESSAY_CASES_LIBRARY.map(c => c.category))];

        container.innerHTML = `
            <div class="card" style="background:linear-gradient(135deg,#4ECDC4,#6FE0D8);color:white">
                <div style="font-size:13px;opacity:0.9">📖 每日申论案例</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    ${today} · 每日更新1个精选案例 + 2个拓展案例
                </div>
            </div>

            <!-- 今日主案例 -->
            <div class="card" style="border:2px solid #4ECDC4">
                <div class="flex justify-between items-center mb-2">
                    <span class="badge badge-teal">${mainCase.category}</span>
                    <span class="badge badge-orange">⭐ 今日推荐</span>
                </div>
                <div style="font-size:16px;font-weight:700;color:var(--text-main);line-height:1.6;margin-bottom:10px">
                    ${this.utils.escape(mainCase.title)}
                </div>
                <div style="font-size:14px;color:var(--text-sub);line-height:1.8;margin-bottom:12px">
                    ${this.utils.escape(mainCase.content)}
                </div>
                <div style="padding:10px;background:var(--warning-light);border-radius:8px;font-size:13px;color:var(--text-sub);line-height:1.7;margin-bottom:8px">
                    <strong>💡 申论角度：</strong><br>${this.utils.escape(mainCase.insight)}
                </div>
                <div class="text-sm text-muted">
                    📎 来源：${this.utils.escape(mainCase.source)}
                </div>
            </div>

            <!-- 拓展案例 -->
            <div class="card">
                <div class="card-title">📑 今日拓展案例</div>
                ${[case2, case3].map(c => `
                    <div style="padding:12px;border:1px solid var(--bg-main);border-radius:10px;margin-bottom:10px">
                        <div class="flex justify-between items-center mb-2">
                            <span class="badge badge-purple">${c.category}</span>
                        </div>
                        <div style="font-size:14px;font-weight:600;color:var(--text-main);margin-bottom:6px">
                            ${this.utils.escape(c.title)}
                        </div>
                        <div style="font-size:13px;color:var(--text-sub);line-height:1.7;margin-bottom:8px">
                            ${this.utils.escape(c.content.substring(0, 120))}...
                        </div>
                        <div style="padding:8px;background:var(--accent-light);border-radius:6px;font-size:12px;color:var(--text-sub);line-height:1.6;margin-bottom:6px">
                            💡 ${this.utils.escape(c.insight.substring(0, 80))}...
                        </div>
                        <div class="text-sm text-muted">📎 来源：${this.utils.escape(c.source)}</div>
                    </div>
                `).join('')}
            </div>

            <!-- 案例分类导航 -->
            <div class="card">
                <div class="card-title">🏷 案例分类 (${ESSAY_CASES_LIBRARY.length}个案例)</div>
                <div class="flex gap-2 flex-wrap">
                    ${caseCategories.map(cat => {
                        const count = ESSAY_CASES_LIBRARY.filter(c => c.category === cat).length;
                        return `<span class="badge badge-purple" style="cursor:default">${cat}(${count})</span>`;
                    }).join('')}
                </div>
            </div>

            <div class="card" style="background:var(--accent-light)">
                <div style="font-size:13px;color:var(--text-sub);line-height:1.7">
                    💡 <strong>案例使用指南：</strong><br>
                    · 每天阅读今日推荐案例，理解背景+记住关键数据<br>
                    · 申论写作时引用案例要"叙议结合"，先简述案例再分析启示<br>
                    · 建议积累3-5个万能案例，覆盖乡村振兴/生态文明/基层治理/改革创新等主题<br>
                    · 案例来源均为官方媒体报道，可放心引用
                </div>
            </div>
        `;
    },

    /* 推荐金句库（联网搜集精选） */
    renderSentenceLibrary() {
        const container = document.getElementById('sentenceTabContent');
        const libCategories = Object.keys(GOLDEN_SENTENCES_LIBRARY);
        const mySentences = this.data.exam.goldenSentences;
        let totalCount = 0;
        libCategories.forEach(c => totalCount += GOLDEN_SENTENCES_LIBRARY[c].length);

        container.innerHTML = `
            <div class="card" style="background:linear-gradient(135deg,#A78BFA,#C4B5FD);color:white">
                <div style="font-size:13px;opacity:0.9">📚 联网精选金句库</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    共 ${totalCount} 条精选金句 · 来自人民日报、经典名言、申论模板等
                </div>
            </div>
            ${libCategories.map(cat => {
                const items = GOLDEN_SENTENCES_LIBRARY[cat];
                return `
                    <div class="card">
                        <div class="card-title">📌 ${cat} (${items.length}条)</div>
                        ${items.map((s, i) => {
                            const alreadyCollected = mySentences.some(ms => ms.content === s.content);
                            return `
                            <div class="list-item" style="background:var(--accent-light);flex-direction:column;align-items:stretch">
                                <div style="font-size:14px;line-height:1.7">${this.utils.escape(s.content)}</div>
                                <div class="flex justify-between items-center mt-2">
                                    <span class="text-sm text-muted">来源：${this.utils.escape(s.source)}</span>
                                    ${alreadyCollected ?
                                        '<span class="badge badge-green">✓ 已收藏</span>' :
                                        `<button class="btn btn-primary btn-sm" onclick="App.collectFromLibrary('${cat}', ${i})">＋ 收藏</button>`
                                    }
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }).join('')}
        `;
    },

    /* 联网搜索 */
    renderSentenceSearch() {
        const container = document.getElementById('sentenceTabContent');
        container.innerHTML = `
            <div class="card" style="background:linear-gradient(135deg,#4ECDC4,#6FE0D8);color:white">
                <div style="font-size:13px;opacity:0.9">🔍 联网搜索金句</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    点击下方链接，在浏览器中搜索更多申论金句，看到好的可以复制回来添加到收藏
                </div>
            </div>

            <div class="card">
                <div class="card-title">🔍 快速搜索</div>
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:10px">
                    输入关键词，一键搜索申论金句素材
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="input" id="searchKeyword" placeholder="如：乡村振兴 申论金句" value="申论金句">
                    </div>
                    <button class="btn btn-primary" onclick="App.searchSentences()">搜索</button>
                </div>
                <div class="flex gap-2 flex-wrap mt-2">
                    <button class="btn btn-outline btn-sm" onclick="App.quickSearch('申论开头金句')">开头金句</button>
                    <button class="btn btn-outline btn-sm" onclick="App.quickSearch('申论结尾金句')">结尾金句</button>
                    <button class="btn btn-outline btn-sm" onclick="App.quickSearch('申论对策金句')">对策金句</button>
                    <button class="btn btn-outline btn-sm" onclick="App.quickSearch('申论乡村振兴金句')">乡村振兴</button>
                    <button class="btn btn-outline btn-sm" onclick="App.quickSearch('人民日报金句')">人民日报</button>
                </div>
            </div>

            <div class="card">
                <div class="card-title">📚 金句资源网站</div>
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:10px">
                    以下网站经常更新高质量申论素材，推荐收藏
                </div>
                ${SENTENCE_SEARCH_LINKS.map(link => `
                    <a href="${link.url}" target="_blank" style="text-decoration:none;color:inherit">
                        <div class="list-item">
                            <div style="font-size:24px">${link.icon}</div>
                            <div class="list-item-content">
                                <div class="list-item-title">${link.name}</div>
                                <div class="list-item-sub">点击跳转到外部网站</div>
                            </div>
                            <span style="color:var(--text-light)">↗</span>
                        </div>
                    </a>
                `).join('')}
            </div>

            <div class="card" style="background:var(--warning-light)">
                <div style="font-size:13px;color:var(--text-sub);line-height:1.7">
                    💡 <strong>使用技巧：</strong><br>
                    1. 在外部网站看到好句子，复制后切换到「✍️ 自行添加」粘贴保存<br>
                    2. 人民日报、学习强国每天都会更新金句，建议每天浏览5分钟<br>
                    3. 搜索时加上具体主题（如"乡村振兴 申论金句"）效果更好
                </div>
            </div>
        `;
    },

    /* 自行添加 */
    renderSentenceManual(categories) {
        const container = document.getElementById('sentenceTabContent');
        container.innerHTML = `
            <div class="card">
                <div class="card-title">✍️ 自行添加金句</div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label">分类</label>
                        <select class="select" id="sentenceCategory">
                            ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="label">来源（可选）</label>
                        <input type="text" class="input" id="sentenceSource" placeholder="如：人民日报">
                    </div>
                </div>
                <div class="mb-2">
                    <label class="label">金句内容</label>
                    <textarea class="textarea" id="sentenceContent" placeholder="输入或粘贴金句内容..."></textarea>
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addSentence()">收集</button>
            </div>
        `;
    },

    /* 我的收藏 */
    renderSentenceMine(sentences, categories) {
        const container = document.getElementById('sentenceTabContent');
        if (sentences.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <div class="empty-state">
                        <div class="empty-state-icon">🌟</div>
                        <div class="empty-state-text">还没有收藏金句<br>去「推荐金句库」或「联网搜索」找找吧！</div>
                    </div>
                </div>
            `;
            return;
        }
        container.innerHTML = `
            <div class="card">
                <div class="card-title">🌟 我的金句收藏 (${sentences.length}条)</div>
                ${categories.map(cat => {
                    const items = sentences.filter(s => s.category === cat);
                    if (items.length === 0) return '';
                    return `
                        <div style="margin-bottom:12px">
                            <div class="font-bold mb-2" style="color:var(--primary)">📌 ${cat} (${items.length})</div>
                            ${items.map(s => `
                                <div class="list-item" style="background:var(--accent-light)">
                                    <div class="list-item-content">
                                        <div style="font-size:14px;line-height:1.6">${this.utils.escape(s.content)}</div>
                                        <div class="text-sm text-muted mt-2">
                                            ${this.utils.formatDate(s.date)}
                                            ${s.source ? ' · 来源：' + this.utils.escape(s.source) : ''}
                                        </div>
                                    </div>
                                    <button class="task-delete" onclick="App.deleteSentence('${s.id}')">🗑</button>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    /* 从推荐库收藏 */
    collectFromLibrary(category, index) {
        const item = GOLDEN_SENTENCES_LIBRARY[category][index];
        // 检查是否已收藏
        if (this.data.exam.goldenSentences.some(s => s.content === item.content)) {
            this.toast('已经收藏过这条了～');
            return;
        }
        this.data.exam.goldenSentences.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            category: category,
            content: item.content,
            source: item.source
        });
        this.saveData();
        this.navigate('exam');
        this.toast('已收藏到我的金句库！');
    },

    /* 联网搜索 */
    searchSentences() {
        const keyword = document.getElementById('searchKeyword').value.trim() || '申论金句';
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(keyword), '_blank');
    },

    quickSearch(keyword) {
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(keyword), '_blank');
    },

    addSentence() {
        const category = document.getElementById('sentenceCategory').value;
        const content = document.getElementById('sentenceContent').value.trim();
        const source = document.getElementById('sentenceSource').value.trim();
        if (!content) {
            this.toast('请输入金句内容～');
            return;
        }
        this.data.exam.goldenSentences.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            category: category,
            content: content,
            source: source || ''
        });
        this.saveData();
        this.navigate('exam');
        this.toast('金句已收集！');
    },

    deleteSentence(id) {
        this.data.exam.goldenSentences = this.data.exam.goldenSentences.filter(s => s.id !== id);
        this.saveData();
        this.navigate('exam');
    },

    // ==================== 求职模块 ====================
    renderJob(container) {
        const job = this.data.job;
        const statuses = {
            'pending': '待投递',
            'applied': '已投递',
            'written': '笔试',
            'interview': '面试',
            'offered': 'Offer',
            'rejected': '未通过'
        };
        const statusBadge = {
            'pending': 'badge-purple',
            'applied': 'badge-teal',
            'written': 'badge-orange',
            'interview': 'badge-orange',
            'offered': 'badge-green',
            'rejected': 'badge-red'
        };

        const sorted = [...job.bookmarks].sort((a, b) => {
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;
            return a.deadline.localeCompare(b.deadline);
        });

        container.innerHTML = `
            <div class="page-title"><span class="emoji">💼</span> 求职</div>

            <div class="card" style="background:linear-gradient(135deg,#A78BFA,#C4B5FD);color:white">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="font-size:13px;opacity:0.9">📋 我的求职画像</div>
                    <button class="btn btn-sm" style="background:rgba(255,255,255,0.3);color:white;border:none" onclick="App.editJobProfile()">✏️ 编辑</button>
                </div>
                <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
                    <span style="background:rgba(255,255,255,0.25);padding:4px 12px;border-radius:20px;font-size:13px">🎓 ${job.filters.degree}</span>
                    <span style="background:rgba(255,255,255,0.25);padding:4px 12px;border-radius:20px;font-size:13px">👩 ${job.filters.gender}</span>
                    <span style="background:rgba(255,255,255,0.25);padding:4px 12px;border-radius:20px;font-size:13px">📖 ${job.filters.major}</span>
                </div>
            </div>

            <div class="card">
                <div class="card-title">🔔 央国企招聘联网推送</div>
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:10px">
                    一键搜索各大央国企招聘平台，自动匹配「${job.filters.degree} · ${job.filters.major}」可报岗位
                </div>
                <div class="flex items-center justify-between">
                    <span class="badge ${job.pushEnabled ? 'badge-green' : 'badge-red'}">
                        ${job.pushEnabled ? '已开启' : '未开启'}
                    </span>
                    <button class="btn ${job.pushEnabled ? 'btn-outline' : 'btn-primary'} btn-sm"
                            onclick="App.toggleJobPush()">
                        ${job.pushEnabled ? '关闭推送' : '开启推送'}
                    </button>
                </div>
                ${job.pushEnabled ? `
                <div class="mt-2" style="padding:12px;background:var(--success-light);border-radius:8px;font-size:13px;color:var(--text-sub);line-height:1.8">
                    ✅ 推送已开启！点击下方平台可直达招聘页面，搜索结果已按你的条件预筛选。
                </div>

                <div style="margin-top:12px;padding:12px;background:linear-gradient(135deg,#7B5BA6,#9B7CC4);border-radius:12px;text-align:center">
                    <div style="color:white;font-size:14px;font-weight:700;margin-bottom:8px">🚀 一键全平台搜索</div>
                    <div style="color:white;font-size:12px;opacity:0.9;margin-bottom:10px">点击后同时打开多个招聘平台搜索页</div>
                    <button class="btn btn-primary" style="width:100%;background:white;color:#7B5BA6;border:none" onclick="App.searchJobOnline()">
                        🔍 立即搜索央国企岗位
                    </button>
                </div>

                <div style="margin-top:12px">
                    <div style="font-size:13px;font-weight:600;margin-bottom:8px">📡 招聘平台导航</div>
                    ${this.renderJobPlatforms()}
                </div>

                ${this.renderJobDeadlineAlerts(sorted, statuses)}
                ` : ''}
            </div>

            <div class="card">
                <div class="card-title">📱 央国企招聘优质公众号</div>
                <div style="font-size:12px;color:var(--text-sub);margin-bottom:10px;line-height:1.7">
                    官网信息分散难找，建议关注以下微信公众号，第一时间获取央企/国企/事业单位招聘推送（在微信搜索框输入名称即可关注）：
                </div>
                <div style="display:flex;flex-direction:column;gap:8px">
                    ${this.jobOfficialAccounts.map(a => `
                    <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--bg-main);border-radius:10px">
                        <span style="font-size:22px">${a.icon}</span>
                        <div style="flex:1">
                            <div style="font-weight:600;font-size:14px">${a.name}</div>
                            <div style="font-size:12px;color:var(--text-sub)">${a.desc}</div>
                        </div>
                        <span style="font-size:16px;color:var(--text-light)">↗</span>
                    </div>`).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-title">📑 招聘要求段落识别</div>
                <div style="font-size:12px;color:var(--text-sub);margin-bottom:10px;line-height:1.7">
                    把招聘公告里的「任职要求 / 报考条件」整段粘贴进来，AI 自动提取学历、专业、技能证书、经验年限等关键要求，并给出简历修改建议。
                </div>
                <textarea class="input" id="jdInput" rows="5" placeholder="例：硕士研究生及以上学历，农林经济管理、管理学相关专业；通过英语六级；具有1年以上实习或项目经验；中共党员优先……" style="width:100%;resize:vertical;font-family:inherit"></textarea>
                <div style="display:flex;gap:8px;margin-top:10px">
                    <button class="btn btn-primary" style="flex:1" onclick="App.analyzeJD()">🔍 AI识别要求</button>
                    <button class="btn btn-outline" style="flex:1" onclick="App.optimizeResume()">📝 简历修改建议</button>
                </div>
                <div id="jdResult"></div>
            </div>

            <div class="card">
                <div class="card-title">➕ 添加岗位</div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="input" id="jobCompany" placeholder="企业名称">
                    </div>
                    <div class="form-group">
                        <input type="text" class="input" id="jobPosition" placeholder="岗位名称">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <select class="select" id="jobStatus">
                            ${Object.entries(statuses).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="date" class="input" id="jobDeadline">
                    </div>
                </div>
                <div class="mb-2">
                    <input type="text" class="input" id="jobRequirements" placeholder="报考条件/要求">
                </div>
                <div class="mb-2">
                    <input type="text" class="input" id="jobNote" placeholder="备注（薪资/地点/链接等）">
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addJob()">添加</button>
            </div>

            ${sorted.length > 0 ? `
            <div class="card">
                <div class="card-title">📋 岗位列表 (${sorted.length}个)</div>
                ${sorted.map(j => {
                    const days = j.deadline ? this.utils.daysBetween(j.deadline) : null;
                    return `
                    <div class="job-card status-${j.status}">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="job-company">${this.utils.escape(j.company)}</div>
                                <div class="job-position">${this.utils.escape(j.position)}</div>
                            </div>
                            <span class="badge ${statusBadge[j.status]}">${statuses[j.status]}</span>
                        </div>
                        ${j.requirements ? `<div class="job-meta"><span class="badge badge-purple">📋 ${this.utils.escape(j.requirements)}</span></div>` : ''}
                        ${j.note ? `<div class="text-sm text-muted mt-2">📝 ${this.utils.escape(j.note)}</div>` : ''}
                        ${days !== null ? `<div class="job-deadline">${days > 0 ? '⏰ 截止还有 ' + days + ' 天' : days === 0 ? '⚠️ 今天截止！' : '❌ 已过期'}</div>` : ''}
                        <div class="flex gap-2 mt-2">
                            <select class="select btn-sm" style="width:auto;padding:4px 8px;font-size:12px" onchange="App.updateJobStatus('${j.id}', this.value)">
                                ${Object.entries(statuses).map(([v, l]) => `<option value="${v}" ${j.status === v ? 'selected' : ''}>${l}</option>`).join('')}
                            </select>
                            <button class="task-delete" onclick="App.deleteJob('${j.id}')">🗑</button>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            ` : `
            <div class="card">
                <div class="empty-state">
                    <div class="empty-state-icon">💼</div>
                    <div class="empty-state-text">还没有收藏的岗位，添加感兴趣的职位吧！</div>
                </div>
            </div>
            `}
        `;
    },

    // 央国企招聘优质公众号（在微信搜索名称即可关注）
    jobOfficialAccounts: [
        { name: '国资小新', icon: '🏛', desc: '国务院国资委官方号，央企招聘权威发布' },
        { name: '央企招聘', icon: '🏢', desc: '各大央企集团招聘信息汇总' },
        { name: '国企招聘网', icon: '📋', desc: '国企/事业单位每日招聘推送' },
        { name: '中公国企招聘', icon: '🎓', desc: '中公教育国企招考资讯' },
        { name: '华图国企招聘', icon: '📚', desc: '华图教育国企笔试面试' },
        { name: '应届生求职网', icon: '🎯', desc: '校招/实习信息聚合' },
        { name: '校园招聘', icon: '🏫', desc: '全国校园招聘官方号' },
        { name: '国企人事招聘', icon: '📝', desc: '地方国企人事考试通知' }
    ],

    // 央国企招聘平台数据
    jobPlatforms: [
        { name: '国资委央企招聘', url: 'http://www.sasac.gov.cn/', icon: '🏛', desc: '国务院国资委官方央企招聘门户', searchUrl: 'http://www.sasac.gov.cn/' },
        { name: '国聘网', url: 'https://www.iguopin.com/', icon: '🏢', desc: '央企国企招聘官方平台', searchUrl: 'https://www.iguopin.com/jobs?q=' },
        { name: '应届生求职网', url: 'https://www.yingjiesheng.com/', icon: '🎓', desc: '应届生校招信息汇总', searchUrl: 'https://www.yingjiesheng.com/search/?keyword=' },
        { name: '国家公务员局', url: 'http://www.scs.gov.cn/', icon: '📋', desc: '国考官方报名入口', searchUrl: 'http://www.scs.gov.cn/' },
        { name: '中央和国家机关事业单位', url: 'http://www.gongkaocn.com/', icon: '🏣', desc: '事业单位招聘信息', searchUrl: 'http://www.gongkaocn.com/' },
        { name: '中公国企招聘', url: 'https://www.offcn.com/gqzp/', icon: '🏢', desc: '中公教育国企招聘频道', searchUrl: 'https://www.offcn.com/gqzp/' },
        { name: '华图国企招聘', url: 'https://www.huatu.com/gqzp/', icon: '🏢', desc: '华图教育国企招聘', searchUrl: 'https://www.huatu.com/gqzp/' },
        { name: '智联招聘·国企', url: 'https://www.zhaopin.com/', icon: '💼', desc: '智联招聘国企职位', searchUrl: 'https://www.zhaopin.com/sou/kw国企/' },
        { name: '前程无忧·国企', url: 'https://www.51job.com/', icon: '💼', desc: '前程无忧国企职位', searchUrl: 'https://www.51job.com/' },
        { name: 'BOSS直聘·国企', url: 'https://www.zhipin.com/', icon: '💼', desc: 'BOSS直聘央国企招聘', searchUrl: 'https://www.zhipin.com/web/geek/job?query=国企&city=' }
    ],

    renderJobPlatforms() {
        return this.jobPlatforms.map(p => `
            <a href="${p.searchUrl}${encodeURIComponent(this.data.job.filters.major)}" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px;border:1px solid var(--bg-main);border-radius:10px;margin-bottom:8px;text-decoration:none;color:inherit;transition:background 0.2s" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background=''">
                <span style="font-size:24px">${p.icon}</span>
                <div style="flex:1">
                    <div style="font-weight:600;font-size:14px">${p.name}</div>
                    <div style="font-size:12px;color:var(--text-sub)">${p.desc}</div>
                </div>
                <span style="font-size:16px;color:var(--text-light)">↗</span>
            </a>
        `).join('');
    },

    renderJobDeadlineAlerts(sorted, statuses) {
        const alerts = sorted.filter(j => {
            if (j.status === 'offered' || j.status === 'rejected') return false;
            if (!j.deadline) return false;
            const days = this.utils.daysBetween(j.deadline);
            return days >= 0 && days <= 7;
        });

        if (alerts.length === 0) return '';

        return `
            <div style="margin-top:12px;padding:12px;background:var(--warning-light);border-radius:10px">
                <div style="font-size:13px;font-weight:700;color:#E67E22;margin-bottom:8px">⏰ 截止提醒</div>
                ${alerts.map(j => {
                    const days = this.utils.daysBetween(j.deadline);
                    return `
                    <div style="font-size:12px;color:var(--text-sub);margin-bottom:4px">
                        ${days === 0 ? '⚠️ 今天截止' : '🔔 ' + days + '天后截止'}：
                        <strong>${this.utils.escape(j.company)}</strong> - ${this.utils.escape(j.position)}
                    </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    searchJobOnline() {
        const major = this.data.job.filters.major;
        const degree = this.data.job.filters.degree;
        const keyword = encodeURIComponent(degree + ' ' + major + ' 央企国企招聘');

        // 打开多个招聘平台搜索页（最多同时打开4个，避免浏览器拦截）
        const platforms = [
            `https://www.iguopin.com/jobs?q=${keyword}`,
            `https://www.yingjiesheng.com/search/?keyword=${keyword}`,
            `https://www.zhaopin.com/sou/kw${encodeURIComponent(degree + major + '国企')}`,
            `https://www.zhipin.com/web/geek/job?query=${encodeURIComponent('国企 ' + major)}&city=`
        ];

        platforms.forEach((url, i) => {
            setTimeout(() => window.open(url, '_blank'), i * 300);
        });

        this.toast('正在打开招聘平台搜索页，请允许弹窗～');
    },

    toggleJobPush() {
        this.data.job.pushEnabled = !this.data.job.pushEnabled;
        this.saveData();
        this.navigate('job');
        this.toast(this.data.job.pushEnabled ? '推送已开启！点击平台链接即可搜索岗位' : '推送已关闭');
    },

    // 编辑求职画像
    editJobProfile() {
        const job = this.data.job;
        const degrees = ['双非硕士', '管理学硕士', '工商管理硕士(MBA)', '985硕士', '211硕士', '普通硕士', '本科', '博士', '大专'];
        const genders = ['女', '男', '不限'];
        const content = `
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">学历</label>
                    <select class="select" id="profileDegree">
                        ${degrees.map(d => `<option value="${d}" ${job.filters.degree === d ? 'selected' : ''}>${d}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">性别</label>
                    <select class="select" id="profileGender">
                        ${genders.map(g => `<option value="${g}" ${job.filters.gender === g ? 'selected' : ''}>${g}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">专业</label>
                <input type="text" class="input" id="profileMajor" value="${this.utils.escape(job.filters.major)}" placeholder="如：农林经济管理">
            </div>
        `;
        this.showModal('编辑求职画像', content, () => {
            job.filters.degree = document.getElementById('profileDegree').value;
            job.filters.gender = document.getElementById('profileGender').value;
            job.filters.major = document.getElementById('profileMajor').value.trim() || '未填写';
            this.saveData();
            this.navigate('job');
            this.toast('求职画像已更新 ✅');
        });
    },

    // 段落识别：从招聘要求文本中提取关键要求
    analyzeJD() {
        const raw = document.getElementById('jdInput').value.trim();
        const box = document.getElementById('jdResult');
        if (!raw) {
            this.toast('请先粘贴招聘要求文本～');
            return;
        }
        const text = raw.replace(/\s+/g, ' ');

        // 1. 学历
        const degreeRules = [
            { kw: ['博士'], label: '博士及以上' },
            { kw: ['硕士'], label: '硕士研究生及以上' },
            { kw: ['本科'], label: '本科及以上' },
            { kw: ['大专', '专科'], label: '大专及以上' },
            { kw: ['985'], label: '985院校优先' },
            { kw: ['211'], label: '211院校优先' },
            { kw: ['双一流'], label: '双一流院校优先' }
        ];
        const degrees = [];
        degreeRules.forEach(r => { if (r.kw.some(k => text.includes(k))) degrees.push(r.label); });

        // 2. 专业
        const majorList = ['农林经济管理', '管理学', '工商管理', '公共管理', '经济学', '金融', '会计', '财务', '市场营销', '人力资源管理', '行政管理', '国际经济与贸易', '统计学', '审计', '农业经济', '农村发展', '产业经济'];
        const majors = majorList.filter(m => text.includes(m));
        if (text.includes('相关专业')) majors.push('（要求）相关专业');

        // 3. 技能 / 证书
        const skillRules = [
            { kw: ['英语六级', 'cet-6', 'cet6', '六级'], label: '英语六级' },
            { kw: ['英语四级', 'cet-4', 'cet4', '四级'], label: '英语四级' },
            { kw: ['计算机二级'], label: '计算机二级' },
            { kw: ['普通话'], label: '普通话等级' },
            { kw: ['教师资格'], label: '教师资格证' },
            { kw: ['会计证', '初级会计', 'cpa', '注册会计师'], label: '会计类证书' },
            { kw: ['法律职业资格', '法考'], label: '法律职业资格' },
            { kw: ['驾驶证', '驾照'], label: '机动车驾驶证' },
            { kw: ['python', 'java', 'c++', '编程'], label: '编程能力' },
            { kw: ['excel', 'office', '办公软件'], label: '办公软件熟练' },
            { kw: ['数据分析', 'spss', 'stata', 'sas'], label: '数据分析工具' }
        ];
        const skills = [];
        skillRules.forEach(r => { if (r.kw.some(k => text.toLowerCase().includes(k))) skills.push(r.label); });

        // 4. 经验年限
        const expMatch = text.match(/(\d+)\s*年以上?/);
        const internMatch = text.match(/(\d+)\s*个月?实习/);
        const exp = [];
        if (expMatch) exp.push(`工作经验 ${expMatch[1]} 年以上`);
        if (internMatch) exp.push(`实习 ${internMatch[1]} 个月以上`);
        if (text.includes('应届')) exp.push('应届生可报');
        if (text.includes('无经验') || text.includes('经验不限')) exp.push('经验不限');

        // 5. 其他优先条件
        const other = [];
        if (text.includes('党员')) other.push('中共党员（含预备）优先');
        if (text.includes('学生干部')) other.push('学生干部经历优先');
        if (text.includes('奖学金')) other.push('奖学金获得者优先');
        if (text.includes('实习')) other.push('有实习经历优先');
        if (text.includes('班干部')) other.push('班干部经历优先');

        const sections = [
            { title: '🎓 学历要求', items: degrees, empty: '未明确提及学历要求' },
            { title: '📖 专业要求', items: majors, empty: '未明确提及专业限制' },
            { title: '🛠 技能 / 证书', items: skills, empty: '未提及特定技能或证书' },
            { title: '⏳ 经验年限', items: exp, empty: '未明确提及经验要求' },
            { title: '⭐ 其他优先条件', items: other, empty: '无其他优先条件' }
        ];

        box.innerHTML = `
            <div style="margin-top:12px;padding:12px;background:var(--primary-light);border-radius:10px">
                <div style="font-size:13px;font-weight:700;color:var(--primary);margin-bottom:8px">✅ 已识别关键要求</div>
                ${sections.map(s => `
                    <div style="margin-bottom:8px">
                        <div style="font-size:13px;font-weight:600;color:var(--text-main)">${s.title}</div>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
                            ${s.items.length ? s.items.map(i => `<span style="background:white;color:var(--primary);padding:3px 10px;border-radius:14px;font-size:12px;border:1px solid var(--primary-light)">${this.utils.escape(i)}</span>`).join('') : `<span style="color:var(--text-sub);font-size:12px">${s.empty}</span>`}
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="App.optimizeResume()">📝 根据要求生成简历修改建议</button>
        `;
        this.toast('要求识别完成 ✅');
    },

    // 根据识别结果与个人画像生成简历修改建议
    optimizeResume() {
        const raw = document.getElementById('jdInput').value.trim();
        const box = document.getElementById('jdResult');
        const job = this.data.job;

        if (!raw) {
            this.toast('请先在上方粘贴招聘要求并点「AI识别要求」～');
            return;
        }

        const text = raw.replace(/\s+/g, ' ').toLowerCase();
        const tips = [];

        // 学历匹配
        const userIsMaster = job.filters.degree.includes('硕士');
        if (text.includes('硕士') && userIsMaster) {
            tips.push({ ok: true, t: `学历匹配：你的「${job.filters.degree}」满足"硕士及以上"要求，简历教育背景栏把硕士学历、毕业院校、研究方向放在醒目位置。` });
        } else if (text.includes('硕士') && !userIsMaster) {
            tips.push({ ok: false, t: `学历预警：岗位要求硕士，你当前画像为「${job.filters.degree}」，简历如实填写，可突出科研/项目弥补，或考虑放宽投递范围。` });
        } else if (text.includes('本科') && job.filters.degree.includes('本科')) {
            tips.push({ ok: true, t: '学历匹配：本科要求已满足，简历突出专业排名与核心课程成绩。' });
        }

        // 专业匹配
        const majorHit = ['农林经济管理', '管理学', '工商管理', '公共管理', '经济学', '农业经济', '农村发展'].filter(m => text.includes(m));
        if (majorHit.length) {
            tips.push({ ok: true, t: `专业匹配：岗位涉及「${majorHit.join('、')}」，与你的「${job.filters.major}」高度相关。简历中写明主修课程（如农业经济学、管理学原理）、毕业论文/项目方向与岗位的对应关系。` });
        } else if (text.includes('相关专业')) {
            tips.push({ ok: true, t: '岗位接受"相关专业"，简历中主动说明你的专业与岗位的关联点，避免被系统初筛误杀。' });
        }

        // 英语
        if (text.includes('六级') || text.includes('cet-6') || text.includes('cet6')) {
            tips.push({ ok: true, t: '英语要求：若已通过六级，简历证书栏明确标注"CET-6 XXX分"；若未过，写"正在备考六级"并突出阅读英文文献能力。' });
        }
        // 党员
        if (text.includes('党员')) {
            tips.push({ ok: false, t: '政治面貌：岗位优先党员。若你是党员，务必在简历顶部基本信息写明"中共党员"；若不是，可不填此项，用学生干部/奖学金经历补充。' });
        }
        // 实习/经验
        const expM = text.match(/(\d+)\s*年以上?/);
        if (expM) {
            tips.push({ ok: true, t: `经验要求：岗位要求${expM[1]}年以上。简历用"STAR法则"写清每段实习/项目的时长、职责、量化成果（如"完成X报告，提升Y效率Z%"）。` });
        }
        // 技能
        if (text.includes('excel') || text.includes('office') || text.includes('数据分析')) {
            tips.push({ ok: true, t: '技能要求：在简历"技能"栏列出 Excel（数据透视表/函数）、SPSS/Stata 等，并附一句应用实例。' });
        }
        if (text.includes('python') || text.includes('编程')) {
            tips.push({ ok: true, t: '技能要求：标注 Python 及常用库（pandas/numpy），附课程设计或爬虫/分析小项目链接。' });
        }
        // 通用建议
        tips.push({ ok: true, t: '简历格式：使用一页纸、清晰分栏（教育/实习/项目/技能），关键词与JD保持一致，方便企业ATS系统初筛通过。' });
        tips.push({ ok: true, t: '自我评价：针对该岗位写3条，每条对应一条JD要求，用"要求→我的匹配"结构，让HR一眼看到契合度。' });

        box.innerHTML = `
            <div style="margin-top:12px;padding:12px;background:var(--success-light);border-radius:10px">
                <div style="font-size:13px;font-weight:700;color:var(--success);margin-bottom:8px">📝 简历修改建议（基于你的画像：${this.utils.escape(job.filters.degree)} · ${this.utils.escape(job.filters.major)}）</div>
                ${tips.map(tp => `
                    <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;line-height:1.6;color:var(--text-sub)">
                        <span style="flex-shrink:0">${tp.ok ? '✅' : '⚠️'}</span>
                        <span>${tp.t}</span>
                    </div>
                `).join('')}
            </div>
        `;
        this.toast('已生成简历修改建议 📝');
    },

    addJob() {
        const company = document.getElementById('jobCompany').value.trim();
        const position = document.getElementById('jobPosition').value.trim();
        const status = document.getElementById('jobStatus').value;
        const deadline = document.getElementById('jobDeadline').value;
        const requirements = document.getElementById('jobRequirements').value.trim();
        const note = document.getElementById('jobNote').value.trim();

        if (!company || !position) {
            this.toast('请输入企业名称和岗位～');
            return;
        }

        this.data.job.bookmarks.push({
            id: this.utils.uid(),
            company, position, status, deadline, requirements, note,
            date: this.utils.today()
        });
        this.saveData();
        this.navigate('job');
        this.toast('岗位已添加！');
    },

    updateJobStatus(id, status) {
        const job = this.data.job.bookmarks.find(j => j.id === id);
        if (job) {
            job.status = status;
            this.saveData();
            this.toast('状态已更新');
        }
    },

    deleteJob(id) {
        this.data.job.bookmarks = this.data.job.bookmarks.filter(j => j.id !== id);
        this.saveData();
        this.navigate('job');
    },

    // ==================== 健身模块 ====================
    renderFitness(container) {
        if (!this.currentSubTab.fitness) this.currentSubTab.fitness = 'body';

        const tabs = [
            { id: 'body', label: '📊 身体数据', icon: '📊' },
            { id: 'plan', label: '📅 健身规划', icon: '📅' },
            { id: 'exercise', label: '🏋️ 动作选取', icon: '🏋️' },
            { id: 'period', label: '🌸 经期休息', icon: '🌸' }
        ];

        container.innerHTML = `
            <div class="page-title"><span class="emoji">💪</span> 健身管理</div>
            <div class="sub-tabs">
                ${tabs.map(t => `<button class="sub-tab ${this.currentSubTab.fitness === t.id ? 'active' : ''}" onclick="App.switchFitnessTab('${t.id}')">${t.label}</button>`).join('')}
            </div>
            <div id="fitnessContent"></div>
        `;

        const renderers = {
            body: () => this.renderFitnessBody(),
            plan: () => this.renderFitnessPlan(),
            exercise: () => this.renderFitnessExercise(),
            period: () => this.renderFitnessPeriod()
        };
        renderers[this.currentSubTab.fitness]();
    },

    switchFitnessTab(tab) {
        this.currentSubTab.fitness = tab;
        this.navigate('fitness');
    },

    renderFitnessBody() {
        const data = this.data.fitness.bodyData;
        const latest = data.length > 0 ? data[data.length - 1] : null;
        const container = document.getElementById('fitnessContent');

        container.innerHTML = `
            <div class="card">
                <div class="card-title">📊 记录身体数据</div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label">体重 (kg)</label>
                        <input type="number" class="input" id="bodyWeight" placeholder="如 55.0" step="0.1" value="${latest ? latest.weight : ''}">
                    </div>
                    <div class="form-group">
                        <label class="label">体脂率 (%)</label>
                        <input type="number" class="input" id="bodyFat" placeholder="如 22.0" step="0.1" value="${latest ? latest.bodyFat : ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label">臂围 (cm)</label>
                        <input type="number" class="input" id="bodyArm" placeholder="如 25.0" step="0.1" value="${latest ? latest.arm || '' : ''}">
                    </div>
                    <div class="form-group">
                        <label class="label">臀围 (cm)</label>
                        <input type="number" class="input" id="bodyHip" placeholder="如 88.0" step="0.1" value="${latest ? latest.hip || '' : ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label">大腿围 (cm)</label>
                        <input type="number" class="input" id="bodyThigh" placeholder="如 50.0" step="0.1" value="${latest ? latest.thigh || '' : ''}">
                    </div>
                    <div class="form-group">
                        <label class="label">小腿围 (cm)</label>
                        <input type="number" class="input" id="bodyCalf" placeholder="如 33.0" step="0.1" value="${latest ? latest.calf || '' : ''}">
                    </div>
                </div>
                <div class="mb-2">
                    <input type="text" class="input" id="bodyNote" placeholder="备注（如：经期/生病/状态好）">
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addBodyData()">记录</button>
            </div>

            ${data.length > 0 ? `
            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-icon">⚖️</div>
                    <div class="stat-value">${latest.weight}</div>
                    <div class="stat-label">体重(kg)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🔥</div>
                    <div class="stat-value">${latest.bodyFat || '-'}</div>
                    <div class="stat-label">体脂率(%)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💪</div>
                    <div class="stat-value">${latest.arm || '-'}</div>
                    <div class="stat-label">臂围(cm)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🍑</div>
                    <div class="stat-value">${latest.hip || '-'}</div>
                    <div class="stat-label">臀围(cm)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🦵</div>
                    <div class="stat-value">${latest.thigh || '-'}</div>
                    <div class="stat-label">大腿围(cm)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🦶</div>
                    <div class="stat-value">${latest.calf || '-'}</div>
                    <div class="stat-label">小腿围(cm)</div>
                </div>
            </div>

            <div class="card">
                <div class="card-title">📉 体重趋势</div>
                ${this.renderWeightChart(data, 'weight', '#7B5BA6', 'kg')}
            </div>

            ${latest.hip || latest.thigh ? `
            <div class="card">
                <div class="card-title">📐 围度趋势</div>
                ${this.renderWeightChart(data, 'hip', '#A78BFA', 'cm')}
                <div class="text-center text-sm text-muted mt-2">臀围趋势</div>
                <div style="height:8px"></div>
                ${latest.thigh ? this.renderWeightChart(data, 'thigh', '#4ECDC4', 'cm') : ''}
                ${latest.thigh ? '<div class="text-center text-sm text-muted mt-2">大腿围趋势</div>' : ''}
            </div>
            ` : ''}

            <div class="card">
                <div class="card-title">📋 历史记录 (${data.length}条)</div>
                ${data.slice(-15).reverse().map(d => `
                    <div class="list-item" style="flex-direction:column;align-items:stretch">
                        <div class="flex justify-between items-center">
                            <div class="list-item-title">⚖️ ${d.weight}kg ${d.bodyFat ? '· 体脂' + d.bodyFat + '%' : ''}</div>
                            <button class="task-delete" onclick="App.deleteBodyData('${d.id}')">🗑</button>
                        </div>
                        <div class="text-sm text-muted mt-1">${this.utils.formatDate(d.date)}</div>
                        <div class="text-sm mt-1" style="color:var(--text-sub)">
                            ${d.arm ? '臂围' + d.arm + 'cm ' : ''}${d.hip ? '臀围' + d.hip + 'cm ' : ''}${d.thigh ? '大腿' + d.thigh + 'cm ' : ''}${d.calf ? '小腿' + d.calf + 'cm' : ''}
                        </div>
                        ${d.note ? `<div class="text-sm text-muted">📝 ${this.utils.escape(d.note)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            ` : `
            <div class="card">
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <div class="empty-state-text">还没有身体数据，开始记录吧！</div>
                </div>
            </div>
            `}
        `;
    },

    renderWeightChart(data, field, color, unit) {
        const recent = data.filter(d => d[field] != null && d[field] > 0).slice(-10);
        if (recent.length < 2) {
            return '<div class="text-center text-muted text-sm" style="padding:20px">至少需要2条记录才能显示趋势图</div>';
        }
        const values = recent.map(d => d[field]);
        const minV = Math.min(...values) - 0.5;
        const maxV = Math.max(...values) + 0.5;
        const range = maxV - minV || 1;
        const width = 280;
        const height = 100;
        const padding = 10;
        const stepX = (width - padding * 2) / (recent.length - 1);

        let points = recent.map((d, i) => {
            const x = padding + i * stepX;
            const y = height - padding - ((d[field] - minV) / range) * (height - padding * 2);
            return `${x},${y}`;
        }).join(' ');

        let dots = recent.map((d, i) => {
            const x = padding + i * stepX;
            const y = height - padding - ((d[field] - minV) / range) * (height - padding * 2);
            return `<circle cx="${x}" cy="${y}" r="3" fill="${color}"/>`;
        }).join('');

        return `
            <svg viewBox="0 0 ${width} ${height}" style="width:100%;max-width:300px;display:block;margin:0 auto">
                <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
                ${dots}
            </svg>
            <div class="text-center text-sm text-muted mt-2">
                ${recent[0][field]}${unit} → ${recent[recent.length-1][field]}${unit}
            </div>
        `;
    },

    addBodyData() {
        const weight = parseFloat(document.getElementById('bodyWeight').value);
        const bodyFat = parseFloat(document.getElementById('bodyFat').value) || 0;
        const arm = parseFloat(document.getElementById('bodyArm').value) || 0;
        const hip = parseFloat(document.getElementById('bodyHip').value) || 0;
        const thigh = parseFloat(document.getElementById('bodyThigh').value) || 0;
        const calf = parseFloat(document.getElementById('bodyCalf').value) || 0;
        const note = document.getElementById('bodyNote').value.trim();

        if (!weight || weight <= 0) {
            this.toast('请输入体重～');
            return;
        }

        this.data.fitness.bodyData.push({
            id: this.utils.uid(),
            date: this.utils.today(),
            weight: weight,
            bodyFat: bodyFat,
            arm: arm,
            hip: hip,
            thigh: thigh,
            calf: calf,
            note: note
        });
        this.saveData();
        this.navigate('fitness');
        this.toast('数据已记录！');
    },

    deleteBodyData(id) {
        this.data.fitness.bodyData = this.data.fitness.bodyData.filter(d => d.id !== id);
        this.saveData();
        this.navigate('fitness');
    },

    renderFitnessPlan() {
        const plans = this.data.fitness.plans;
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        const exerciseTypes = ['练背', '练肩', '游泳', '爬坡', '练臀腿', '休息'];
        const exerciseIcons = { '练背': '💪', '练肩': '🏋️', '游泳': '🏊', '爬坡': '🧗', '练臀腿': '🦵', '休息': '😴' };

        const container = document.getElementById('fitnessContent');
        const planByDay = {};
        days.forEach(d => planByDay[d] = plans.filter(p => p.day === d));

        container.innerHTML = `
            <div class="card">
                <div class="card-title">📅 每周健身计划</div>
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:12px">
                    合理安排训练部位，保证充分恢复。建议大肌群间隔48小时以上。
                </div>
                ${days.map(day => `
                    <div style="margin-bottom:10px">
                        <div class="font-bold mb-2">${day}</div>
                        <div class="flex gap-2 flex-wrap">
                            ${planByDay[day].length > 0 ? planByDay[day].map(p => `
                                <span class="badge badge-pink" style="cursor:pointer" onclick="App.removePlan('${p.id}')">
                                    ${exerciseIcons[p.exercise] || '🏃'} ${p.exercise} ${p.duration ? '· ' + p.duration : ''} ✕
                                </span>
                            `).join('') : '<span class="text-sm text-muted">未安排</span>'}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="card">
                <div class="card-title">➕ 添加计划</div>
                <div class="form-row">
                    <div class="form-group">
                        <select class="select" id="planDay">
                            ${days.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="select" id="planExercise">
                            ${exerciseTypes.map(e => `<option value="${e}">${exerciseIcons[e]} ${e}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="mb-2">
                    <input type="text" class="input" id="planDuration" placeholder="时长/组数（如 40min / 4x12）">
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addPlan()">添加</button>
            </div>
        `;
    },

    addPlan() {
        const day = document.getElementById('planDay').value;
        const exercise = document.getElementById('planExercise').value;
        const duration = document.getElementById('planDuration').value.trim();

        this.data.fitness.plans.push({
            id: this.utils.uid(),
            day: day,
            exercise: exercise,
            duration: duration
        });
        this.saveData();
        this.navigate('fitness');
        this.toast('计划已添加！');
    },

    removePlan(id) {
        this.data.fitness.plans = this.data.fitness.plans.filter(p => p.id !== id);
        this.saveData();
        this.navigate('fitness');
    },

    renderFitnessExercise() {
        const exercises = this.data.fitness.exercises;
        const categories = [
            { key: 'back', name: '练背', icon: '💪', color: 'pink', bg: 'var(--primary-light)' },
            { key: 'shoulder', name: '练肩', icon: '🏋️', color: 'teal', bg: 'var(--secondary-light)' },
            { key: 'swimming', name: '游泳', icon: '🏊', color: 'purple', bg: 'var(--accent-light)' },
            { key: 'incline', name: '爬坡', icon: '🧗', color: 'orange', bg: 'var(--warning-light)' },
            { key: 'glutesLegs', name: '练臀腿', icon: '🦵', color: 'pink', bg: 'var(--primary-light)' }
        ];

        if (!this.currentExerciseCategory) this.currentExerciseCategory = 'glutesLegs';
        const selectedCat = categories.find(c => c.key === this.currentExerciseCategory);
        const selectedExercises = exercises[selectedCat.key] || [];

        const container = document.getElementById('fitnessContent');
        container.innerHTML = `
            <div class="card" style="background:linear-gradient(135deg,#A78BFA,#C4B5FD);color:white;margin-bottom:12px">
                <div style="font-size:13px;opacity:0.9">🏋️ 动作库 · 专为155cm女生定制</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    选择训练部位查看对应动作，每个动作含要点提示和教学视频
                </div>
            </div>

            <div class="card">
                <div class="card-title">📍 选择训练部位</div>
                <div class="flex gap-2 flex-wrap">
                    ${categories.map(c => `
                        <button class="btn ${this.currentExerciseCategory === c.key ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="App.selectExerciseCategory('${c.key}')">
                            ${c.icon} ${c.name}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-title">${selectedCat.icon} ${selectedCat.name}动作 (${selectedExercises.length}个)</div>
                <div style="display:grid;grid-template-columns:1fr;gap:10px">
                    ${selectedExercises.map((ex, i) => `
                        <div style="padding:12px;border:1px solid var(--bg-main);border-radius:12px;cursor:pointer;background:${selectedCat.bg}" onclick="App.viewExercise('${selectedCat.key}', ${i})">
                            <div class="flex justify-between items-center">
                                <div>
                                    <div style="font-weight:700;font-size:15px">${selectedCat.icon} ${this.utils.escape(ex.name)}</div>
                                    <div class="text-sm text-muted mt-1">${this.utils.escape(ex.desc)} · ${this.utils.escape(ex.sets)}</div>
                                </div>
                                <span style="font-size:20px;color:var(--text-light)">▶</span>
                            </div>
                            ${ex.tips ? `<div style="margin-top:6px;font-size:12px;color:var(--text-sub);line-height:1.5">💡 ${this.utils.escape(ex.tips.substring(0, 60))}${ex.tips.length > 60 ? '...' : ''}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-title">➕ 添加自定义动作</div>
                <div class="form-row">
                    <div class="form-group">
                        <select class="select" id="newExerciseCategory">
                            ${categories.map(c => `<option value="${c.key}" ${c.key === this.currentExerciseCategory ? 'selected' : ''}>${c.icon} ${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" class="input" id="newExerciseName" placeholder="动作名称">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" class="input" id="newExerciseDesc" placeholder="目标肌群/描述">
                    </div>
                    <div class="form-group">
                        <input type="text" class="input" id="newExerciseSets" placeholder="组数x次数">
                    </div>
                </div>
                <div class="mb-2">
                    <textarea class="textarea" id="newExerciseTips" placeholder="动作要点（可选）" style="min-height:60px"></textarea>
                </div>
                <div class="mb-2">
                    <input type="text" class="input" id="newExerciseVideo" placeholder="视频链接（可选，如B站搜索链接）">
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addExercise()">添加动作</button>
            </div>
        `;
    },

    selectExerciseCategory(key) {
        this.currentExerciseCategory = key;
        this.navigate('fitness');
    },

    viewExercise(category, index) {
        const ex = this.data.fitness.exercises[category][index];
        this.showModal(
            '🏋️ ' + ex.name,
            `
            <div style="margin-bottom:12px">
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:4px">目标肌群</div>
                <div style="font-weight:600">${this.utils.escape(ex.desc)}</div>
            </div>
            <div style="margin-bottom:12px">
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:4px">建议组数</div>
                <div style="font-weight:600">${this.utils.escape(ex.sets)}</div>
            </div>
            ${ex.tips ? `
            <div style="margin-bottom:12px;padding:12px;background:var(--warning-light);border-radius:8px">
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:4px">💡 动作要点（155cm女生专属）</div>
                <div style="font-size:13px;line-height:1.7">${this.utils.escape(ex.tips)}</div>
            </div>
            ` : ''}
            ${ex.video ? `
            <div style="margin-bottom:12px">
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:6px">🎬 教学视频</div>
                <a href="${ex.video}" target="_blank" class="btn btn-primary" style="width:100%;text-decoration:none;display:block;text-align:center">▶ 点击观看教学视频</a>
            </div>
            ` : ''}
            <div class="text-sm text-muted">点击确定关闭</div>
            `,
            (overlay) => overlay.remove()
        );
    },

    addExercise() {
        const category = document.getElementById('newExerciseCategory').value;
        const name = document.getElementById('newExerciseName').value.trim();
        const desc = document.getElementById('newExerciseDesc').value.trim();
        const sets = document.getElementById('newExerciseSets').value.trim() || '3x12';
        const tips = document.getElementById('newExerciseTips').value.trim();
        const video = document.getElementById('newExerciseVideo').value.trim();

        if (!name) {
            this.toast('请输入动作名称～');
            return;
        }

        this.data.fitness.exercises[category].push({ name, desc, sets, tips, video });
        this.saveData();
        this.currentExerciseCategory = category;
        this.navigate('fitness');
        this.toast('动作已添加！');
    },

    renderFitnessPeriod() {
        const period = this.data.fitness.period;
        const records = period.records;
        const latest = records.length > 0 ? records[records.length - 1] : null;

        let nextPredicted = null;
        if (latest && latest.startDate) {
            const lastStart = new Date(latest.startDate);
            const next = new Date(lastStart);
            next.setDate(next.getDate() + period.cycleLength);
            nextPredicted = next.getFullYear() + '-' +
                String(next.getMonth() + 1).padStart(2, '0') + '-' +
                String(next.getDate()).padStart(2, '0');
        }

        const daysToNext = nextPredicted ? this.utils.daysBetween(nextPredicted) : null;
        const today = this.utils.today();
        const month = this.utils.currentMonth();

        // 判断今天是否在经期内
        let inPeriod = false;
        if (latest) {
            const start = new Date(latest.startDate);
            const end = latest.endDate ? new Date(latest.endDate) : new Date(start);
            end.setDate(end.getDate() + period.periodLength - 1);
            const todayDate = new Date(today);
            inPeriod = todayDate >= start && todayDate <= end;
        }

        const container = document.getElementById('fitnessContent');
        container.innerHTML = `
            ${inPeriod ? `
            <div class="card" style="background:linear-gradient(135deg,#7B5BA6,#9B7CC4);color:white;text-align:center">
                <div style="font-size:32px">🌸</div>
                <div style="font-size:16px;font-weight:700;margin-top:4px">经期中 · 注意休息</div>
                <div style="font-size:13px;opacity:0.9;margin-top:4px">避免高强度训练，可做轻柔拉伸或散步</div>
            </div>
            ` : ''}

            ${nextPredicted && !inPeriod ? `
            <div class="countdown-card pink">
                <div class="countdown-label">🌸 预计下次经期</div>
                <div class="countdown-number">${daysToNext > 0 ? daysToNext : '今天'}</div>
                <div class="countdown-label">${daysToNext > 0 ? '天后' : '可能即将开始'}</div>
                <div class="countdown-label" style="font-size:11px;margin-top:4px">${nextPredicted}</div>
            </div>
            ` : ''}

            <div class="card">
                <div class="card-title">🌸 记录经期</div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label">开始日期</label>
                        <input type="date" class="input" id="periodStart">
                    </div>
                    <div class="form-group">
                        <label class="label">结束日期（可选）</label>
                        <input type="date" class="input" id="periodEnd">
                    </div>
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="App.addPeriod()">记录</button>
            </div>

            <div class="card">
                <div class="card-title">⚙️ 周期设置</div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="label">月经周期 (天)</label>
                        <input type="number" class="input" id="cycleLength" value="${period.cycleLength}" min="20" max="40">
                    </div>
                    <div class="form-group">
                        <label class="label">经期天数</label>
                        <input type="number" class="input" id="periodLength" value="${period.periodLength}" min="3" max="10">
                    </div>
                </div>
                <button class="btn btn-outline" style="width:100%" onclick="App.updateCycleSettings()">保存设置</button>
            </div>

            ${records.length > 0 ? `
            <div class="card">
                <div class="card-title">📋 经期历史 (${records.length}次)</div>
                ${records.slice(-10).reverse().map(r => {
                    const duration = r.endDate ?
                        (new Date(r.endDate) - new Date(r.startDate)) / (1000*60*60*24) + 1 :
                        null;
                    return `
                    <div class="list-item">
                        <div style="font-size:24px">🌸</div>
                        <div class="list-item-content">
                            <div class="list-item-title">${this.utils.formatDate(r.startDate)} ${r.endDate ? '→ ' + this.utils.formatDate(r.endDate) : ''}</div>
                            <div class="list-item-sub">${duration ? duration + '天' : '进行中'}</div>
                        </div>
                        <button class="task-delete" onclick="App.deletePeriod('${r.id}')">🗑</button>
                    </div>
                    `;
                }).join('')}
            </div>
            ` : `
            <div class="card">
                <div class="empty-state">
                    <div class="empty-state-icon">🌸</div>
                    <div class="empty-state-text">还没有经期记录，记录后可预测下次时间</div>
                </div>
            </div>
            `}

            <div class="card">
                <div class="card-title">😴 休息建议</div>
                <div style="font-size:13px;color:var(--text-sub);line-height:1.8">
                    <div class="mb-2">🌸 <strong>经期前3天：</strong>建议休息或仅做轻柔瑜伽、散步</div>
                    <div class="mb-2">🌸 <strong>经期后段：</strong>可恢复低强度训练，避免倒立和腹部挤压</div>
                    <div class="mb-2">💪 <strong>平时训练：</strong>大肌群训练间隔48小时，保证7-8小时睡眠</div>
                    <div>🦵 <strong>练臀腿后：</strong>建议次日安排上肢或游泳等交叉训练</div>
                </div>
            </div>
        `;
    },

    addPeriod() {
        const start = document.getElementById('periodStart').value;
        const end = document.getElementById('periodEnd').value;

        if (!start) {
            this.toast('请选择开始日期～');
            return;
        }

        this.data.fitness.period.records.push({
            id: this.utils.uid(),
            startDate: start,
            endDate: end || start
        });
        this.saveData();
        this.navigate('fitness');
        this.toast('经期已记录！');
    },

    updateCycleSettings() {
        const cycle = parseInt(document.getElementById('cycleLength').value) || 28;
        const length = parseInt(document.getElementById('periodLength').value) || 5;
        this.data.fitness.period.cycleLength = Math.max(20, Math.min(40, cycle));
        this.data.fitness.period.periodLength = Math.max(3, Math.min(10, length));
        this.saveData();
        this.navigate('fitness');
        this.toast('设置已保存！');
    },

    deletePeriod(id) {
        this.data.fitness.period.records = this.data.fitness.period.records.filter(r => r.id !== id);
        this.saveData();
        this.navigate('fitness');
    },

    // ==================== 政治经济热点模块 ====================
    renderHotspot(container) {
        const dayOfYear = this.getDayOfYear();
        const today = this.utils.formatDate(this.utils.today());

        // 每天推送5个不同热点
        const daily5 = [];
        for (let i = 0; i < 5; i++) {
            const idx = (dayOfYear * 5 + i) % HOTSPOT_LIBRARY.length;
            daily5.push(HOTSPOT_LIBRARY[idx]);
        }

        // 分类统计
        const cats = [...new Set(HOTSPOT_LIBRARY.map(h => h.cat))];
        const catCounts = {};
        cats.forEach(c => { catCounts[c] = HOTSPOT_LIBRARY.filter(h => h.cat === c).length; });

        container.innerHTML = `
            <div class="page-title"><span class="emoji">🔥</span> 政治经济热点</div>

            <div class="card" style="background:linear-gradient(135deg,#7B5BA6,#9B7CC4);color:white">
                <div style="font-size:13px;opacity:0.9">🔥 每日热点推送</div>
                <div style="margin-top:4px;font-size:13px;opacity:0.85">
                    ${today} · 每日更新5个政治经济热点 · 第${dayOfYear}天
                </div>
            </div>

            ${daily5.map((item, i) => `
                <div class="card" style="${i === 0 ? 'border:2px solid #7B5BA6' : ''}">
                    <div class="flex justify-between items-center mb-2">
                        <span class="badge badge-purple">${item.cat}</span>
                        <span class="badge badge-orange">⭐ 今日热点${i + 1}</span>
                    </div>
                    <div style="font-size:16px;font-weight:700;color:var(--text-main);line-height:1.6;margin-bottom:10px">
                        ${this.utils.escape(item.title)}
                    </div>
                    <div style="font-size:14px;color:var(--text-sub);line-height:1.8;margin-bottom:10px">
                        ${this.utils.escape(item.content)}
                    </div>
                    <div style="padding:10px;background:var(--warning-light);border-radius:8px;font-size:13px;color:var(--text-sub);line-height:1.7;margin-bottom:8px">
                        <strong>💡 申论角度：</strong><br>${this.utils.escape(item.insight)}
                    </div>
                    <div class="text-sm text-muted">📎 来源：${this.utils.escape(item.source)}</div>
                </div>
            `).join('')}

            <div class="card">
                <div class="card-title">🏷 热点分类 (${HOTSPOT_LIBRARY.length}个热点)</div>
                <div class="flex gap-2 flex-wrap">
                    ${cats.map(c => `<span class="badge badge-purple" style="cursor:default">${c}(${catCounts[c]})</span>`).join('')}
                </div>
            </div>

            <div class="card">
                <div class="card-title">📰 热点追踪平台</div>
                <div style="font-size:13px;color:var(--text-sub);margin-bottom:10px">
                    点击以下平台，追踪最新政治经济热点动态
                </div>
                <a href="http://www.people.com.cn/" target="_blank" style="text-decoration:none;color:inherit">
                    <div class="list-item">
                        <div style="font-size:24px">📰</div>
                        <div class="list-item-content">
                            <div class="list-item-title">人民日报</div>
                            <div class="list-item-sub">权威政策解读</div>
                        </div>
                        <span style="color:var(--text-light)">↗</span>
                    </div>
                </a>
                <a href="https://www.xuexi.cn/" target="_blank" style="text-decoration:none;color:inherit">
                    <div class="list-item">
                        <div style="font-size:24px">📚</div>
                        <div class="list-item-content">
                            <div class="list-item-title">学习强国</div>
                            <div class="list-item-sub">最新理论动态</div>
                        </div>
                        <span style="color:var(--text-light)">↗</span>
                    </div>
                </a>
                <a href="http://www.banyuetan.org/" target="_blank" style="text-decoration:none;color:inherit">
                    <div class="list-item">
                        <div style="font-size:24px">📖</div>
                        <div class="list-item-content">
                            <div class="list-item-title">半月谈</div>
                            <div class="list-item-sub">时政热点深度分析</div>
                        </div>
                        <span style="color:var(--text-light)">↗</span>
                    </div>
                </a>
                <a href="https://www.gov.cn/" target="_blank" style="text-decoration:none;color:inherit">
                    <div class="list-item">
                        <div style="font-size:24px">🏛</div>
                        <div class="list-item-content">
                            <div class="list-item-title">中国政府网</div>
                            <div class="list-item-sub">国务院政策文件</div>
                        </div>
                        <span style="color:var(--text-light)">↗</span>
                    </div>
                </a>
                <a href="https://www.ndrc.gov.cn/" target="_blank" style="text-decoration:none;color:inherit">
                    <div class="list-item">
                        <div style="font-size:24px">📊</div>
                        <div class="list-item-content">
                            <div class="list-item-title">国家发改委</div>
                            <div class="list-item-sub">经济政策权威发布</div>
                        </div>
                        <span style="color:var(--text-light)">↗</span>
                    </div>
                </a>
            </div>

            <div class="card" style="background:var(--accent-light)">
                <div style="font-size:13px;color:var(--text-sub);line-height:1.7">
                    💡 <strong>使用说明：</strong><br>
                    · 每天推送5个不同政治经济热点，覆盖经济/科技/农业/社会/生态/金融/政治等领域<br>
                    · 每个热点含背景介绍、来源标注和申论写作角度<br>
                    · 建议结合申论金句和案例库一起学习<br>
                    · 热点来源均为官方媒体报道，可放心引用<br>
                    · 重点关注与农林经济管理专业相关的话题（如乡村振兴、粮食安全等）
                </div>
            </div>
        `;
    },

    // ==================== PWA Service Worker ====================
    registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(err => {
                console.log('SW registration failed:', err);
            });
        }
    }
};

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
