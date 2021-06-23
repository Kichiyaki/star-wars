import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CharacterDto } from './dto/character.dto';
import { CharactersService } from './characters.service';
import { GetCharactersDto } from './dto/get-characters.dto';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Post()
  async create(@Body() dto: CharacterDto) {
    return {
      character: await this.characterService.create(dto),
    };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: CharacterDto) {
    return {
      character: await this.characterService.update(id, dto),
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
