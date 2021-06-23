import { MongooseModule } from '@nestjs/mongoose';

const createMongooseModule = (uri?: string) => {
  return MongooseModule.forRoot(uri ?? 'mongodb://localhost/star-wars', {
    useCreateIndex: true,
    useFindAndModify: true,
  });
};

export default createMongooseModule;
