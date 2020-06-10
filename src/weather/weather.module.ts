/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-10 17:50:40
 * @LastEditTime: 2020-06-10 19:57:37
 */ 
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { MyLoggerService } from '../utils/log';

@Module({
    controllers: [WeatherController],
    providers: [MyLoggerService],
})
export class WeatherModule {}
