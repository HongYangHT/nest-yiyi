/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:15
 * @LastEditTime: 2020-06-03 20:09:57
 */ 
import { Topic } from './topic.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Transaction, TransactionManager, EntityManager, TransactionRepository } from 'typeorm';
import { ErrorCode } from '../utils/error-code';
import { User } from '../user/user.entity';

interface Query {
    page?: number;
    pageSize?: number;
    keyword?: string;
    from?: string;
}

interface AuthDto {
    id: string;
    username?: string;
}

interface UpdateVisitDto {
    id: string;
}

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>
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

    async findAll(query: Query = { page: 1, pageSize: 10, from: '' }): Promise<[Topic[], number]> {
        // return await this.topicRepository.findAndCount({
        //     skip: (+query.page - 1) * +query.pageSize,
        //     take: +query.pageSize,
        //     where: {
        //         title: Like(`${query.keyword}`),
        //     },
        // });

        if (query.keyword) {
            return await this.topicRepository.createQueryBuilder('topic')
                .where('topic.title like :param')
                .setParameters({
                    param: `%${query.keyword}%`,
                })
                .andWhere('topic.from = :param or :param=""')
                .setParameters({
                    param: `${query.from}`,
                })
                .offset((+query.page - 1) * +query.pageSize)
                .limit(+query.pageSize)
                .leftJoinAndSelect('topic.users', 'users')
                .orderBy('topic.updated', 'DESC')
                .getManyAndCount();
        } else {
            return await this.topicRepository.createQueryBuilder('topic')
            .andWhere('topic.from = :param or :param=""')
            .setParameters({
                param: `${query.from}`,
            })
            .offset((+query.page - 1) * +query.pageSize)
            .limit(+query.pageSize)
            .leftJoinAndSelect('topic.users', 'users')
            .orderBy('topic.updated', 'DESC')
            .getManyAndCount();
        }
    }

    @Transaction()
    async updateVisit(user: AuthDto, query: UpdateVisitDto, @TransactionManager() manager?: EntityManager): Promise<void> {
        const userId = user.id;
        const topicId = query.id;

        const userItem = await manager.findOne(User, userId);

        const topic = await manager.findOne(Topic, topicId, {
            relations: ['users'],
        });

        if (!userItem || !topic) {
            throw new HttpException({ message: '用户或文章不存在', status: ErrorCode.USER_OR_TOPIC_NOT_FOUND }, HttpStatus.OK);
        }

        topic.users = [...topic.users, userItem];
        topic.visit += 1;
        await manager.save(topic);
        await manager.save(Topic, topic);
    }
}
