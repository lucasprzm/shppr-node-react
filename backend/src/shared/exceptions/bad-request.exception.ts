import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(error_code?: string, error_description?: string) {
    super(
      {
        error_code: error_code ?? 'INVALID_DATA',
        error_description:
          error_description ??
          'Os dados fornecidos no corpo da requisição são inválidos',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
