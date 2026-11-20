import { Module } from '@nestjs/common';

import { PartnersAdminController } from './partners-admin.controller';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

@Module({
  controllers: [PartnersController, PartnersAdminController],
  providers: [PartnersService],
})
export class PartnersModule {}
