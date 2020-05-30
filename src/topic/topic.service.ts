/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:15
 * @LastEditTime: 2020-05-30 16:44:15
 */ 
import { Topic } from './topic.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorCode } from '../utils/error-code';

interface Query {
    page?: number;
    pageSize?: number;
    keyword?: string;
}

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

    async findOne(title: string): Promise<Topic> {
        return await this.topicRepository.findOne({
            title,
        });
    }

    async findAll(query: Query = { page: 1, pageSize: 10 }): Promise<[Topic[], number]> {
        // return await this.topicRepository.findAndCount({
        //     skip: (+query.page - 1) * +query.pageSize,
        //     take: +query.pageSize,
        // });
        if (query.keyword) {
            return await this.topicRepository.createQueryBuilder('topic')
                .where('topic.title like :param')
                .setParameters({
                    param: `%${query.keyword}%`,
                })
                .offset((+query.page - 1) * + query.pageSize)
                .take(+query.pageSize)
                .orderBy('topic.updated', 'DESC')
                .getManyAndCount();
        } else {
            return await this.topicRepository.createQueryBuilder('topic')
                .offset((+query.page - 1) * + query.pageSize)
                .take(+query.pageSize)
                .orderBy('topic.updated', 'DESC')
                .getManyAndCount();
        }
    }
}
