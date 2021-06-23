import { Body, Controller, Post } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }
}
