import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  /** @example "Yangi Data Science kursi ochildi" */
  @IsString()
  @MinLength(5)
  @MaxLength(160)
  title: string;

  /** Bo'sh qoldirilsa sarlavhadan avtomatik yasaladi */
  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug faqat kichik lotin harflari, raqam va '-' dan iborat bo'lishi kerak",
  })
  slug?: string;

  @IsString()
  @MaxLength(300)
  excerpt: string;

  /** Maqola matni (xatboshilar bo'sh qator bilan ajratiladi) */
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  publishedAt?: Date;
}
