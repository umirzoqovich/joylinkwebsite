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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const slugify_1 = require("../../common/utils/slugify");
const prisma_service_1 = require("../../prisma/prisma.service");
const PUBLIC_MENTOR_FIELDS = {
    id: true,
    fullName: true,
    position: true,
    photo: true,
    experienceYears: true,
};
const ORDER_BY = [{ order: 'asc' }, { createdAt: 'asc' }];
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findPublished() {
        return this.prisma.course.findMany({
            where: { isPublished: true },
            orderBy: ORDER_BY,
            omit: { description: true, curriculum: true },
        });
    }
    async findPublishedBySlug(slug) {
        const course = await this.prisma.course.findFirst({
            where: { slug, isPublished: true },
            include: {
                mentors: { where: { isActive: true }, select: PUBLIC_MENTOR_FIELDS, orderBy: { order: 'asc' } },
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Kurs topilmadi');
        return course;
    }
    findAll() {
        return this.prisma.course.findMany({
            orderBy: ORDER_BY,
            include: { _count: { select: { applications: true, mentors: true } } },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: { mentors: { select: { id: true } } },
        });
        if (!course)
            throw new common_1.NotFoundException('Kurs topilmadi');
        const { mentors, ...rest } = course;
        return { ...rest, mentorIds: mentors.map((mentor) => mentor.id) };
    }
    create({ mentorIds, curriculum, ...dto }) {
        return this.prisma.course.create({
            data: {
                ...dto,
                slug: dto.slug || (0, slugify_1.slugify)(dto.title),
                curriculum: this.toJson(curriculum ?? []),
                mentors: mentorIds && { connect: mentorIds.map((id) => ({ id })) },
            },
        });
    }
    update(id, { mentorIds, curriculum, ...dto }) {
        return this.prisma.course.update({
            where: { id },
            data: {
                ...dto,
                curriculum: curriculum && this.toJson(curriculum),
                mentors: mentorIds && { set: mentorIds.map((mentorId) => ({ id: mentorId })) },
            },
        });
    }
    async remove(id) {
        await this.prisma.course.delete({ where: { id } });
    }
    toJson(value) {
        return value;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map