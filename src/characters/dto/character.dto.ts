import { IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterDto {
  @ApiProperty()
  @Length(2, 64)
  name: string;

  @ApiProperty()
  @Length(1, 64, { each: true })
  episodes: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @Length(1, 64)
  planet?: string;
}
