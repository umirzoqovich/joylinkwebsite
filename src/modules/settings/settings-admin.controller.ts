import { Body, Put } from '@nestjs/common';

import { AdminController } from '../../common/decorators/admin-controller.decorator';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

@AdminController('settings', 'Sozlamalar')
export class SettingsAdminController {
  constructor(private readonly settingsService: SettingsService) {}

  @Put()
  update(@Body() dto: UpdateSettingsDto) {
    return this.settingsService.update(dto);
  }
}
