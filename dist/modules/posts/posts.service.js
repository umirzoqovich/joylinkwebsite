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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const slugify_1 = require("../../common/utils/slugify");
const prisma_service_1 = require("../../prisma/prisma.service");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPublished(query) {
        const where = {
            isPublished: true,
            publishedAt: { lte: new Date() },
            ...(query.search && { title: { contains: query.search, mode: 'insensitive' } }),
        };
        const [items, total] = await this.prisma.$transaction([
            this.prisma.post.findMany({
                where,
                orderBy: { publishedAt: 'desc' },
                skip: query.skip,
                take: query.limit,
                omit: { content: true },
            }),
            this.prisma.post.count({ where }),
        ]);
        return (0, pagination_dto_1.paginate)(items, total, query);
    }
    async findPublishedBySlug(slug) {
        const post = await this.prisma.post.findFirst({
            where: { slug, isPublished: true, publishedAt: { lte: new Date() } },
        });
        if (!post)
            throw new common_1.NotFoundException('Maqola topilmadi');
        return this.prisma.post.update({
            where: { id: post.id },
            data: { views: { increment: 1 } },
        });
    }
    findAll() {
        return this.prisma.post.findMany({
            orderBy: { publishedAt: 'desc' },
            omit: { content: true },
        });
    }
    async findOne(id) {
        const post = await this.prisma.post.findUnique({ where: { id } });
        if (!post)
            throw new common_1.NotFoundException('Maqola topilmadi');
        return post;
    }
    create(dto) {
        return this.prisma.post.create({
            data: { ...dto, slug: dto.slug || (0, slugify_1.slugify)(dto.title) },
        });
    }
    update(id, dto) {
        return this.prisma.post.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.prisma.post.delete({ where: { id } });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map