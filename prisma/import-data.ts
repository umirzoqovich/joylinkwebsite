/**
 * prisma/content-data.json dagi kontentni bo'sh bazaga yozadi (mavjud id'lar o'tkazib yuboriladi).
 * Tartib: `npm run db:deploy` → `npm run db:seed` (admin) → `npx ts-node --transpile-only prisma/import-data.ts`
 */
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();
type Rows = Record<string, unknown>[];

async function main() {
  const data = JSON.parse(readFileSync(join(__dirname, 'content-data.json'), 'utf8')) as Record<string, Rows>;
  const tables = ['siteSettings', 'course', 'mentor', 'testimonial', 'partner', 'faq', 'branch', 'post'] as const;
  for (const table of tables) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const delegate = (prisma as any)[table];
    const result = await delegate.createMany({ data: data[table] ?? [], skipDuplicates: true });
    console.log(`${table}: +${result.count}`);
  }
}

main().finally(() => prisma.$disconnect());
