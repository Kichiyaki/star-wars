import { CharacterDto } from './dto/character.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterEntity extends CharacterDto {
  @ApiProperty()
  _id: string;
}
