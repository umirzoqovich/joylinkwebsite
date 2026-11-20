/**
 * Joylinks IT Akademiyasining tasdiqlangan kurslari (narxlar so'mda).
 * Faqat egasi bergan ma'lumotlar yoziladi: o'quv dasturi, mentorlar va ko'nikmalar
 * admin paneldan to'ldiriladi.
 *
 * `price` — oylik to'lov (saytda "Oylik to'lov" deb ko'rsatiladi).
 * Qayta ishga tushirish xavfsiz: kurslar `slug` bo'yicha yangilanadi.
 * Ishga tushirish: `npx ts-node --transpile-only prisma/seed-courses.ts`
 */
import { CourseFormat, CourseLevel, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CourseSeed {
  slug: string;
  title: string;
  icon: string;
  color: string;
  durationMonths: number;
  /** Oylik to'lov */
  price: number;
  /** Umumiy kurs narxi (ma'lum bo'lsa) */
  totalPrice?: number;
  /** Qo'shimcha narx haqida izoh */
  priceNote?: string;
  isPopular?: boolean;
}

const COURSES: readonly CourseSeed[] = [
  {
    slug: 'kompyuter-savodxonligi',
    title: 'Kompyuter savodxonligi',
    icon: 'monitor',
    color: '#0eb182',
    durationMonths: 4,
    price: 400_000,
    totalPrice: 1_600_000,
    priceNote: "Individual darslar: 1 oylik — 1 200 000 so'm.",
  },
  {
    slug: 'it-foundation',
    title: 'IT Foundation',
    icon: 'terminal',
    color: '#2f6fe0',
    durationMonths: 3,
    price: 650_000,
    totalPrice: 1_950_000,
  },
  {
    slug: 'frontend-dasturlash',
    title: 'Frontend dasturlash',
    icon: 'code',
    color: '#013682',
    durationMonths: 8,
    price: 650_000,
    totalPrice: 5_200_000,
    isPopular: true,
  },
  {
    slug: 'backend-dasturlash',
    title: 'Backend dasturlash',
    icon: 'server',
    color: '#092145',
    durationMonths: 8,
    price: 650_000,
    totalPrice: 5_200_000,
    isPopular: true,
  },
  {
    slug: 'english-for-it',
    title: 'English for IT',
    icon: 'globe',
    color: '#0a8f68',
    // Davomiyligi hali aniqlanmagan: 1 oy vaqtinchalik qiymat
    durationMonths: 1,
    price: 360_000,
    priceNote: "Hozircha narx 360 000 yoki 400 000 so'm (guruhga qarab).",
  },
  {
    slug: 'kiberxavfsizlik',
    title: 'Kiberxavfsizlik',
    icon: 'shield',
    color: '#0f1826',
    durationMonths: 8,
    price: 850_000,
    totalPrice: 6_800_000,
  },
  {
    slug: 'robototexnika',
    title: 'Robototexnika',
    icon: 'cpu',
    color: '#ff830f',
    durationMonths: 6,
    price: 600_000,
    totalPrice: 3_600_000,
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering (AI bilan ishlash)',
    icon: 'brain',
    color: '#7c3aed',
    durationMonths: 4,
    price: 600_000,
    totalPrice: 2_400_000,
  },
];

const formatSum = (value: number) => `${new Intl.NumberFormat('ru-RU').format(value)} so'm`;

function describe(course: CourseSeed): string {
  const parts = [`${course.title} kursi. Davomiyligi: ${course.durationMonths} oy.`];
  parts.push(`Oylik to'lov: ${formatSum(course.price)}.`);
  if (course.totalPrice) parts.push(`Umumiy kurs narxi: ${formatSum(course.totalPrice)}.`);
  if (course.priceNote) parts.push(course.priceNote);
  return parts.join(' ');
}

async function main() {
  for (const [index, course] of COURSES.entries()) {
    const data = {
      title: course.title,
      shortDescription: `${course.durationMonths} oylik kurs — oyiga ${formatSum(course.price)}`,
      description: describe(course),
      icon: course.icon,
      color: course.color,
      durationMonths: course.durationMonths,
      price: course.price,
      level: CourseLevel.BEGINNER,
      format: CourseFormat.OFFLINE,
      isPopular: course.isPopular ?? false,
      isPublished: true,
      order: index + 1,
    };
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: data,
      create: { slug: course.slug, ...data },
    });
  }
  console.log(`✅ ${COURSES.length} ta kurs yozildi`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
