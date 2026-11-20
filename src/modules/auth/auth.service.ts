import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

const PUBLIC_ADMIN_FIELDS = { id: true, email: true, name: true, createdAt: true } as const;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const admin = await this.prisma.admin.findUnique({ where: { email: email.toLowerCase() } });
    const isValid = admin && (await bcrypt.compare(password, admin.password));

    if (!admin || !isValid) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const payload: JwtPayload = { sub: admin.id, email: admin.email };

    return {
      accessToken: await this.jwt.signAsync(payload),
      admin: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  async getProfile(id: string) {
    const admin = await this.prisma.admin.findUnique({ where: { id }, select: PUBLIC_ADMIN_FIELDS });
    if (!admin) throw new NotFoundException('Admin topilmadi');
    return admin;
  }

  async setupInitialAdmin() {
    const p1 = await bcrypt.hash('admin12345', 10);
    const p2 = await bcrypt.hash('j12345678', 10);

    await this.prisma.admin.upsert({
      where: { email: 'admin@joylinks.uz' },
      update: { password: p1 },
      create: { email: 'admin@joylinks.uz', password: p1, name: 'Admin' },
    });

    await this.prisma.admin.upsert({
      where: { email: 'arolovrefatbek@gmail.com' },
      update: { password: p2 },
      create: { email: 'arolovrefatbek@gmail.com', password: p2, name: 'Joylinks Admin' },
    });

    return {
      success: true,
      message: 'Admin hisoblari muvaffaqiyatli yaratildi!',
      accounts: [
        { email: 'admin@joylinks.uz', password: 'admin12345' },
        { email: 'arolovrefatbek@gmail.com', password: 'j12345678' },
      ],
    };
  }
}
