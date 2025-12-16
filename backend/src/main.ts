import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
  };

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
