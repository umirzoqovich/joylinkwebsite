/** Kontentni prisma/content-data.json ga eksport qiladi (admin va arizalarsiz). `npx ts-node --transpile-only prisma/export-data.ts` */
import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  const data = {
    siteSettings: await prisma.siteSettings.findMany(),
    course: await prisma.course.findMany(),
    mentor: await prisma.mentor.findMany(),
    testimonial: await prisma.testimonial.findMany(),
    partner: await prisma.partner.findMany(),
    faq: await prisma.faq.findMany(),
    branch: await prisma.branch.findMany(),
    post: await prisma.post.findMany(),
  };
  writeFileSync(join(__dirname, 'content-data.json'), JSON.stringify(data, null, 2));
  console.log(Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.length])));
}

main().finally(() => prisma.$disconnect());
