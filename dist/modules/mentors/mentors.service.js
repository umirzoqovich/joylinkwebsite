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
exports.MentorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ORDER_BY = [{ order: 'asc' }, { createdAt: 'asc' }];
let MentorsService = class MentorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findActive() {
        return this.prisma.mentor.findMany({
            where: { isActive: true },
            orderBy: ORDER_BY,
            include: {
                courses: { where: { isPublished: true }, select: { title: true, slug: true } },
            },
        });
    }
    findAll() {
        return this.prisma.mentor.findMany({
            orderBy: ORDER_BY,
            include: { _count: { select: { courses: true } } },
        });
    }
    async findOne(id) {
        const mentor = await this.prisma.mentor.findUnique({ where: { id } });
        if (!mentor)
            throw new common_1.NotFoundException('Mentor topilmadi');
        return mentor;
    }
    create(dto) {
        return this.prisma.mentor.create({ data: dto });
    }
    update(id, dto) {
        return this.prisma.mentor.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.prisma.mentor.delete({ where: { id } });
    }
};
exports.MentorsService = MentorsService;
exports.MentorsService = MentorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MentorsService);
//# sourceMappingURL=mentors.service.js.map