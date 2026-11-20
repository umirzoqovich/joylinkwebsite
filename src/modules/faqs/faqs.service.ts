import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

const ORDER_BY: Prisma.FaqOrderByWithRelationInput[] = [{ order: 'asc' }, { createdAt: 'asc' }];

@Injectable()
export class FaqsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.faq.findMany({ where: { isPublished: true }, orderBy: ORDER_BY });
  }

  findAll() {
    return this.prisma.faq.findMany({ orderBy: ORDER_BY });
  }

  async findOne(id: string) {
    const faq = await this.prisma.faq.findUnique({ where: { id } });
    if (!faq) throw new NotFoundException('Savol topilmadi');
    return faq;
  }

  create(dto: CreateFaqDto) {
    return this.prisma.faq.create({ data: dto });
  }

  update(id: string, dto: UpdateFaqDto) {
    return this.prisma.faq.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.faq.delete({ where: { id } });
  }
}
