/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 入口文件
 * @Date: 2019-11-08 20:51:05
 * @LastEditTime: 2019-11-26 16:31:08
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Log4jsService } from '@quickts/nestjs-log4js';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const logger = new Log4jsService();
  const app = await NestFactory.create(AppModule, { logger });
  app.use(helmet());
  app.enableCors();
  // app.use(csurf({
  //   cookie: true
  // }));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  await app.listen(9000);
}
bootstrap();
