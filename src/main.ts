import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: "https://medcabinet-green.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });
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
