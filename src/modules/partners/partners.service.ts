import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

const ORDER_BY: Prisma.PartnerOrderByWithRelationInput[] = [{ order: 'asc' }, { createdAt: 'asc' }];

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  findActive() {
    return this.prisma.partner.findMany({ where: { isActive: true }, orderBy: ORDER_BY });
  }

  findAll() {
    return this.prisma.partner.findMany({ orderBy: ORDER_BY });
  }

  async findOne(id: string) {
    const partner = await this.prisma.partner.findUnique({ where: { id } });
    if (!partner) throw new NotFoundException('Hamkor topilmadi');
    return partner;
  }

  create(dto: CreatePartnerDto) {
    return this.prisma.partner.create({ data: dto });
  }

  update(id: string, dto: UpdatePartnerDto) {
    return this.prisma.partner.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.partner.delete({ where: { id } });
  }
}
