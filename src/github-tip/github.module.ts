/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-01 12:15:05
 * @LastEditTime: 2020-07-01 12:17:18
 */ 
import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { MyLoggerService } from '../utils/log';

@Module({
    controllers: [GithubController],
    providers: [MyLoggerService],
})
export class GithubModule {}
