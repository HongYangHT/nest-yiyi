/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 入口文件
 * @Date: 2019-11-08 20:51:05
 * @LastEditTime: 2020-05-18 15:53:12
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Log4jsService } from '@quickts/nestjs-log4js';
import helmet from 'helmet';
// import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import ValidatePipe from './utils/validate.pipe';
import ExceptionsFilter from './utils/exception.filter';
import ResponseInterceptor from './utils/response.interceptor';

async function bootstrap() {
  const logger = new Log4jsService();
  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidatePipe());
  app.use(helmet());
  app.enableCors();
  // app.use(csurf({
  //   cookie: true
  // }));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  // const options = new DocumentBuilder()
  //   .setTitle('yiyi')
  //   .setDescription('The yiyi API Description')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);
  await app.listen(9000);
}
bootstrap();
