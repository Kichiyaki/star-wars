import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import createMongooseModule from './utils/createMongooseModule';

@Module({
  imports: [createMongooseModule(process.env.MONGODB_URI), CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
