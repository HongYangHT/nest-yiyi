/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-04 17:02:38
 * @LastEditTime: 2020-06-08 15:08:05
 */ 
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RemindService {
    private readonly logger = new Logger(RemindService.name);
    async sendRemind() {
        // tslint:disable-next-line:max-line-length
        const result = await axios.post(`https://oapi.dingtalk.com/robot/send?access_token=686a64850d52282f7be11e821fa86fcd9f5d4a90d48bb6d2de540de4fbf2a365`,
        {
            msgtype: 'text',
            text: {
                content: `点餐提醒：@18969136460, 还不点餐，又不想加班嘛？`,
            },
            at: {
                atMobiles: ['18969136460'],
                isAtAll: false,
            },
        }, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        });
        this.logger.log(JSON.stringify(result.data));
    }
}
