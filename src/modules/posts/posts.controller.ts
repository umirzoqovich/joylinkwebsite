import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { PostsService } from './posts.service';

@ApiTags('Yangiliklar')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.postsService.findPublished(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postsService.findPublishedBySlug(slug);
  }
}
