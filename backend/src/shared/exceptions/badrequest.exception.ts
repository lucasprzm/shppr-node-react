import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(error_code: string, error_description: string) {
    super(
      {
        error_code,
        error_description,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
