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
exports.TestimonialsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const ORDER_BY = [
    { order: 'asc' },
    { createdAt: 'desc' },
];
let TestimonialsService = class TestimonialsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findPublished() {
        return this.prisma.testimonial.findMany({ where: { isPublished: true }, orderBy: ORDER_BY });
    }
    findAll() {
        return this.prisma.testimonial.findMany({ orderBy: ORDER_BY });
    }
    async findOne(id) {
        const testimonial = await this.prisma.testimonial.findUnique({ where: { id } });
        if (!testimonial)
            throw new common_1.NotFoundException('Fikr topilmadi');
        return testimonial;
    }
    create(dto) {
        return this.prisma.testimonial.create({ data: dto });
    }
    update(id, dto) {
        return this.prisma.testimonial.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.prisma.testimonial.delete({ where: { id } });
    }
};
exports.TestimonialsService = TestimonialsService;
exports.TestimonialsService = TestimonialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TestimonialsService);
//# sourceMappingURL=testimonials.service.js.map