import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CharacterDto } from './dto/character.dto';
import { MongooseErrorResolver } from '../mongoose/mongoose-error-resolver';
import { CharactersService } from './characters.service';
import { GetCharactersDto } from './dto/get-characters.dto';
import { ApiCharactersSecurity } from './api-characters-security';
import { CharacterDocument } from './character.schema';

class CharacterEntity extends CharacterDto {
  @ApiProperty()
  _id: string;
}

@ApiCharactersSecurity()
@ApiTags('characters')
@Controller('characters')
export class CharactersController {
  constructor(
    private characterService: CharactersService,
    private mongooseErrorResolver: MongooseErrorResolver,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The character has been successfully created.',
    type: CharacterEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'The character name is not unique.',
  })
  async create(@Body() dto: CharacterDto) {
    try {
      return await this.characterService.create(dto);
    } catch (e) {
      if (this.mongooseErrorResolver.isDuplicateKeyError(e, 'name')) {
        throw new ConflictException('name must be unique');
      }
      throw new InternalServerErrorException();
    }
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
  @ApiResponse({
    status: 409,
    description: 'The character name is not unique.',
  })
  async update(@Param('id') id: string, @Body() dto: CharacterDto) {
    let character: CharacterDocument;
    try {
      character = await this.characterService.update(id, dto);
    } catch (e) {
      if (this.mongooseErrorResolver.isDuplicateKeyError(e, 'name')) {
        throw new ConflictException('name must be unique');
      }
      throw new InternalServerErrorException();
    }
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
