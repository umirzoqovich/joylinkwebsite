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
exports.ApplicationsAdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const admin_controller_decorator_1 = require("../../common/decorators/admin-controller.decorator");
const applications_service_1 = require("./applications.service");
const applications_query_dto_1 = require("./dto/applications-query.dto");
const update_application_dto_1 = require("./dto/update-application.dto");
let ApplicationsAdminController = class ApplicationsAdminController {
    applicationsService;
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    findAll(query) {
        return this.applicationsService.findAll(query);
    }
    update(id, dto) {
        return this.applicationsService.update(id, dto);
    }
    remove(id) {
        return this.applicationsService.remove(id);
    }
};
exports.ApplicationsAdminController = ApplicationsAdminController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [applications_query_dto_1.ApplicationsQueryDto]),
    __metadata("design:returntype", void 0)
], ApplicationsAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_dto_1.UpdateApplicationDto]),
    __metadata("design:returntype", void 0)
], ApplicationsAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsAdminController.prototype, "remove", null);
exports.ApplicationsAdminController = ApplicationsAdminController = __decorate([
    (0, admin_controller_decorator_1.AdminController)('applications', 'Arizalar'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsAdminController);
//# sourceMappingURL=applications-admin.controller.js.map