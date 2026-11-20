import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { OrderableDto } from '../../../common/dto/orderable.dto';

export class CreateFaqDto extends OrderableDto {
  /** @example "Kurslar qaysi tilda o'tiladi?" */
  @IsString()
  @MinLength(5)
  @MaxLength(250)
  question: string;

  @IsString()
  @MinLength(5)
  answer: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
