/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:51:42
 * @LastEditTime: 2020-05-30 16:07:47
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

    async fetchResource() {
        // NOTE: 前端模块
        superagent.get('https://segmentfault.com/channel/frontend').end(async (err, res) => {
            if (err) {
                this.logger.log(`内容抓取失败 - ${err}`);
            } else {
                // tslint:disable-next-line:no-shadowed-variable
                const result: TopicDto[] = this.spiderParserService.parser(res);

                result.forEach(async (element: TopicDto) => {
                    const item = await this.topicService.findOne(element.title);
                    if (item) {
                        const saveItem = Object.assign(item, element);
                        const topic = await this.topicService.create(saveItem);
                    } else {
                        const topic = await this.topicService.create(element);
                    }
                });
            }
        });

        // NOTE: 小程序模块
        superagent.get('https://segmentfault.com/channel/miniprogram').end(async (err, res) => {
            if (err) {
                this.logger.log(`内容抓取失败 - ${err}`);
            } else {
                // tslint:disable-next-line:no-shadowed-variable
                const result: TopicDto[] = this.spiderParserService.parser(res);
                result.forEach(async (element: TopicDto) => {
                    const item = await this.topicService.findOne(element.title);
                    if (item) {
                        const saveItem = Object.assign(item, element);
                        const topic = await this.topicService.create(saveItem);
                    } else {
                        const topic = await this.topicService.create(element);
                    }
                });
            }
        });

        // NOTE: 掘金的前端模块
        const result: TopicDto[] = await this.spiderParserService.parserJuejin();
        result.forEach(async (element: TopicDto) => {
            const item = await this.topicService.findOne(element.title);
            if (item) {
                const saveItem = Object.assign(item, element);
                const topic = await this.topicService.create(saveItem);
            } else {
                const topic = await this.topicService.create(element);
            }
        });

        // NOTE: css-tricks
        superagent.get('https://css-tricks.com/archives').end(async (err, res) => {
            if (err) {
                this.logger.log(`内容抓取失败 - ${err}`);
            } else {
                // tslint:disable-next-line:no-shadowed-variable
                const result: TopicDto[] = await this.spiderParserService.parserCssTrick(res);
                result.forEach(async (element: TopicDto) => {
                    const item = await this.topicService.findOne(element.title);
                    if (item) {
                        const saveItem = Object.assign(item, element);
                        const topic = await this.topicService.create(saveItem);
                    } else {
                        const topic = await this.topicService.create(element);
                    }
                });
            }
        });

        // NOTE: 知乎外刊
        const zhihu: TopicDto[] = await this.spiderParserService.parserZhiHu();
        zhihu.forEach(async (element: TopicDto) => {
            const item = await this.topicService.findOne(element.title);
            if (item) {
                const saveItem = Object.assign(item, element);
                const topic = await this.topicService.create(saveItem);
            } else {
                const topic = await this.topicService.create(element);
            }
        });
    }
}
