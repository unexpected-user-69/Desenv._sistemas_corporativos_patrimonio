import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT ?? '3001', 10);
  await app.listen(port);
}

void bootstrap();


