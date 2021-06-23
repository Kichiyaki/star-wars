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
import { ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CharacterDto } from './dto/character.dto';
import { CharactersService } from './characters.service';
import { GetCharactersDto } from './dto/get-characters.dto';

class CharacterEntity extends CharacterDto {
  @ApiProperty()
  _id: string;
}

@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The character has been successfully created.',
    type: CharacterEntity,
  })
  async create(@Body() dto: CharacterDto) {
    return await this.characterService.create(dto);
  }

  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: 'The character has been successfully updated.',
    type: CharacterEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Character not found.',
  })
  async update(@Param('id') id: string, @Body() dto: CharacterDto) {
    const character = await this.characterService.update(id, dto);
    if (!character) {
      throw new NotFoundException('character not found');
    }
    return character;
  }

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'The list of characters has been successfully generated.',
    isArray: true,
    type: CharacterEntity,
  })
  async get(@Query() getCharactersDto: GetCharactersDto) {
    return await this.characterService.get(getCharactersDto);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'The character has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Character not found.',
    type: CharacterEntity,
  })
  async delete(@Param('id') id: string) {
    const character = await this.characterService.delete(id);
    if (!character) {
      throw new NotFoundException('character not found');
    }
    return character;
  }
}
