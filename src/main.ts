import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // 例外のデフォルトmessageは単文字列
      // しかし、class-validatorのデフォルトmessageは配列のため単文字列に変形してレスポンス型を統一
      exceptionFactory: (errors) =>
        new BadRequestException(
          errors
            .map((error) => error.constraints)
            .map((constraints) => Object.values(constraints))
            .flat(Infinity)
            .join('\n'),
        ),
    }),
  );

  // Swagger
  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Swagger')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
