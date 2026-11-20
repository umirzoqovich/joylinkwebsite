import { join } from 'node:path';

export const UPLOADS_DIR = join(process.cwd(), 'uploads');
export const UPLOADS_PREFIX = '/uploads/';

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
