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
exports.CreateCourseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const orderable_dto_1 = require("../../../common/dto/orderable.dto");
const curriculum_module_dto_1 = require("./curriculum-module.dto");
class CreateCourseDto extends orderable_dto_1.OrderableDto {
    title;
    slug;
    shortDescription;
    description;
    image;
    icon;
    color;
    durationMonths;
    lessonsPerWeek;
    lessonHours;
    price;
    oldPrice;
    level;
    format;
    skills;
    curriculum;
    mentorIds;
    isPopular;
    isPublished;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, example: "Frontend dasturlash", minLength: 2, maxLength: 120 }, slug: { required: false, type: () => String, description: "Bo'sh qoldirilsa sarlavhadan avtomatik yasaladi", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" }, shortDescription: { required: true, type: () => String, maxLength: 240 }, description: { required: true, type: () => String }, image: { required: false, type: () => String }, icon: { required: false, type: () => String, description: "lucide-react ikonka nomi.", example: "code" }, color: { required: false, type: () => String, example: "#5b5bf7", pattern: "^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$" }, durationMonths: { required: true, type: () => Number, minimum: 1, maximum: 36 }, lessonsPerWeek: { required: false, type: () => Number, minimum: 1, maximum: 7 }, lessonHours: { required: false, type: () => Number, minimum: 1, maximum: 8 }, price: { required: true, type: () => Number, description: "Oylik narx (so'mda)", minimum: 0 }, oldPrice: { required: false, type: () => Number, nullable: true, minimum: 0 }, level: { required: false, enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"] }, format: { required: false, enum: ["OFFLINE", "ONLINE", "HYBRID"] }, skills: { required: false, type: () => [String], maxItems: 30 }, mentorIds: { required: false, type: () => [String] }, isPopular: { required: false, type: () => Boolean }, isPublished: { required: false, type: () => Boolean } };
    }
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: "Slug faqat kichik lotin harflari, raqam va '-' dan iborat bo'lishi kerak",
    }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(240),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "color", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(36),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "durationMonths", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(7),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "lessonsPerWeek", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(8),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "lessonHours", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCourseDto.prototype, "oldPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CourseLevel),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CourseFormat),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMaxSize)(30),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "skills", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, swagger_1.ApiProperty)({ type: [curriculum_module_dto_1.CurriculumModuleDto], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => curriculum_module_dto_1.CurriculumModuleDto),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "curriculum", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCourseDto.prototype, "mentorIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isPopular", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isPublished", void 0);
//# sourceMappingURL=create-course.dto.js.map