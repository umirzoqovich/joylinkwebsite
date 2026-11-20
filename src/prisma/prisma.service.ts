import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    await this.ensureInitialData();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async ensureInitialData() {
    try {
      const adminCount = await this.admin.count();
      if (adminCount === 0) {
        const p1 = await bcrypt.hash('admin12345', 10);
        const p2 = await bcrypt.hash('j12345678', 10);
        await this.admin.createMany({
          data: [
            { email: 'admin@joylinks.uz', password: p1, name: 'Admin' },
            { email: 'arolovrefatbek@gmail.com', password: p2, name: 'Joylinks Admin' },
          ],
          skipDuplicates: true,
        });
        this.logger.log('Initial admin accounts created');
      }

      const courseCount = await this.course.count();
      if (courseCount === 0) {
        const candidates = [
          join(process.cwd(), 'prisma', 'content-data.json'),
          join(__dirname, '..', '..', 'prisma', 'content-data.json'),
        ];
        const dataFile = candidates.find((p) => existsSync(p));
        if (dataFile) {
          const content = JSON.parse(readFileSync(dataFile, 'utf8'));
          const tables = ['siteSettings', 'course', 'mentor', 'testimonial', 'partner', 'faq', 'branch', 'post'] as const;
          for (const table of tables) {
            if (content[table]?.length) {
              await (this as any)[table].createMany({
                data: content[table],
                skipDuplicates: true,
              });
            }
          }
          this.logger.log('Initial content-data loaded into database');
        }
      }
    } catch (err) {
      this.logger.warn(`Initial data check skipped: ${(err as Error).message}`);
    }
  }
}
