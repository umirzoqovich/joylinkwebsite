import { Body, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { AdminController } from '../../common/decorators/admin-controller.decorator';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { MentorsService } from './mentors.service';

@AdminController('mentors', 'Mentorlar')
export class MentorsAdminController {
  constructor(private readonly mentorsService: MentorsService) {}

  @Get()
  findAll() {
    return this.mentorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentorsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMentorDto) {
    return this.mentorsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMentorDto) {
    return this.mentorsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mentorsService.remove(id);
  }
}
