import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { slugify } from '../../common/utils/slugify';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

const PUBLIC_MENTOR_FIELDS = {
  id: true,
  fullName: true,
  position: true,
  photo: true,
  experienceYears: true,
} satisfies Prisma.MentorSelect;

const ORDER_BY: Prisma.CourseOrderByWithRelationInput[] = [{ order: 'asc' }, { createdAt: 'asc' }];

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  // ───────────── Public ─────────────

  findPublished() {
    return this.prisma.course.findMany({
      where: { isPublished: true },
      orderBy: ORDER_BY,
      omit: { description: true, curriculum: true },
    });
  }

  async findPublishedBySlug(slug: string) {
    const course = await this.prisma.course.findFirst({
      where: { slug, isPublished: true },
      include: {
        mentors: { where: { isActive: true }, select: PUBLIC_MENTOR_FIELDS, orderBy: { order: 'asc' } },
      },
    });

    if (!course) throw new NotFoundException('Kurs topilmadi');
    return course;
  }

  // ───────────── Admin ─────────────

  findAll() {
    return this.prisma.course.findMany({
      orderBy: ORDER_BY,
      include: { _count: { select: { applications: true, mentors: true } } },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { mentors: { select: { id: true } } },
    });

    if (!course) throw new NotFoundException('Kurs topilmadi');

    const { mentors, ...rest } = course;
    return { ...rest, mentorIds: mentors.map((mentor) => mentor.id) };
  }

  create({ mentorIds, curriculum, ...dto }: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...dto,
        slug: dto.slug || slugify(dto.title),
        curriculum: this.toJson(curriculum ?? []),
        mentors: mentorIds && { connect: mentorIds.map((id) => ({ id })) },
      },
    });
  }

  update(id: string, { mentorIds, curriculum, ...dto }: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: {
        ...dto,
        curriculum: curriculum && this.toJson(curriculum),
        mentors: mentorIds && { set: mentorIds.map((mentorId) => ({ id: mentorId })) },
      },
    });
  }

  async remove(id: string) {
    await this.prisma.course.delete({ where: { id } });
  }

  private toJson<T>(value: T) {
    return value as unknown as Prisma.InputJsonValue;
  }
}
