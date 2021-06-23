import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost/star-wars',
    ),
    CharactersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
