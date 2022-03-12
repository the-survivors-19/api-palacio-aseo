import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = parseInt(process.env.PORT) || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  app.use(cookieParser());
  app.use(csurf());
  await app.listen(port, () => {
    console.log(`Listening in port: ${port}`);
  });
}
bootstrap();
