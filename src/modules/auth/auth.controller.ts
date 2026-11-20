import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { CurrentAdmin } from './decorators/current-admin.decorator';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedAdmin } from './strategies/jwt.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Admin panelga kirish */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /** Adminlarni yaratish / tiklash */
  @Get('setup')
  setup() {
    return this.authService.setupInitialAdmin();
  }

  /** Joriy admin ma'lumotlari */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@CurrentAdmin() admin: AuthenticatedAdmin) {
    return this.authService.getProfile(admin.id);
  }
}
