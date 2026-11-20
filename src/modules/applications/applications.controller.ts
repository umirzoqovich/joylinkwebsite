import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@ApiTags('Arizalar')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  /** Saytdagi "Ariza qoldirish" formasi */
  @Post()
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }
}
