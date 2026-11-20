"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_IMAGE_TYPES = exports.MAX_UPLOAD_SIZE = exports.UPLOADS_PREFIX = exports.UPLOADS_DIR = void 0;
const node_path_1 = require("node:path");
exports.UPLOADS_DIR = (0, node_path_1.join)(process.cwd(), 'uploads');
exports.UPLOADS_PREFIX = '/uploads/';
exports.MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
exports.ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
//# sourceMappingURL=uploads.constants.js.map