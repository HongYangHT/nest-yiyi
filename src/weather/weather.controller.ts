/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-10 17:51:03
 * @LastEditTime: 2020-06-10 18:02:26
 */ 
import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';

@Controller('weather')
@UseGuards(AuthGuard('jwt'))
export class WeatherController {
    @Get('fetch')
    async fetchWeather(@Query() query) {
        const result = await axios.get('https://tianqiapi.com/free/day', {
            params: {
                ...query,
            },
        });

        return result.data;
    }
}
