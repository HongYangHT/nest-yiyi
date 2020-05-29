/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 11:18:05
 * @LastEditTime: 2020-05-29 21:28:21
 */ 
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, ScheduleModule } from '@nestjs/schedule';
import { SpiderService } from './spider.service';

@Injectable()
export class ScheduleService {
    private readonly logger = new Logger(ScheduleService.name);
    constructor(private readonly spiderService: SpiderService) {}

    @Cron(CronExpression.EVERY_DAY_AT_11PM)
    handleCron() {
        this.logger.log('Called when the current second is 45');
        this.spiderService.fetchResource();
    }
}
