import { Module } from '@nestjs/common';

import { BranchesAdminController } from './branches-admin.controller';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';

@Module({
  controllers: [BranchesController, BranchesAdminController],
  providers: [BranchesService],
})
export class BranchesModule {}
