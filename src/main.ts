import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const docOptions = new DocumentBuilder();
  docOptions.setTitle('Hotel Management');
  docOptions.setDescription('ReST API for managing hotels.');
  docOptions.setVersion('1.0.0');
  docOptions.addBearerAuth();

  const doc = SwaggerModule.createDocument(app, docOptions.build());
  SwaggerModule.setup('doc', app, doc);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
