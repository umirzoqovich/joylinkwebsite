import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

const ORDER_BY: Prisma.BranchOrderByWithRelationInput[] = [{ order: 'asc' }, { createdAt: 'asc' }];

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  findActive() {
    return this.prisma.branch.findMany({ where: { isActive: true }, orderBy: ORDER_BY });
  }

  findAll() {
    return this.prisma.branch.findMany({ orderBy: ORDER_BY });
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({ where: { id } });
    if (!branch) throw new NotFoundException('Filial topilmadi');
    return branch;
  }

  create(dto: CreateBranchDto) {
    return this.prisma.branch.create({ data: dto });
  }

  update(id: string, dto: UpdateBranchDto) {
    return this.prisma.branch.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.prisma.branch.delete({ where: { id } });
  }
}
