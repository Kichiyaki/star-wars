import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CharactersService } from './characters.service';
import { GetCharactersDto } from './dto/get-characters.dto';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  get(@Query() getCharactersDto: GetCharactersDto) {
    return this.characterService.get(getCharactersDto);
  }
}
