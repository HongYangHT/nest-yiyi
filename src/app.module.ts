/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 根module
 * @Date: 2019-11-08 20:51:05
 * @LastEditTime: 2020-05-29 16:45:15
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, EntityManager } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ScheduleCustomModule } from './schedule/schedule.module';
import { TopicModule } from './topic/topic.module';

import { ScheduleModule } from '@nestjs/schedule';

// import { ScheduleModule } from 'nest-schedule';

@Module({
  imports: [TypeOrmModule.forRoot(), ScheduleModule.forRoot(), UserModule, AuthModule, RoleModule, ScheduleCustomModule, TopicModule],
})
export class AppModule {
  constructor(
    private readonly connection: Connection,
    private readonly entityManager: EntityManager,
  ) {}
}
