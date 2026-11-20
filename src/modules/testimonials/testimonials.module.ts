import { Module } from '@nestjs/common';

import { TestimonialsAdminController } from './testimonials-admin.controller';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';

@Module({
  controllers: [TestimonialsController, TestimonialsAdminController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
