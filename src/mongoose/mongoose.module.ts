import { Global, Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { MongooseErrorResolver } from './mongoose-error-resolver';

const DEFAULT_URI = 'mongodb://localhost/star-wars';

@Global()
@Module({
  imports: [
    NestMongooseModule.forRoot(process.env.MONGODB_URI ?? DEFAULT_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  ],
  providers: [MongooseErrorResolver],
  exports: [MongooseErrorResolver],
})
export class CustomMongooseModule {}
