/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 根module
 * @Date: 2019-11-08 20:51:05
 * @LastEditTime: 2020-07-03 11:56:02
 */
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, EntityManager } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ScheduleCustomModule } from './schedule/schedule.module';
import { TopicModule } from './topic/topic.module';
import { FileModule } from './file/file.module';
import { WeatherModule } from './weather/weather.module';
import { DingdingModule } from './dingding/dingding.module';
import { GithubModule } from './github-tip/github.module';
import { AuthorModule } from './author/author.module';
import { ResumeModule } from './resume/resume.module';
import { EducationModule } from './education/education.module';

// NOTE: 定时任务
import { ScheduleModule } from '@nestjs/schedule';
// NOTE: 队列
// import { BullModule } from '@nestjs/bull';
import { LoggerMiddleware } from './utils/log-middleware';

import { MyLoggerService } from './utils/log';

import { RolesGuard } from './utils/role.guard';

@Module({
  imports: [TypeOrmModule.forRoot(), ScheduleModule.forRoot(),
  /* BullModule.registerQueue({
    name: 'yiyi',
    redis: {
      host: 'http://119.23.214.172',
      port: 6379,
    },
  }), */
  UserModule,
  AuthModule,
  RoleModule,
  ScheduleCustomModule,
  TopicModule,
  FileModule,
  WeatherModule,
  DingdingModule,
  GithubModule,
  AuthorModule,
  ResumeModule,
  EducationModule,
],
  providers: [MyLoggerService, RolesGuard],
  exports: [MyLoggerService],
})
export class ApplicationModule implements NestModule {
  constructor(
    private readonly connection: Connection,
    private readonly entityManager: EntityManager,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
