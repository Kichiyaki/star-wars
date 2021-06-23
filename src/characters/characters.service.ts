import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Character, CharacterDocument } from './character.schema';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  async create(dto: CreateCharacterDto) {
    const createdCharacter = new this.characterModel(dto);
    return createdCharacter.save();
  }
}
