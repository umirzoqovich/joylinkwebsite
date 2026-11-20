import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

const ORDER_BY: Prisma.MentorOrderByWithRelationInput[] = [{ order: 'asc' }, { createdAt: 'asc' }];

@Injectable()
export class MentorsService {
  constructor(private readonly prisma: PrismaService) {}

  findActive() {
    return this.prisma.mentor.findMany({
      where: { isActive: true },
      orderBy: ORDER_BY,
      include: {
        courses: { where: { isPublished: true }, select: { title: true, slug: true } },
      },
    });
  }

  findAll() {
    return this.prisma.mentor.findMany({
      orderBy: ORDER_BY,
      include: { _count: { select: { courses: true } } },
    });
  }

  async findOne(id: string) {
    const mentor = await this.prisma.mentor.findUnique({ where: { id } });
    if (!mentor) throw new NotFoundException('Mentor topilmadi');
    return mentor;
  }

  create(dto: CreateMentorDto) {
    return this.prisma.mentor.create({ data: dto });
  }

  update(id: string, dto: UpdateMentorDto) {
    return this.prisma.mentor.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.mentor.delete({ where: { id } });
  }
}
