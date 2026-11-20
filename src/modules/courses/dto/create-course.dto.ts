import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CourseFormat, CourseLevel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { OrderableDto } from '../../../common/dto/orderable.dto';
import { CurriculumModuleDto } from './curriculum-module.dto';

export class CreateCourseDto extends OrderableDto {
  /** @example "Frontend dasturlash" */
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  title: string;

  /** Bo'sh qoldirilsa sarlavhadan avtomatik yasaladi */
  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug faqat kichik lotin harflari, raqam va '-' dan iborat bo'lishi kerak",
  })
  slug?: string;

  @IsString()
  @MaxLength(240)
  shortDescription: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  /** lucide-react ikonka nomi. @example "code" */
  @IsOptional()
  @IsString()
  icon?: string;

  /** @example "#5b5bf7" */
  @IsOptional()
  @IsHexColor()
  color?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(36)
  durationMonths: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(7)
  lessonsPerWeek?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(8)
  lessonHours?: number;

  /** Oylik narx (so'mda) */
  @Type(() => Number)
  @IsInt()
  @Min(0)
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  oldPrice?: number | null;

  @IsOptional()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @IsOptional()
  @IsEnum(CourseFormat)
  format?: CourseFormat;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @IsString({ each: true })
  skills?: string[];

  /**
   * Swagger CLI plagini ichki DTO uchun absolyut yo'l yozadi va u kirillcha papka
   * nomlarida buziladi. Shu sabab maydon plagindan yashirilib, qo'lda hujjatlanadi.
   */
  @ApiHideProperty()
  @ApiProperty({ type: [CurriculumModuleDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CurriculumModuleDto)
  curriculum?: CurriculumModuleDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mentorIds?: string[];

  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
