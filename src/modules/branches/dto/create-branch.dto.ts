import { IsBoolean, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { OrderableDto } from '../../../common/dto/orderable.dto';

export class CreateBranchDto extends OrderableDto {
  /** @example "Chilonzor filiali" */
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsString()
  @MinLength(5)
  address: string;

  /** Mo'ljal. @example "Novza metro bekati yonida" */
  @IsOptional()
  @IsString()
  landmark?: string;

  /** @example "+998 71 200 00 00" */
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  workingHours?: string;

  /** Google/Yandex xarita havolasi */
  @IsOptional()
  @IsUrl()
  mapUrl?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
