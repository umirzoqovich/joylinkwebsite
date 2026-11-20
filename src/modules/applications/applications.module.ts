import { Module } from '@nestjs/common';

import { ApplicationsAdminController } from './applications-admin.controller';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  controllers: [ApplicationsController, ApplicationsAdminController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
