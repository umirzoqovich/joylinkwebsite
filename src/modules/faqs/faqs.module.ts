import { Module } from '@nestjs/common';

import { FaqsAdminController } from './faqs-admin.controller';
import { FaqsController } from './faqs.controller';
import { FaqsService } from './faqs.service';

@Module({
  controllers: [FaqsController, FaqsAdminController],
  providers: [FaqsService],
})
export class FaqsModule {}
