import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const hostServer = config.get<string>('URL_SERVER');

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const port = 3000;
  app.enableCors({
    origin: '*',
  });

  const options = new DocumentBuilder()
    .setTitle('DSSD API')
    .setDescription('DSSD API')
    .setVersion('1.0')
    .addServer(`${hostServer}/`, 'Local environment')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // Loggins incoming requests
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      if (!req.path.includes('ping')) {
        console.log(
          `🌐 ${req.method} ${req.path} ${res.statusCode} ${
            Date.now() - start
          }ms`,
        );
      }
    });
    next();
  });
  await app.listen(port);
  console.log(`API running on port: ${port}`);
}
bootstrap();
