import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { SwaggerHelper } from './common/helper/swagger.helper';
import { CommonConfigService } from './config/database/configuration.service';
import { AppModule } from './modules/app.module';
import {PassportModule} from "@nestjs/passport";

const environment = process.env.NODE_ENV ?? '';

dotenv.config({ path: `environments/${environment}.env` });

async function start() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appConfig: CommonConfigService = app.get(CommonConfigService);
  const config = new DocumentBuilder()
    .setTitle('Car Sales Platform API')
    .setDescription('API for managing carPost sales on our platform.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.app_port, () =>
    Logger.log('http://localhost:3000/api', 'Server is working'),
  );
}
void start();
