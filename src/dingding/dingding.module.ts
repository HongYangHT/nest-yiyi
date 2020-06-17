/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-17 09:49:56
 * @LastEditTime: 2020-06-17 10:09:46
 */ 
import { Module } from '@nestjs/common';
import { DingdingController } from './dingding.controller';
import { MyLoggerService } from '../utils/log';

@Module({
    controllers: [DingdingController],
    providers: [MyLoggerService],
})
export class DingdingModule {}
