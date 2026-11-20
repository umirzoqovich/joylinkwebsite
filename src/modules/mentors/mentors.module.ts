import { Module } from '@nestjs/common';

import { MentorsAdminController } from './mentors-admin.controller';
import { MentorsController } from './mentors.controller';
import { MentorsService } from './mentors.service';

@Module({
  controllers: [MentorsController, MentorsAdminController],
  providers: [MentorsService],
})
export class MentorsModule {}
