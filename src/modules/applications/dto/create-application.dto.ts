import { Transform } from 'class-transformer';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateApplicationDto {
  /** @example "Sardor Aliyev" */
  @IsString()
  @MinLength(2, { message: 'Ismingizni kiriting' })
  @MaxLength(80)
  fullName: string;

  /** Bo'sh joy va belgilar avtomatik olib tashlanadi. @example "+998 90 123 45 67" */
  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/[^\d+]/g, '') : value))
  @Matches(/^\+998\d{9}$/, { message: "Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak" })
  phone: string;

  @IsOptional()
  @IsString()
  courseId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
