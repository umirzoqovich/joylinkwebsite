import {
  BadRequestException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { diskStorage } from 'multer';

import { AdminController } from '../../common/decorators/admin-controller.decorator';
import {
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_SIZE,
  UPLOADS_DIR,
  UPLOADS_PREFIX,
} from './uploads.constants';

@AdminController('uploads', 'Fayllar')
export class UploadsController {
  /** Rasm yuklash. Javobda saqlangan faylning nisbiy URL manzili qaytadi. */
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOADS_DIR,
        filename: (_req, file, callback) =>
          callback(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
      }),
      limits: { fileSize: MAX_UPLOAD_SIZE },
      fileFilter: (_req, file, callback) => {
        if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
          return callback(new BadRequestException('Faqat rasm fayllari qabul qilinadi'), false);
        }
        callback(null, true);
      },
    }),
  )
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Fayl tanlanmagan');

    return {
      url: `${UPLOADS_PREFIX}${file.filename}`,
      size: file.size,
      mimeType: file.mimetype,
    };
  }
}
