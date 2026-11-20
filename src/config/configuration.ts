export interface AppConfig {
  port: number;
  nodeEnv: string;
  corsOrigins: string[];
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

const REQUIRED_ENV = ['DATABASE_URL', 'JWT_SECRET'] as const;

export function validateEnv(env: Record<string, unknown>) {
  const missing = REQUIRED_ENV.filter((key) => !env[key]);
  if (missing.length > 0) {
    throw new Error(`Muhit o'zgaruvchilari topilmadi: ${missing.join(', ')}`);
  }
  return env;
}

export default (): AppConfig => ({
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  },
});
