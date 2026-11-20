import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { paginate, PaginationQueryDto } from '../../common/dto/pagination.dto';
import { slugify } from '../../common/utils/slugify';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  // ───────────── Public ─────────────

  async findPublished(query: PaginationQueryDto) {
    const where: Prisma.PostWhereInput = {
      isPublished: true,
      publishedAt: { lte: new Date() },
      ...(query.search && { title: { contains: query.search, mode: 'insensitive' } }),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: query.skip,
        take: query.limit,
        omit: { content: true },
      }),
      this.prisma.post.count({ where }),
    ]);

    return paginate(items, total, query);
  }

  /** Maqolani qaytaradi va ko'rishlar sonini oshiradi */
  async findPublishedBySlug(slug: string) {
    const post = await this.prisma.post.findFirst({
      where: { slug, isPublished: true, publishedAt: { lte: new Date() } },
    });

    if (!post) throw new NotFoundException('Maqola topilmadi');

    return this.prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });
  }

  // ───────────── Admin ─────────────

  findAll() {
    return this.prisma.post.findMany({
      orderBy: { publishedAt: 'desc' },
      omit: { content: true },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Maqola topilmadi');
    return post;
  }

  create(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: { ...dto, slug: dto.slug || slugify(dto.title) },
    });
  }

  update(id: string, dto: UpdatePostDto) {
    return this.prisma.post.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.post.delete({ where: { id } });
  }
}
