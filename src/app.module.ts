import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { CustomMongooseModule } from './mongoose/mongoose.module';

@Module({
  imports: [CharactersModule, CustomMongooseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
