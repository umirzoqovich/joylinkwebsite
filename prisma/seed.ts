/**
 * Boshlang'ich ma'lumotlar: admin hisobi va namunaviy kontent.
 * Ishga tushirish: `npm run db:seed`
 *
 * Kontent faqat jadval bo'sh bo'lsa qo'shiladi — qayta ishga tushirish xavfsiz.
 */
import { CourseFormat, CourseLevel, Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────
// Ma'lumotlar
// ─────────────────────────────────────────────

const mentors: Prisma.MentorCreateManyInput[] = [
  {
    fullName: 'Azizbek Karimov',
    position: 'Senior Frontend Developer',
    bio: "8 yillik tajriba. Yirik fintech loyihalarda React va Next.js bilan ishlagan.",
    experienceYears: 8,
    studentsCount: 640,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    telegram: 'https://t.me/joylinks',
    order: 1,
  },
  {
    fullName: 'Dilnoza Rahimova',
    position: 'Lead UI/UX Designer',
    bio: "Mahalliy va xalqaro startaplar uchun 50 dan ortiq mahsulot dizaynini yaratgan.",
    experienceYears: 6,
    studentsCount: 420,
    skills: ['Figma', 'UX Research', 'Design Systems'],
    order: 2,
  },
  {
    fullName: 'Jasur Toshmatov',
    position: 'Backend Engineer, Node.js',
    bio: "Yuqori yuklamali tizimlar arxitektori. NestJS va mikroservislar bo'yicha mutaxassis.",
    experienceYears: 7,
    studentsCount: 510,
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Docker'],
    order: 3,
  },
  {
    fullName: 'Malika Yusupova',
    position: 'Data Scientist',
    bio: "Bank sohasida mashinali o'qitish modellarini ishlab chiqadi.",
    experienceYears: 5,
    studentsCount: 280,
    skills: ['Python', 'Pandas', 'Machine Learning', 'SQL'],
    order: 4,
  },
  {
    fullName: 'Bekzod Aliyev',
    position: 'Mobile Developer, Flutter',
    bio: "App Store va Google Play'da 20 dan ortiq ilovalari bor.",
    experienceYears: 6,
    studentsCount: 350,
    skills: ['Flutter', 'Dart', 'Firebase'],
    order: 5,
  },
  {
    fullName: 'Shahzoda Ergasheva',
    position: 'Python Backend Developer',
    bio: "Django va FastAPI bilan e-commerce platformalarini yaratgan.",
    experienceYears: 5,
    studentsCount: 300,
    skills: ['Python', 'Django', 'FastAPI', 'Redis'],
    order: 6,
  },
];

type SeedCourse = Omit<Prisma.CourseCreateInput, 'mentors'> & { mentorNames: string[] };

const courses: SeedCourse[] = [
  {
    slug: 'frontend',
    title: 'Frontend dasturlash',
    shortDescription: "HTML, CSS, JavaScript va React yordamida zamonaviy veb-saytlar yaratishni o'rganing.",
    description:
      "Kurs davomida noldan boshlab professional frontend dasturchi darajasiga chiqasiz. Har bir modul real loyiha bilan yakunlanadi, kurs oxirida esa portfolioga tayyor 5 ta loyihaga ega bo'lasiz.",
    icon: 'code',
    color: '#5b5bf7',
    durationMonths: 8,
    price: 1_200_000,
    oldPrice: 1_500_000,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.OFFLINE,
    isPopular: true,
    order: 1,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Git'],
    curriculum: [
      { title: 'Veb asoslari', topics: ['HTML5 semantikasi', 'CSS: Flexbox va Grid', 'Responsiv dizayn'] },
      { title: 'JavaScript', topics: ["O'zgaruvchilar va funksiyalar", 'DOM bilan ishlash', 'Async/Await, Fetch API'] },
      { title: 'React', topics: ['Komponentlar va props', 'Hooks', 'State management'] },
      { title: 'Next.js va amaliyot', topics: ['App Router', 'SSR va SSG', 'Yakuniy loyiha'] },
    ],
    mentorNames: ['Azizbek Karimov'],
  },
  {
    slug: 'backend-nodejs',
    title: 'Backend: Node.js',
    shortDescription: 'Node.js, NestJS va PostgreSQL bilan kuchli server tomon ilovalarini yarating.',
    description:
      "REST API, autentifikatsiya, ma'lumotlar bazalari va deploy — backend dasturchi bilishi kerak bo'lgan hamma narsa bitta kursda.",
    icon: 'server',
    color: '#10b981',
    durationMonths: 9,
    price: 1_300_000,
    level: CourseLevel.INTERMEDIATE,
    format: CourseFormat.HYBRID,
    isPopular: true,
    order: 2,
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker', 'Redis'],
    curriculum: [
      { title: 'Node.js asoslari', topics: ['Event loop', 'Modullar', 'Express.js'] },
      { title: "Ma'lumotlar bazasi", topics: ['SQL', 'PostgreSQL', 'Prisma ORM'] },
      { title: 'NestJS', topics: ['Modullar va DI', 'Auth, JWT', 'Testlash'] },
      { title: 'DevOps', topics: ['Docker', 'CI/CD', 'Deploy'] },
    ],
    mentorNames: ['Jasur Toshmatov'],
  },
  {
    slug: 'python-backend',
    title: 'Python dasturlash',
    shortDescription: "Python va Django bilan backend dasturlashni noldan o'rganing.",
    description:
      "Dunyodagi eng mashhur dasturlash tillaridan birini o'rganib, Django va FastAPI yordamida veb-ilovalar yaratasiz.",
    icon: 'terminal',
    color: '#f59e0b',
    durationMonths: 8,
    price: 1_200_000,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.OFFLINE,
    order: 3,
    skills: ['Python', 'OOP', 'Django', 'FastAPI', 'PostgreSQL'],
    curriculum: [
      { title: 'Python asoslari', topics: ['Sintaksis', "Ma'lumot turlari", 'Funksiyalar'] },
      { title: 'OOP', topics: ['Klasslar', 'Meros', 'Dizayn patternlar'] },
      { title: 'Django', topics: ['MVT', 'ORM', 'Django REST Framework'] },
    ],
    mentorNames: ['Shahzoda Ergasheva'],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX dizayn',
    shortDescription: "Figma'da foydalanuvchilar sevadigan interfeyslar yaratishni o'rganing.",
    description:
      "UX tadqiqotdan tortib tayyor dizayn tizimigacha — mahsulot dizaynerining to'liq ish jarayonini amaliyotda o'zlashtirasiz.",
    icon: 'palette',
    color: '#ec4899',
    durationMonths: 5,
    price: 1_000_000,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.OFFLINE,
    isPopular: true,
    order: 4,
    skills: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
    curriculum: [
      { title: 'Dizayn asoslari', topics: ['Kompozitsiya', 'Tipografiya', 'Ranglar'] },
      { title: 'UX', topics: ['Tadqiqot', 'CJM', 'Wireframe'] },
      { title: 'UI', topics: ['Komponentlar', 'Auto Layout', 'Prototip'] },
    ],
    mentorNames: ['Dilnoza Rahimova'],
  },
  {
    slug: 'flutter',
    title: 'Mobil dasturlash: Flutter',
    shortDescription: 'Bitta kod bilan iOS va Android uchun ilovalar yarating.',
    description:
      "Dart tilidan boshlab, Flutter yordamida chiroyli va tez ishlaydigan mobil ilovalar yaratib, ularni do'konlarga joylashni o'rganasiz.",
    icon: 'smartphone',
    color: '#06b6d4',
    durationMonths: 8,
    price: 1_250_000,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.OFFLINE,
    order: 5,
    skills: ['Dart', 'Flutter', 'Bloc', 'Firebase', 'REST API'],
    curriculum: [
      { title: 'Dart', topics: ['Sintaksis', 'OOP', 'Async'] },
      { title: 'Flutter UI', topics: ['Widgetlar', 'Navigatsiya', 'Animatsiyalar'] },
      { title: 'Arxitektura', topics: ['Bloc', 'Clean Architecture', 'Testlar'] },
    ],
    mentorNames: ['Bekzod Aliyev'],
  },
  {
    slug: 'data-science',
    title: "Data Science va sun'iy intellekt",
    shortDescription: "Ma'lumotlarni tahlil qilish va mashinali o'qitish modellarini yaratish.",
    description:
      "Python, statistika va mashinali o'qitish asoslarini o'rganib, real ma'lumotlar ustida loyihalar bajarasiz.",
    icon: 'brain',
    color: '#8b5cf6',
    durationMonths: 10,
    price: 1_500_000,
    level: CourseLevel.INTERMEDIATE,
    format: CourseFormat.HYBRID,
    order: 6,
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch'],
    curriculum: [
      { title: 'Tahlil', topics: ['NumPy', 'Pandas', 'Vizualizatsiya'] },
      { title: 'Statistika', topics: ['Ehtimollar', 'Gipotezalar', 'Regressiya'] },
      { title: 'ML', topics: ['Klassifikatsiya', 'Klasterlash', 'Neyron tarmoqlar'] },
    ],
    mentorNames: ['Malika Yusupova'],
  },
  {
    slug: 'kompyuter-savodxonligi',
    title: 'Kompyuter savodxonligi',
    shortDescription: 'Office dasturlari, internet va raqamli ko‘nikmalar — barcha uchun.',
    description:
      "Word, Excel, PowerPoint va internetdan samarali foydalanishni o'rganib, ish va o'qishda raqamli ko'nikmalaringizni oshirasiz.",
    icon: 'monitor',
    color: '#0ea5e9',
    durationMonths: 2,
    price: 500_000,
    level: CourseLevel.BEGINNER,
    format: CourseFormat.OFFLINE,
    order: 7,
    skills: ['Word', 'Excel', 'PowerPoint', 'Internet'],
    curriculum: [
      { title: 'Asoslar', topics: ['Windows', 'Fayllar bilan ishlash'] },
      { title: 'Office', topics: ['Word', 'Excel', 'PowerPoint'] },
    ],
    mentorNames: [],
  },
  {
    slug: 'kiberxavfsizlik',
    title: 'Kiberxavfsizlik',
    shortDescription: 'Tarmoq xavfsizligi, etik xakerlik va himoya usullari.',
    description:
      "Tizimlardagi zaifliklarni topish va ularni himoya qilishni amaliy laboratoriyalarda o'rganasiz.",
    icon: 'shield',
    color: '#ef4444',
    durationMonths: 7,
    price: 1_400_000,
    level: CourseLevel.ADVANCED,
    format: CourseFormat.OFFLINE,
    order: 8,
    skills: ['Linux', 'Networking', 'Pentest', 'OWASP'],
    curriculum: [
      { title: 'Asoslar', topics: ['Linux', 'Tarmoqlar', 'Kriptografiya'] },
      { title: 'Hujum va himoya', topics: ['OWASP Top 10', 'Pentest', 'SOC'] },
    ],
    mentorNames: [],
  },
];

const testimonials: Prisma.TestimonialCreateManyInput[] = [
  {
    fullName: 'Sardor Abdullayev',
    courseName: 'Frontend dasturlash',
    workplace: 'Uzum',
    position: 'Frontend Developer',
    text: "Kursni tugatib 2 oy ichida Uzum'ga ishga kirdim. Mentorlar har bir savolga sabr bilan javob berishdi, loyihalar esa intervyuda katta yordam berdi.",
    order: 1,
  },
  {
    fullName: 'Nilufar Qodirova',
    courseName: 'UI/UX dizayn',
    workplace: 'EPAM',
    position: 'Product Designer',
    text: "Dizaynni noldan boshladim. Amaliy topshiriqlar va portfolio ustida ishlash meni xalqaro kompaniyaga olib keldi.",
    order: 2,
  },
  {
    fullName: 'Javohir Nematov',
    courseName: 'Backend: Node.js',
    workplace: 'Click',
    position: 'Backend Developer',
    text: "NestJS va Docker'ni chuqur o'rgandim. Ishga joylashish bo'limi CV va intervyuga tayyorlanishda juda katta yordam berdi.",
    order: 3,
  },
  {
    fullName: 'Madina Hasanova',
    courseName: 'Python dasturlash',
    workplace: 'Payme',
    position: 'Python Developer',
    text: "Muhit juda do'stona, guruhdoshlar bilan hozir ham birga loyihalar qilamiz. Joylinks — hayotimdagi eng to'g'ri qaror.",
    order: 4,
  },
  {
    fullName: 'Otabek Rustamov',
    courseName: 'Mobil dasturlash: Flutter',
    workplace: 'Freelance',
    position: 'Flutter Developer',
    text: "Kurs davomida o'z ilovamni Play Market'ga joyladim va birinchi buyurtmalarimni oldim.",
    order: 5,
  },
  {
    fullName: 'Kamola Ismoilova',
    courseName: "Data Science va sun'iy intellekt",
    workplace: 'Kapitalbank',
    position: 'Data Analyst',
    text: "Real bank ma'lumotlari ustida ishladik. Nazariya va amaliyot muvozanati juda zo'r.",
    order: 6,
  },
];

const partners: Prisma.PartnerCreateManyInput[] = [
  'Uzum',
  'EPAM',
  'Click',
  'Payme',
  'Kapitalbank',
  'Beeline',
  'IT Park',
  'Express24',
].map((name, index) => ({ name, order: index + 1 }));

const faqs: Prisma.FaqCreateManyInput[] = [
  {
    question: "Kurslarga qatnashish uchun oldindan bilim kerakmi?",
    answer:
      "Yo'q. Ko'pchilik kurslarimiz noldan boshlanadi. Faqat kompyuterdan foydalana olish va o'rganishga ishtiyoq kifoya.",
  },
  {
    question: 'Darslar qanday formatda o‘tadi?',
    answer:
      "Darslar haftada 3 marta, har biri 2 soatdan. Offline (filiallarimizda) va gibrid formatlar mavjud.",
  },
  {
    question: 'Kurs oxirida sertifikat beriladimi?',
    answer: "Ha, yakuniy imtihon va loyihani muvaffaqiyatli topshirgan o'quvchilarga sertifikat beriladi.",
  },
  {
    question: 'Ishga joylashishda yordam berasizmi?',
    answer:
      "Albatta. Karyera markazimiz CV tayyorlash, intervyuga tayyorgarlik va hamkor kompaniyalarga tavsiya qilishda yordam beradi.",
  },
  {
    question: "To'lovni bo'lib to'lash mumkinmi?",
    answer: "Ha, to'lov oylik amalga oshiriladi. Shuningdek, bo'lib to'lash va chegirmalar mavjud.",
  },
  {
    question: 'Bepul sinov darsi bormi?',
    answer: "Ha! Ariza qoldiring — menejerimiz siz bilan bog'lanib, bepul sinov darsiga yozib qo'yadi.",
  },
].map((faq, index) => ({ ...faq, order: index + 1 }));

const branches: Prisma.BranchCreateManyInput[] = [
  {
    name: 'Chilonzor filiali',
    address: "Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi, 12",
    landmark: 'Novza metro bekati yonida',
    phone: '+998 71 200 00 01',
    order: 1,
  },
  {
    name: 'Yunusobod filiali',
    address: "Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi, 107",
    landmark: 'Minor metro bekati',
    phone: '+998 71 200 00 02',
    order: 2,
  },
  {
    name: "Mirzo Ulug'bek filiali",
    address: "Toshkent sh., Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li, 45",
    landmark: "Buyuk Ipak Yo'li metro bekati",
    phone: '+998 71 200 00 03',
    order: 3,
  },
];

const posts: Prisma.PostCreateManyInput[] = [
  {
    slug: 'data-science-kursi-ochildi',
    title: "Yangi yo'nalish: Data Science va sun'iy intellekt kursi ochildi",
    excerpt: "Endi Joylinks'da ma'lumotlar tahlili va mashinali o'qitishni o'rganishingiz mumkin.",
    content:
      "Joylinks o'quv markazi yangi yo'nalish — Data Science va sun'iy intellekt kursini ishga tushirdi.\n\nKurs 10 oy davom etadi va Python, statistika hamda mashinali o'qitish asoslarini o'z ichiga oladi. Birinchi guruhga qabul boshlandi!",
  },
  {
    slug: 'hackathon-2026',
    title: 'Joylinks Hackathon 2026: 48 soat, 30 jamoa',
    excerpt: "O'quvchilarimiz 48 soat davomida real muammolarga yechim yaratishdi.",
    content:
      "O'tgan hafta yakunlangan hackathonda 30 dan ortiq jamoa qatnashdi. G'oliblar hamkor kompaniyalarimizda amaliyot o'tash imkoniyatini qo'lga kiritishdi.",
  },
  {
    slug: 'yangi-filial',
    title: "Mirzo Ulug'bek tumanida yangi filial ochildi",
    excerpt: 'Zamonaviy jihozlangan 8 ta xonali yangi filialimiz sizni kutmoqda.',
    content:
      "Endi Mirzo Ulug'bek tumanida yashovchilar uchun ham Joylinks yaqinroq! Yangi filialda barcha yo'nalishlar bo'yicha guruhlar ochilmoqda.",
  },
];

// ─────────────────────────────────────────────
// Seed funksiyalari
// ─────────────────────────────────────────────

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL ?? 'admin@joylinks.uz').toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? 'admin12345';
  const name = process.env.ADMIN_NAME ?? 'Joylinks Admin';

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, name, password: await bcrypt.hash(password, 10) },
  });

  console.log(`👤 Admin: ${email}`);
}

async function seedIfEmpty(label: string, count: () => Promise<number>, seed: () => Promise<unknown>) {
  if ((await count()) > 0) {
    console.log(`⏭  ${label}: mavjud, o'tkazib yuborildi`);
    return;
  }
  await seed();
  console.log(`✅ ${label}`);
}

async function main() {
  await seedAdmin();
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      telegram: 'https://t.me/joylinks',
      instagram: 'https://instagram.com/joylinks',
      youtube: 'https://youtube.com/@joylinks',
    },
  });

  await seedIfEmpty(
    'Mentorlar',
    () => prisma.mentor.count(),
    () => prisma.mentor.createMany({ data: mentors }),
  );

  await seedIfEmpty(
    'Kurslar',
    () => prisma.course.count(),
    async () => {
      for (const { mentorNames, ...course } of courses) {
        const linkedMentors = await prisma.mentor.findMany({
          where: { fullName: { in: mentorNames } },
          select: { id: true },
        });
        await prisma.course.create({ data: { ...course, mentors: { connect: linkedMentors } } });
      }
    },
  );

  await seedIfEmpty(
    'Fikrlar',
    () => prisma.testimonial.count(),
    () => prisma.testimonial.createMany({ data: testimonials }),
  );
  await seedIfEmpty('Hamkorlar', () => prisma.partner.count(), () => prisma.partner.createMany({ data: partners }));
  await seedIfEmpty('FAQ', () => prisma.faq.count(), () => prisma.faq.createMany({ data: faqs }));
  await seedIfEmpty('Filiallar', () => prisma.branch.count(), () => prisma.branch.createMany({ data: branches }));
  await seedIfEmpty('Yangiliklar', () => prisma.post.count(), () => prisma.post.createMany({ data: posts }));
}

main()
  .catch((error) => {
    console.error('❌ Seed xatosi:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
