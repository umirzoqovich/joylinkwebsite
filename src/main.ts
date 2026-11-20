import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { UPLOADS_DIR, UPLOADS_PREFIX } from './modules/uploads/uploads.constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  const corsOrigins = config.getOrThrow<string[]>('corsOrigins');
  app.enableCors({
    origin: corsOrigins.includes('*') ? true : corsOrigins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useStaticAssets(UPLOADS_DIR, { prefix: UPLOADS_PREFIX });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Joylinks API')
    .setDescription('Joylinks IT akademiyasi sayti va admin paneli uchun REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = config.getOrThrow<number>('port');
  await app.listen(port, '0.0.0.0');

  Logger.log(`🚀 API: http://localhost:${port}/api`, 'Bootstrap');
  Logger.log(`📚 Swagger: http://localhost:${port}/api/docs`, 'Bootstrap');
}

void bootstrap();
