import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docOptions = new DocumentBuilder();
  docOptions.setTitle('Hotel Management');
  docOptions.setDescription('ReST API for managing hotels.');
  docOptions.setVersion('1.0.0');

  const doc = SwaggerModule.createDocument(app, docOptions.build());
  SwaggerModule.setup('doc', app, doc);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
