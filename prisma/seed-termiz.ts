/**
 * Termizdagi Joylinks IT Academy uchun faqat tasdiqlangan ma'lumotlar.
 * Namunaviy (soxta) kontent qo'shilmaydi: kurslar, mentorlar, fikrlar admin paneldan kiritiladi.
 * Ishga tushirish: `npx ts-node --transpile-only prisma/seed-termiz.ts`
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? 'admin@joylinks.uz').toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? 'admin12345';
  const name = process.env.ADMIN_NAME ?? 'Joylinks Admin';

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, name, password: await bcrypt.hash(password, 10) },
  });

  const settings = {
    heroBadge: 'Yangi guruhlarga qabul ochiq',
    heroTitle: 'Joylinks IT Academy — Termiz filiali',
    heroSubtitle: "Zamonaviy IT kasblari bo'yicha o'quv markazi. Surxondaryo viloyati, Termiz shahri.",
    phone: '+998 99 287 32 20',
    email: '',
    address: "Surxondaryo viloyati, Termiz shahri, Alpomish MFY, Alisher Navoiy ko'chasi, 28b-uy",
    telegram: 'https://t.me/Joylinks_Termiz',
    instagram: 'https://www.instagram.com/joylinks_termiz?utm_source=ig_web_button_share_sheet&lqvp=ZDNlZDc0MzIxNw==',
    youtube: null,
    facebook: null,
    graduatesCount: 10000,
    employmentRate: 0,
    mentorsCount: 0,
    yearsOfExperience: 0,
  };
  await prisma.siteSettings.upsert({ where: { id: 1 }, update: settings, create: { id: 1, ...settings } });

  if ((await prisma.branch.count()) === 0) {
    await prisma.branch.create({
      data: {
        name: 'Termiz filiali',
        address: 'Termiz sh., Surxondaryo viloyati',
        phone: '',
        workingHours: 'Aniqlashtiriladi',
        order: 1,
      },
    });
  }
  console.log('✅ Termiz ma\'lumotlari yozildi');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
