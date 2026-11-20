"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const prisma_exception_filter_1 = require("./common/filters/prisma-exception.filter");
const uploads_constants_1 = require("./modules/uploads/uploads.constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
    app.enableCors({ origin: config.getOrThrow('corsOrigins'), credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    app.useStaticAssets(uploads_constants_1.UPLOADS_DIR, { prefix: uploads_constants_1.UPLOADS_PREFIX });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Joylinks API')
        .setDescription('Joylinks IT akademiyasi sayti va admin paneli uchun REST API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    swagger_1.SwaggerModule.setup('api/docs', app, swagger_1.SwaggerModule.createDocument(app, swaggerConfig));
    const port = config.getOrThrow('port');
    await app.listen(port);
    common_1.Logger.log(`🚀 API: http://localhost:${port}/api`, 'Bootstrap');
    common_1.Logger.log(`📚 Swagger: http://localhost:${port}/api/docs`, 'Bootstrap');
}
void bootstrap();
//# sourceMappingURL=main.js.map