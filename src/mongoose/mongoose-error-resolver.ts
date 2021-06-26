import { Injectable } from '@nestjs/common';
import { MongoError } from 'mongodb';

export enum MongoErrorCode {
  DuplicateKey = 11000,
}

@Injectable()
export class MongooseErrorResolver {
  public isDuplicateKeyError(e: any, index?: string) {
    return (
      e instanceof MongoError &&
      e.code === MongoErrorCode.DuplicateKey &&
      (!index || e.message.includes(`index: ${index}_`))
    );
  }
}
