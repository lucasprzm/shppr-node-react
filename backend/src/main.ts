import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';
import { AppModule } from './app.module';
import { CustomHttpExceptionFilter } from './common/filters/custom-http-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

configDotenv({ path: '../.env' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new CustomHttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  // TODO - Melhorar a documentação da API
  // TODO - Validar tudo que fiz até agora
  const config = new DocumentBuilder()
    .setTitle('Taxi App API')
    .setDescription('The Taxi App API description')
    .setVersion('1.0')
    .addTag('taxi')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
