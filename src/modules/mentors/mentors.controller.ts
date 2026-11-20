import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MentorsService } from './mentors.service';

@ApiTags('Mentorlar')
@Controller('mentors')
export class MentorsController {
  constructor(private readonly mentorsService: MentorsService) {}

  @Get()
  findAll() {
    return this.mentorsService.findActive();
  }
}
