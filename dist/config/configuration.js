"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
const REQUIRED_ENV = ['DATABASE_URL', 'JWT_SECRET'];
function validateEnv(env) {
    const missing = REQUIRED_ENV.filter((key) => !env[key]);
    if (missing.length > 0) {
        throw new Error(`Muhit o'zgaruvchilari topilmadi: ${missing.join(', ')}`);
    }
    return env;
}
exports.default = () => ({
    port: Number(process.env.PORT ?? 4000),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    },
});
//# sourceMappingURL=configuration.js.map