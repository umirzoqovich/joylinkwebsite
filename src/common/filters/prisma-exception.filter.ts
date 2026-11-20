import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

/**
 * Prisma xatolarini tushunarli HTTP javoblarga aylantiradi.
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { status, message } = this.map(exception);

    response.status(status).json({ statusCode: status, message });
  }

  private map(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2002': {
        const fields = (exception.meta?.target as string[] | undefined)?.join(', ');
        return {
          status: HttpStatus.CONFLICT,
          message: `Bu qiymat allaqachon mavjud${fields ? `: ${fields}` : ''}`,
        };
      }
      case 'P2025':
        return { status: HttpStatus.NOT_FOUND, message: "Ma'lumot topilmadi" };
      case 'P2003':
        return { status: HttpStatus.BAD_REQUEST, message: "Bog'langan ma'lumot topilmadi" };
      default:
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Ma'lumotlar bazasi xatosi" };
    }
  }
}
