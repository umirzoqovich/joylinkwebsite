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
exports.CreateApplicationDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateApplicationDto {
    fullName;
    phone;
    courseId;
    message;
    static _OPENAPI_METADATA_FACTORY() {
        return { fullName: { required: true, type: () => String, example: "Sardor Aliyev", minLength: 2, maxLength: 80 }, phone: { required: true, type: () => String, description: "Bo'sh joy va belgilar avtomatik olib tashlanadi.", example: "+998 90 123 45 67", pattern: "^\\+998\\d{9}$" }, courseId: { required: false, type: () => String }, message: { required: false, type: () => String, maxLength: 500 } };
    }
}
exports.CreateApplicationDto = CreateApplicationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Ismingizni kiriting' }),
    (0, class_validator_1.MaxLength)(80),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "fullName", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === 'string' ? value.replace(/[^\d+]/g, '') : value)),
    (0, class_validator_1.Matches)(/^\+998\d{9}$/, { message: "Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak" }),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "courseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateApplicationDto.prototype, "message", void 0);
//# sourceMappingURL=create-application.dto.js.map