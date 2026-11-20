import { Module } from '@nestjs/common';

import { CoursesAdminController } from './courses-admin.controller';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  controllers: [CoursesController, CoursesAdminController],
  providers: [CoursesService],
})
export class CoursesModule {}
