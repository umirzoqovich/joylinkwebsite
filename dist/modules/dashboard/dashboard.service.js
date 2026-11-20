"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
const CHART_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOverview() {
        const chartFrom = this.startOfDay(new Date(Date.now() - (CHART_DAYS - 1) * DAY_MS));
        const [courses, mentors, testimonials, posts, byStatus, recentApplications, chartRows] = await Promise.all([
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
        const applicationsByStatus = Object.fromEntries(Object.values(client_1.ApplicationStatus).map((status) => [
            status,
            byStatus.find((row) => row.status === status)?._count._all ?? 0,
        ]));
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
    buildDailyChart(from, dates) {
        const buckets = Array.from({ length: CHART_DAYS }, (_, index) => ({
            date: new Date(from.getTime() + index * DAY_MS).toISOString().slice(0, 10),
            count: 0,
        }));
        for (const date of dates) {
            const index = Math.floor((this.startOfDay(date).getTime() - from.getTime()) / DAY_MS);
            if (buckets[index])
                buckets[index].count += 1;
        }
        return buckets;
    }
    startOfDay(date) {
        const copy = new Date(date);
        copy.setHours(0, 0, 0, 0);
        return copy;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map