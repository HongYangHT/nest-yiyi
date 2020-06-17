/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-17 09:52:33
 * @LastEditTime: 2020-06-17 10:00:23
 */ 
import { Controller, Post, Body } from '@nestjs/common';
import { MyLoggerService } from '../utils/log';
@Controller('dingding')
export class DingdingController {
    constructor(
        private readonly myLoggerService: MyLoggerService,
    ) {}
    @Post('tip')
    async setVoice(@Body() body) {
        this.myLoggerService.write(body);
        return {
            tipText: '取餐成功',
            tipSpeech: '1号洪阳取餐成功',
            openDoor: 0,
        };
    }
}
