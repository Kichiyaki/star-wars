import { IsOptional, Length } from 'class-validator';

export class CreateCharacterDto {
  @Length(2, 64)
  name: string;

  @Length(1, 64, { each: true })
  episodes: string[];

  @IsOptional()
  @Length(1, 64)
  planet?: string;
}
