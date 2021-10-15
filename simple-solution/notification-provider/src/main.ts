if(!process.env.IS_TS_NODE){
  require('module-alias/register');
}
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { from } from 'rxjs';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  console.log(process.env.SENDGRID_API_KEY);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Notification app')
  .setDescription('Notification app work for query app')
  .setVersion('1.0.0')
  .addTag('Free Ton')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)
  app.enableCors();
  await app.listen(5002);
}
bootstrap();
