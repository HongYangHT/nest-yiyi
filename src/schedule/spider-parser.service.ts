/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 17:05:13
 * @LastEditTime: 2020-06-01 09:45:24
 */ 
import { Injectable, Logger, ValidationPipe, UsePipes } from '@nestjs/common';
import { TopicDto } from '../topic/topic.dto';
import { Topic } from '../topic/topic.entity';
import cheerio from 'cheerio';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';
dayjs.extend(utc);

@Injectable()
export class SpiderParserService {
    private readonly logger = new Logger(SpiderParserService.name);

    parser(res: any) {
        const items: TopicDto[] = [];
        const $ = cheerio.load(res.text);
        $('.news-list .news-item').each((idx, ele) => {
            const topic: Topic = new Topic();
            const item: TopicDto = Object.assign(topic, {
                title: $(ele).find('.news__item-title').text().trim(),
                content: $(ele).find('.article-excerpt').text().trim(),
                url: 'https://segmentfault.com' + ($(ele).find('.news-img').attr('href') || $(ele).find('.news__item-info>a').attr('href')),
                commit: $(ele).find('.author').text().trim(),
            });
            items.push(item);
        });

        return items;
    }

    /**
     * 掘金的解析器, 由于掘金是使用ajax返回数据的所以我们使用axios来获取请求
     * @param res any
     */
    async parserJuejin() {
        let items: TopicDto[] = [];
        const result = await axios.post('https://web-api.juejin.im/query', {
            operationName: '',
            query: '',
            variables: {
                tags: [],
                category: '5562b415e4b00c57d9b94ac8',
                first: 20,
                after: '',
                order: 'NEWEST',
            },
            extensions: {
                query: {
                    id: '653b587c5c7c8a00ddf67fc66f989d42',
                },
            },
        }, {
            headers: {
                'X-Agent': 'Juejin/Web',
            },
        });

        const data = (result && result.data && result.data.data
            && result.data.data.articleFeed && result.data.data.articleFeed.items && result.data.data.articleFeed.items.edges) || [];
        items = data.map(n => {
            const topic: Topic = new Topic();
            return Object.assign(topic, {
                title: n.node.title,
                content: '',
                url: n.node.originalUrl,
                commit: n.node.user.username + ' ' + dayjs(n.node.updatedAt).format('MM-DD'),
            });
        });
        return items;
    }

    /**
     * cssTrick 的内容解析
     * @param res any
     */
    async parserCssTrick(res: any) {
        const items: TopicDto[] = [];
        const $ = cheerio.load(res.text);
        $('.articles .article-card').each((idx, ele) => {
            const topic: Topic = new Topic();
            const item: TopicDto = Object.assign(topic, {
                title: $(ele).find('h2 a').text().trim(),
                content: $(ele).find('.article-content').text().trim(),
                url: $(ele).find('h2 a').attr('href'),
                commit: $(ele).find('.article-content-meta .author-name').text().trim()
                    + ' ' + $(ele).find('.article-publication-meta time').text().trim(),
            });
            items.push(item);
        });

        return items;
    }

    /**
     * 知乎外刊
     * @param res any
     */
    async parserZhiHu() {
        let items: TopicDto[] = [];
        const result = await axios.get('https://zhuanlan.zhihu.com/api/columns/FrontendMagazine/articles?limit=20&offset=0');
        const data = (result && result.data && result.data.data) || [];
        items = data.map(n => {
            const topic: Topic = new Topic();
            return Object.assign(topic, {
                title: n.title,
                content: n.content,
                url: n.url,
                commit: n.author.name + ' ' + dayjs(n.updated).format('YYYY-MM-DD'),
            });
        });
        return items;
    }
}
