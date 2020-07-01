/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-01 12:15:05
 * @LastEditTime: 2020-07-01 18:07:22
 */ 
import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { MyLoggerService } from '../utils/log';
import { GithubService } from './github.service';

@Module({
    controllers: [GithubController],
    providers: [MyLoggerService, GithubService],
    exports: [GithubService],
})
export class GithubModule {}
