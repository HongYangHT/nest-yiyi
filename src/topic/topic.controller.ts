/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:35
 * @LastEditTime: 2020-06-02 14:36:05
 */ 
import { Controller, UseGuards, Request, Res, Post, Get, Body, Query, ValidationPipe, UsePipes, HttpStatus } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicDto } from './topic.dto';
import { AuthGuard } from '@nestjs/passport';
import { Topic } from './topic.entity';
import { classToPlain, plainToClass } from 'class-transformer';

@Controller('topic')
@UseGuards(AuthGuard('jwt'))
export class TopicController {
    constructor(
        private readonly topicService: TopicService,
    ) {}

    @Post('add')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() topicDto: TopicDto) {
        const topic: Topic = await this.topicService.create(topicDto);

        return {
            topic: classToPlain(topic),
        };
    }

    @Get('fetch')
    @UsePipes(new ValidationPipe({ transform: true }))
    async fetchTopic(@Query() query) {
        const topics: [Topic[], number] = await this.topicService.findAll(query);

        return {
            topics: classToPlain(topics[0]),
            count: classToPlain(topics[1]),
        };
    }

    @Get('update/visit')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateVisit(@Request() req, @Query() query) {
        const user = req.user;
        await this.topicService.updateVisit(user, query);
        return {};
    }
}
