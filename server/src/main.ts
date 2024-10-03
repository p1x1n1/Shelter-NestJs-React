import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Включаем CORS
   app.enableCors({
    origin: 'http://localhost:3000',  // Указываем разрешённый источник запросов
    credentials: true,  // Если нужны cookie или аутентификационные заголовки
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
  console.log('Server is running on port 3001...');
}
bootstrap();
