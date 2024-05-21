import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: "*",
    methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Bearer, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method',
    optionsSuccessStatus: 200,
    credentials: true,

  } });
  // app.enableCors();
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
