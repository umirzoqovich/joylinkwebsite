import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';

/**
 * Admin panel uchun himoyalangan controller.
 * Barcha yo'llar `/api/admin/<path>` ostida bo'ladi va JWT talab qiladi.
 */
export function AdminController(path: string, tag?: string) {
  return applyDecorators(
    Controller(`admin/${path}`),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiTags(`Admin · ${tag ?? path}`),
  );
}
