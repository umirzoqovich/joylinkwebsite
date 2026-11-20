"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = AdminController;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../modules/auth/guards/jwt-auth.guard");
function AdminController(path, tag) {
    return (0, common_1.applyDecorators)((0, common_1.Controller)(`admin/${path}`), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiTags)(`Admin · ${tag ?? path}`));
}
//# sourceMappingURL=admin-controller.decorator.js.map