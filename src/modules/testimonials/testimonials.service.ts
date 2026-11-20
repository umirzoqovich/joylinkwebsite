import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

const ORDER_BY: Prisma.TestimonialOrderByWithRelationInput[] = [
  { order: 'asc' },
  { createdAt: 'desc' },
];

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: ORDER_BY });
  }

  findAll() {
    return this.prisma.testimonial.findMany({ orderBy: ORDER_BY });
  }

  async findOne(id: string) {
    const testimonial = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) throw new NotFoundException('Fikr topilmadi');
    return testimonial;
  }

  create(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({ data: dto });
  }

  update(id: string, dto: UpdateTestimonialDto) {
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.testimonial.delete({ where: { id } });
  }
}
