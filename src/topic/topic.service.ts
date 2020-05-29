/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:15
 * @LastEditTime: 2020-05-29 20:54:19
 */ 
import { Topic } from './topic.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorCode } from '../utils/error-code';

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>,
    ) {}

    async create(topic: Topic): Promise<Topic> {
        return await this.topicRepository.save(topic);
    }

    async createMulti(topics: Topic[]): Promise<Topic[]> {
        return await this.topicRepository.save(topics);
    }
}
