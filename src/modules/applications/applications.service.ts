import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { paginate } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ApplicationsQueryDto } from './dto/applications-query.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateApplicationDto) {
    const courseId = dto.courseId ? await this.resolveCourseId(dto.courseId) : null;

    await this.prisma.application.create({ data: { ...dto, courseId } });

    return { success: true, message: "Arizangiz qabul qilindi! Tez orada siz bilan bog'lanamiz." };
  }

  async findAll(query: ApplicationsQueryDto) {
    const where: Prisma.ApplicationWhereInput = {
      ...(query.status && { status: query.status }),
      ...(query.search && {
        OR: [
          { fullName: { contains: query.search, mode: 'insensitive' } },
          { phone: { contains: query.search } },
        ],
      }),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.application.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: query.skip,
        take: query.limit,
        include: { course: { select: { id: true, title: true } } },
      }),
      this.prisma.application.count({ where }),
    ]);

    return paginate(items, total, query);
  }

  update(id: string, dto: UpdateApplicationDto) {
    return this.prisma.application.update({
      where: { id },
      data: dto,
      include: { course: { select: { id: true, title: true } } },
    });
  }

  async remove(id: string) {
    await this.prisma.application.delete({ where: { id } });
  }

  /** Mavjud bo'lmagan kurs tanlansa ham ariza yo'qolmasligi uchun */
  private async resolveCourseId(courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { id: true },
    });
    return course?.id ?? null;
  }
}
