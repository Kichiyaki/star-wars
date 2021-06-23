import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character, CharacterDocument } from './character.schema';
import { GetCharactersDto, MAX_LIMIT } from './dto/get-characters.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async create(dto: CreateCharacterDto) {
    return new this.characterModel(dto).save();
  }

  async get(dto: GetCharactersDto) {
    let offset = parseInt(dto.offset);
    if (isNaN(offset)) {
      offset = 0;
    }
    let limit = parseInt(dto.limit);
    if (isNaN(limit)) {
      limit = MAX_LIMIT;
    }
    return this.characterModel.find().skip(offset).limit(limit);
  }
}
