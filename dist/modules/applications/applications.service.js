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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const prisma_service_1 = require("../../prisma/prisma.service");
let ApplicationsService = class ApplicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const courseId = dto.courseId ? await this.resolveCourseId(dto.courseId) : null;
        await this.prisma.application.create({ data: { ...dto, courseId } });
        return { success: true, message: "Arizangiz qabul qilindi! Tez orada siz bilan bog'lanamiz." };
    }
    async findAll(query) {
        const where = {
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
        return (0, pagination_dto_1.paginate)(items, total, query);
    }
    update(id, dto) {
        return this.prisma.application.update({
            where: { id },
            data: dto,
            include: { course: { select: { id: true, title: true } } },
        });
    }
    async remove(id) {
        await this.prisma.application.delete({ where: { id } });
    }
    async resolveCourseId(courseId) {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
            select: { id: true },
        });
        return course?.id ?? null;
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map