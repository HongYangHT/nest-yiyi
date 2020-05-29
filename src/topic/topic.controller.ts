/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:35
 * @LastEditTime: 2020-05-29 16:43:56
 */ 
import { Controller, UseGuards, Res, Post, Body, ValidationPipe, UsePipes, HttpStatus } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDto } from './topic.dto';
import { Topic } from './topic.entity';
import { classToPlain, plainToClass } from 'class-transformer';

@Controller('topic')
export class TopicController {
    constructor(
        private readonly topicService: TopicService,
    ) {}

    @Post('add')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Res() res, @Body() topicDto: TopicDto) {
        const topic: Topic = await this.topicService.create(topicDto);

        res.status(HttpStatus.OK).send({
            status: HttpStatus.OK,
            success: '请求完成',
            data: {
                topic: classToPlain(topic),
            },
        });
    }
}
