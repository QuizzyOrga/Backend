import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import branchName from 'current-git-branch';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ybook API documentation')
    .setDescription('The Ybook API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({ forbidUnknownValues: false, transform: true }),
  );

  // Enable CORS
  app.enableCors();

  // Gestion des logs
  app.useLogger(app.get(Logger));

  // Gestion des exceptions Prisma
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Listen to the specified port
  await app.listen(PORT, () => {
    Logger.log(
      `Environment → ${process.env.NODE_ENV} | Branch → ${branchName()}`,
    );
    Logger.log(`Swagger Doc → http://localhost:${PORT}/api`);
    Logger.log(` --- Listening at http://localhost:${PORT} ---`);
  });
}

bootstrap();
