import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { auth } from 'express-openid-connect';
import { auth0Config } from './config/auth0Config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  setupSwagger(app);

  app.use(auth(auth0Config));

  await app.listen(3000);
}
bootstrap();
