import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(error_code: string, error_description: string) {
    super(
      {
        error_code,
        error_description,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
