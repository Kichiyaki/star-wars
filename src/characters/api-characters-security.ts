import { applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

export const ApiCharactersSecurity = () => {
  if (!process.env.BASIC_AUTH_ENABLED) {
    return applyDecorators();
  }
  return applyDecorators(ApiSecurity('basic'));
};
