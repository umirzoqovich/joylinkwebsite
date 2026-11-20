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
exports.UploadsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const node_crypto_1 = require("node:crypto");
const node_path_1 = require("node:path");
const multer_1 = require("multer");
const admin_controller_decorator_1 = require("../../common/decorators/admin-controller.decorator");
const uploads_constants_1 = require("./uploads.constants");
let UploadsController = class UploadsController {
    upload(file) {
        if (!file)
            throw new common_1.BadRequestException('Fayl tanlanmagan');
        return {
            url: `${uploads_constants_1.UPLOADS_PREFIX}${file.filename}`,
            size: file.size,
            mimeType: file.mimetype,
        };
    }
};
exports.UploadsController = UploadsController;
__decorate([
    openapi.ApiOperation({ summary: "Rasm yuklash. Javobda saqlangan faylning nisbiy URL manzili qaytadi." }),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: { file: { type: 'string', format: 'binary' } },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: uploads_constants_1.UPLOADS_DIR,
            filename: (_req, file, callback) => callback(null, `${(0, node_crypto_1.randomUUID)()}${(0, node_path_1.extname)(file.originalname).toLowerCase()}`),
        }),
        limits: { fileSize: uploads_constants_1.MAX_UPLOAD_SIZE },
        fileFilter: (_req, file, callback) => {
            if (!uploads_constants_1.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
                return callback(new common_1.BadRequestException('Faqat rasm fayllari qabul qilinadi'), false);
            }
            callback(null, true);
        },
    })),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UploadsController.prototype, "upload", null);
exports.UploadsController = UploadsController = __decorate([
    (0, admin_controller_decorator_1.AdminController)('uploads', 'Fayllar')
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map