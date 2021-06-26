import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Character, CharacterSchema } from './character.schema';
import { MongooseErrorResolver } from '../mongoose/mongoose-error-resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
    MongooseErrorResolver,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
