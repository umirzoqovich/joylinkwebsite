import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SettingsService } from './settings.service';

@ApiTags('Sozlamalar')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /** Sayt matnlari, aloqa ma'lumotlari va statistika */
  @Get()
  get() {
    return this.settingsService.get();
  }
}
