import { Test, TestingModule } from '@nestjs/testing';
import { MongoError } from 'mongodb';
import {
  MongoErrorCode,
  MongooseErrorResolver,
} from './mongoose-error-resolver';

export const getDuplicateKeyError = (index = 'none') => {
  const err = new MongoError(
    `MongoError E11000 duplicate key error collection: db.collection index: ${index}_1 dup key: { ${index}: "string" }`,
  );
  err.code = MongoErrorCode.DuplicateKey;
  return err;
};

describe('MongooseErrorResolver', () => {
  let service: MongooseErrorResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseErrorResolver],
    }).compile();

    service = module.get<MongooseErrorResolver>(MongooseErrorResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isDuplicateKeyError', () => {
    it('should return true for valid errors', () => {
      for (let i = 100; i <= 1000; i++) {
        expect(
          service.isDuplicateKeyError(
            getDuplicateKeyError(i.toString()),
            i.toString(),
          ),
        ).toBe(true);
      }
    });

    it(
      'should return false when an error code is different than ' +
        MongoErrorCode.DuplicateKey,
      () => {
        const err = getDuplicateKeyError();
        err.code = 323232;
        expect(service.isDuplicateKeyError(err)).toBe(false);
      },
    );

    it('should return false when an error message doesnt contain index', () => {
      expect(service.isDuplicateKeyError(getDuplicateKeyError(), 'test')).toBe(
        false,
      );
    });
  });
});
