import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { CustomMongooseModule } from './mongoose/mongoose.module';

@Module({
  imports: [CustomMongooseModule, CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
