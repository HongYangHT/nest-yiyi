/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 根module
 * @Date: 2019-11-08 20:51:05
 * @LastEditTime: 2020-06-02 10:44:36
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, EntityManager } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ScheduleCustomModule } from './schedule/schedule.module';
import { TopicModule } from './topic/topic.module';

// NOTE: 定时任务
import { ScheduleModule } from '@nestjs/schedule';
// NOTE: 队列
// import { BullModule } from '@nestjs/bull';

@Module({
  imports: [TypeOrmModule.forRoot(), ScheduleModule.forRoot(),
    /* BullModule.registerQueue({
      name: 'yiyi',
      redis: {
        host: 'http://119.23.214.172',
        port: 6379,
      },
    }), */ UserModule, AuthModule, RoleModule, ScheduleCustomModule, TopicModule],
})
export class AppModule {
  constructor(
    private readonly connection: Connection,
    private readonly entityManager: EntityManager,
  ) {}
}
