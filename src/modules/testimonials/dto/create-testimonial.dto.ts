import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { OrderableDto } from '../../../common/dto/orderable.dto';

export class CreateTestimonialDto extends OrderableDto {
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  fullName: string;

  @IsOptional()
  @IsString()
  photo?: string;

  /** @example "Frontend dasturlash" */
  @IsString()
  courseName: string;

  /** Hozir ishlayotgan kompaniya. @example "EPAM" */
  @IsOptional()
  @IsString()
  workplace?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  text: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
