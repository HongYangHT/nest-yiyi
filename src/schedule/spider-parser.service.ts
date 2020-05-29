/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 17:05:13
 * @LastEditTime: 2020-05-29 21:22:51
 */ 
import { Injectable, Logger, ValidationPipe, UsePipes } from '@nestjs/common';
import { TopicDto } from '../topic/topic.dto';
import { Topic } from '../topic/topic.entity';
import cheerio from 'cheerio';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Injectable()
export class SpiderParserService {
    private readonly logger = new Logger(SpiderParserService.name);

    @UsePipes(new ValidationPipe({ transform: true }))
    parser(res: any) {
        const items: TopicDto[] = [];
        const $ = cheerio.load(res.text);
        $('.news-list .news-item').each((idx, ele) => {
            const topic: Topic = new Topic();
            const item: TopicDto = Object.assign(topic, {
                visit: 0,
                title: $(ele).find('.news__item-title').text(),
                content: $(ele).find('.article-excerpt').text(),
                url: 'https://segmentfault.com/' + $(ele).find('.news-img').attr('href'),
                commit: $(ele).find('.author').text(),
            });
            items.push(item);
        });

        return items;
    }
}
