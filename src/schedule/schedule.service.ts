/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 11:18:05
 * @LastEditTime: 2020-06-04 17:37:26
 */ 
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpiderService } from './spider.service';
import { RemindService } from './remind.service';

@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name);
    constructor(
        private readonly spiderService: SpiderService,
        private readonly remindService: RemindService) {}

    @Cron(CronExpression.EVERY_6_HOURS)
    handleCron() {
        this.spiderService.fetchResource();
    }

    @Cron('0 */30 15-16 * * 1-5')
    remindCheckDincan() {
        this.remindService.sendRemind();
    }
}
