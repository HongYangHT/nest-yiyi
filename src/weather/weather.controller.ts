/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-10 17:51:03
 * @LastEditTime: 2020-06-10 19:58:40
 */ 
import { Controller, UseGuards, Get, Query, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { MyLoggerService } from '../utils/log';

@Controller('weather')
@UseGuards(AuthGuard('jwt'))
export class WeatherController {
    constructor(
        private readonly myLoggerService: MyLoggerService,
    ) {}
    @Get('fetch')
    async fetchWeather(@Query() query, @Request() request) {
        const ip = request.headers['X-Real-IP'] ||
        request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
        const result = await axios.get('https://tianqiapi.com/free/day', {
            params: {
                ...query,
                ip,
            },
        });
        this.myLoggerService.write({
            params: {
                ...query,
                ip,
            },
        });
        return result.data;
    }
}
