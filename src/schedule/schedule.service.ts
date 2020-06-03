/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 11:18:05
 * @LastEditTime: 2020-06-03 18:24:21
 */ 
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpiderService } from './spider.service';

@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name);
    constructor(
        private readonly spiderService: SpiderService) {}

    @Cron(CronExpression.EVERY_6_HOURS)
    handleCron() {
        this.spiderService.fetchResource();
    }
}
