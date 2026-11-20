import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CoursesService } from './courses.service';

@ApiTags('Kurslar')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  /** Saytdagi barcha faol kurslar */
  @Get()
  findAll() {
    return this.coursesService.findPublished();
  }

  /** Kurs sahifasi (mentorlar va o'quv dasturi bilan) */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.coursesService.findPublishedBySlug(slug);
  }
}
