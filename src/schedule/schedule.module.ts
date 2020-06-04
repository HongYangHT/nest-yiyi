/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 11:28:02
 * @LastEditTime: 2020-06-04 17:12:09
 */ 
import { Module, HttpModule } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SpiderService } from './spider.service';
import { SpiderParserService } from './spider-parser.service';
import { TopicService } from '../topic/topic.service';
import { TopicModule } from '../topic/topic.module';
import { RemindService } from './remind.service';

@Module({
    imports: [ScheduleModule.forRoot(), HttpModule, TopicModule],
    providers: [ScheduleService, SpiderService, SpiderParserService, RemindService],
    exports: [ScheduleService, SpiderService, SpiderParserService, RemindService], // NOTE: 将service抛出，形成共享模块
})
export class ScheduleCustomModule {}
