/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-10 17:51:03
 * @LastEditTime: 2020-07-03 16:35:51
 */ 
import { Controller, UseGuards, Get, Query, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { MyLoggerService } from '../utils/log';
import {query} from 'express';

@Controller('weather')
// @UseGuards(AuthGuard('jwt'))
export class WeatherController {
    constructor(
        private readonly myLoggerService: MyLoggerService,
    ) {}
    @Get('fetch')
    async fetchWeather(@Query() q, @Request() request) {
        const ip = request.headers['X-Real-IP'] ||
        request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
        const result = await axios.get('https://tianqiapi.com/free/day', {
            params: {
                ...q,
                ip,
            },
        });
        this.myLoggerService.write({
            params: {
                ...q,
                ip,
            },
        });
        return result.data;
    }

    /**
     * 转发进制数据的接口
     * @param query 
     * @param request 
     */
    @Get('fetch/area')
    async fetchProvinces(@Query() q, @Request() request) {
        const { province, city } = q;
        let result;
        if (province) {
            result = await axios.get('https://api.binstd.com/area/city', {
                params: {
                    ...q,
                    parentid: q.province,
                },
            });
        } else if (city) {
            result = await axios.get('https://api.binstd.com/area/town', {
                params: {
                    ...q,
                    parentid: q.city,
                },
            });
        } else {
            result = await axios.get('https://api.binstd.com/area/province', {
                params: {
                    ...q,
                },
            });
        }
        this.myLoggerService.write({
            params: {
                ...q,
            },
        });

        return result.data && result.data.result;
    }
}
