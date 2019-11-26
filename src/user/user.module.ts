/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user module
 * @Date: 2019-11-08 23:19:10
 * @LastEditTime: 2019-11-25 20:40:10
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // NOTE: 将service抛出，形成共享模块
})
export class UserModule {}
