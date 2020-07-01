/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-17 09:52:33
 * @LastEditTime: 2020-06-18 17:05:25
 */ 
import { Controller, Get, Post, Body, Query, Res, Request, HttpStatus, UseGuards } from '@nestjs/common';
import { MyLoggerService } from '../utils/log';
import { Roles } from '../utils/role.derector';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../utils/role.guard';
@Controller('dingding')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DingdingController {
    constructor(
        private readonly myLoggerService: MyLoggerService,
    ) {}
    @Post('tip')
    @Roles('admin')
    async setVoice(@Res() res, @Request() req, @Body() body) {
        this.myLoggerService.write(body);
        this.myLoggerService.write(req.user);
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
