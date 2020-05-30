/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 11:28:02
 * @LastEditTime: 2020-05-30 11:55:18
 */ 
import { Module, HttpModule } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SpiderService } from './spider.service';
import { SpiderParserService } from './spider-parser.service';
import { TopicService } from '../topic/topic.service';
import { TopicModule } from '../topic/topic.module';

@Module({
    imports: [ScheduleModule.forRoot(), HttpModule, TopicModule],
    providers: [ScheduleService, SpiderService, SpiderParserService],
    exports: [ScheduleService, SpiderService, SpiderParserService], // NOTE: 将service抛出，形成共享模块
})
export class ScheduleCustomModule {}
