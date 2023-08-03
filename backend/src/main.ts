import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The «Fitness account» service')
    .setDescription('Fitness account service API')
    .setVersion('1.0')
    .build();
  const globalPrefix = 'api';
  const document = SwaggerModule.createDocument(app, config);
  const port = process.env.PORT || 3333;

  app.setGlobalPrefix(globalPrefix);
  SwaggerModule.setup('spec', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
