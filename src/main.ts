import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.API_PORT ? Number(process.env.API_PORT) : 7300;
  const app = await NestFactory.create(AppModule,  { cors: true });
  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));

  await app.listen(port);
}
bootstrap();
