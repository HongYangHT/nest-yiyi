/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:25
 * @LastEditTime: 2020-05-29 16:44:47
 */ 
import { Module } from '@nestjs/common';
import { Topic } from './topic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Topic])],
    controllers: [TopicController],
    providers: [TopicService],
    exports: [TopicService],
})
export class TopicModule {}
