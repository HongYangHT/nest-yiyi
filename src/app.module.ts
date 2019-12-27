/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 根module
 * @Date: 2019-11-08 20:51:05
 * @LastEditTime: 2019-11-29 17:56:58
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, EntityManager } from 'typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
})
export class AppModule {
  constructor(
    private readonly connection: Connection,
    private readonly entityManager: EntityManager,
  ) {}
}
