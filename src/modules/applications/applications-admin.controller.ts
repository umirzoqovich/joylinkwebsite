import { Body, Delete, Get, HttpCode, HttpStatus, Param, Patch, Query } from '@nestjs/common';

import { AdminController } from '../../common/decorators/admin-controller.decorator';
import { ApplicationsService } from './applications.service';
import { ApplicationsQueryDto } from './dto/applications-query.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@AdminController('applications', 'Arizalar')
export class ApplicationsAdminController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  findAll(@Query() query: ApplicationsQueryDto) {
    return this.applicationsService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto) {
    return this.applicationsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}
