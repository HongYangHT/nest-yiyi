/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-17 09:52:33
 * @LastEditTime: 2020-06-17 11:50:56
 */ 
import { Controller, Get, Post, Body, Query, Res, HttpStatus } from '@nestjs/common';
import { MyLoggerService } from '../utils/log';
@Controller('dingding')
export class DingdingController {
    constructor(
        private readonly myLoggerService: MyLoggerService,
    ) {}
    @Post('tip')
    async setVoice(@Res() res, @Body() body) {
        this.myLoggerService.write(body);
        res.status(HttpStatus.OK).send({
            code: 0,
            message: 'ok',
            data: {
                tipText: '取餐成功',
                tipSpeech: '1号洪阳取餐成功',
                openDoor: 0,
            },
        });
    }
}
