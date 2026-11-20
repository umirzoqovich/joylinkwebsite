import { Injectable } from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

const CHART_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const chartFrom = this.startOfDay(new Date(Date.now() - (CHART_DAYS - 1) * DAY_MS));

    const [courses, mentors, testimonials, posts, byStatus, recentApplications, chartRows] =
      await Promise.all([
        this.prisma.course.count({ where: { isPublished: true } }),
        this.prisma.mentor.count({ where: { isActive: true } }),
        this.prisma.testimonial.count({ where: { isPublished: true } }),
        this.prisma.post.count({ where: { isPublished: true } }),
        this.prisma.application.groupBy({ by: ['status'], _count: { _all: true } }),
        this.prisma.application.findMany({
          take: 6,
          orderBy: { createdAt: 'desc' },
          include: { course: { select: { id: true, title: true } } },
        }),
        this.prisma.application.findMany({
          where: { createdAt: { gte: chartFrom } },
          select: { createdAt: true },
        }),
      ]);

    const applicationsByStatus = Object.fromEntries(
      Object.values(ApplicationStatus).map((status) => [
        status,
        byStatus.find((row) => row.status === status)?._count._all ?? 0,
      ]),
    ) as Record<ApplicationStatus, number>;

    return {
      totals: {
        courses,
        mentors,
        testimonials,
        posts,
        applications: Object.values(applicationsByStatus).reduce((sum, n) => sum + n, 0),
      },
      applicationsByStatus,
      applicationsChart: this.buildDailyChart(chartFrom, chartRows.map((row) => row.createdAt)),
      recentApplications,
    };
  }

  /** Oxirgi N kun bo'yicha kunlik arizalar soni */
  private buildDailyChart(from: Date, dates: Date[]) {
    const buckets = Array.from({ length: CHART_DAYS }, (_, index) => ({
      date: new Date(from.getTime() + index * DAY_MS).toISOString().slice(0, 10),
      count: 0,
    }));

    for (const date of dates) {
      const index = Math.floor((this.startOfDay(date).getTime() - from.getTime()) / DAY_MS);
      if (buckets[index]) buckets[index].count += 1;
    }

    return buckets;
  }

  private startOfDay(date: Date) {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
  }
}
