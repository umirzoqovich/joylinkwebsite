import { ApplicationStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateApplicationDto {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  /** Admin uchun ichki izoh */
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}
