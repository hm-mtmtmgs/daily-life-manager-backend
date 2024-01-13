import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors();

  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Swagger')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(process.env.WEB_PORT || 3000);
}
bootstrap();
