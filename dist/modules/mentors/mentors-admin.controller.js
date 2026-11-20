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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorsAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const admin_controller_decorator_1 = require("../../common/decorators/admin-controller.decorator");
const create_mentor_dto_1 = require("./dto/create-mentor.dto");
const update_mentor_dto_1 = require("./dto/update-mentor.dto");
const mentors_service_1 = require("./mentors.service");
let MentorsAdminController = class MentorsAdminController {
    mentorsService;
    constructor(mentorsService) {
        this.mentorsService = mentorsService;
    }
    findAll() {
        return this.mentorsService.findAll();
    }
    findOne(id) {
        return this.mentorsService.findOne(id);
    }
    create(dto) {
        return this.mentorsService.create(dto);
    }
    update(id, dto) {
        return this.mentorsService.update(id, dto);
    }
    remove(id) {
        return this.mentorsService.remove(id);
    }
};
exports.MentorsAdminController = MentorsAdminController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MentorsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MentorsAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mentor_dto_1.CreateMentorDto]),
    __metadata("design:returntype", void 0)
], MentorsAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_mentor_dto_1.UpdateMentorDto]),
    __metadata("design:returntype", void 0)
], MentorsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MentorsAdminController.prototype, "remove", null);
exports.MentorsAdminController = MentorsAdminController = __decorate([
    (0, admin_controller_decorator_1.AdminController)('mentors', 'Mentorlar'),
    __metadata("design:paramtypes", [mentors_service_1.MentorsService])
], MentorsAdminController);
//# sourceMappingURL=mentors-admin.controller.js.map