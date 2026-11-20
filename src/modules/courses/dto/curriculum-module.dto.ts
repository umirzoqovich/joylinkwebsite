import { IsArray, IsString, MinLength } from 'class-validator';

/** O'quv dasturining bitta moduli */
export class CurriculumModuleDto {
  /** @example "HTML va CSS asoslari" */
  @IsString()
  @MinLength(2)
  title: string;

  /** @example ["Semantik teglar", "Flexbox", "Grid"] */
  @IsArray()
  @IsString({ each: true })
  topics: string[];
}
