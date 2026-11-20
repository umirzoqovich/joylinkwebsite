import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/** Ko'p modellarda uchraydigan umumiy maydon: ro'yxatdagi tartib raqami */
export class OrderableDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order?: number;
}
