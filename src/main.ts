import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.setGlobalPrefix("api");
  // app.use(function (request: Request, response: Response, next: NextFunction) {
  //   response.setHeader('Access-Control-Allow-Origin', 'https://medcabinet-green.vercel.app');
  //   next();
  // });
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  await app.listen(3002);
}
bootstrap();
