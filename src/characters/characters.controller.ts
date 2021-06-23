import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CharactersService } from './characters.service';
import { GetCharactersDto } from './dto/get-characters.dto';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    return {
      character: await this.characterService.create(createCharacterDto),
    };
  }

  @Get()
  async get(@Query() getCharactersDto: GetCharactersDto) {
    return {
      characters: await this.characterService.get(getCharactersDto),
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const character = await this.characterService.delete(id);
    if (!character) {
      throw new NotFoundException('character not found');
    }
    return {
      character,
    };
  }
}
