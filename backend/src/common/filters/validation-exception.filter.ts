import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorLog = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    const errorResponse = {
      error_code: 'BAD_REQUEST',
      error_description: 'Requisição inválida',
    };

    if (
      request.url.includes('ride/estimate') ||
      request.url.includes('ride/confirm')
    ) {
      errorResponse['error_code'] = 'INVALID_DATA';
      errorResponse['error_description'] =
        'Os dados fornecidos no corpo da requisição são inválidos';
    } else if (request.url.includes('ride') && request.method === 'GET') {
      errorResponse['error_code'] = 'INVALID_DRIVER';
      errorResponse['error_description'] = 'Motorista inválido';
    }
    this.logger.error(
      `Error Info: ${JSON.stringify(errorLog)}, Message: ${JSON.stringify(errorResponse)}`,
      exception.stack,
    );
    response.status(status).json(errorResponse);
  }
}
