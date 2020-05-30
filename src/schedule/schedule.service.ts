/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 11:18:05
 * @LastEditTime: 2020-05-30 16:12:53
 */ 
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, ScheduleModule } from '@nestjs/schedule';
import { SpiderService } from './spider.service';

@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name);
    constructor(private readonly spiderService: SpiderService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    handleCron() {
        this.spiderService.fetchResource();
    }
}
