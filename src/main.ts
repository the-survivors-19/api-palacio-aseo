import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { ValidationPipe } from '@nestjs/common';

const informationAPI = {
  name: 'API palacio del aseo',
  description: 'Documentación completa sobre el manejo de la api del proyecto "palacio del aseo", este es el backend oficial que se conecta a la DB del proyecto recibiendo formularios de las distintas plataformas (Escritorio, Web o Móvil).',
  version: '1.0',
  emailContact: 'the19survivors@gmail.com',
  team: 'The Survivors 19'
}


async function bootstrap() {
  const port = parseInt(process.env.PORT) || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle(informationAPI.name)
    .setDescription(informationAPI.description)
    .setVersion(informationAPI.version)
    .setContact(informationAPI.team, null, informationAPI.emailContact)
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  }

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);

  const redocOptions: RedocOptions = {
    title: 'API Palacio del aseo',
    logo: {
      backgroundColor: '#F0F0F0',
      altText: 'Logo Palacio del Aseo'
    },
    hideDownloadButton: true,
    tagGroups: [],
  };

  await RedocModule.setup('api', app, swaggerDocument, redocOptions);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  app.use(cookieParser());
  app.use(csurf({cookie: true}));

  await app.listen(port, async () => {
    console.log(`App in: ${await app.getUrl()}`);
  });
}
bootstrap();
