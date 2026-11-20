import { Module, OnModuleInit } from '@nestjs/common';
import { mkdirSync } from 'node:fs';

import { UPLOADS_DIR } from './uploads.constants';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
})
export class UploadsModule implements OnModuleInit {
  onModuleInit() {
    mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}
