/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-10 17:50:40
 * @LastEditTime: 2020-06-10 17:52:56
 */ 
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';

@Module({
    controllers: [WeatherController],
})
export class WeatherModule {}
