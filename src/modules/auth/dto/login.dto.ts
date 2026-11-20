import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  /** @example admin@joylinks.uz */
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  email: string;

  /** @example admin12345 */
  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  password: string;
}
