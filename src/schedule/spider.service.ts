/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:51:42
 * @LastEditTime: 2020-05-29 21:10:36
 */ 
import { Injectable, Logger } from '@nestjs/common';
import { SpiderParserService } from './spider-parser.service';
import { TopicService } from '../topic/topic.service';
import { TopicDto } from '../topic/topic.dto';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';

import superagent from 'superagent';

@Injectable()
export class SpiderService {
    private readonly logger = new Logger(SpiderService.name);
    constructor(
        private readonly spiderParserService: SpiderParserService,
        private readonly topicService: TopicService) {}

    fetchResource() {
        superagent.get('https://segmentfault.com/channel/frontend').end(async (err, res) => {
            if (err) {
                this.logger.log(`内容抓取失败 - ${err}`);
            } else {
                const result: TopicDto[] = this.spiderParserService.parser(res);
                const topics = await this.topicService.createMulti(result);
                this.logger.log(topics);
            }
        });
    }
}
