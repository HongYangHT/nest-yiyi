/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-01 11:51:02
 * @LastEditTime: 2020-07-02 10:48:53
 */ 
import { Controller, Post, Res, Req, HttpStatus } from '@nestjs/common';
import { MyLoggerService } from '../utils/log';
import { spawn } from 'child_process';
import createHandler from 'github-webhook-handler';
import { Logger } from '../utils/logical';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
    constructor(
        private readonly myLoggerService: MyLoggerService,
        private readonly githubService: GithubService,
    ) {}
    @Post('tip')
    postTip(@Res() res, @Req() req) {
        const { headers } = req;
        const delivery = headers['x-github-delivery'];
        const signature = headers['x-hub-signature'];
        const event = headers['x-github-event'];
        const ua = headers['user-agent'];
        const { repository } = req.body;
        if (event === 'ping') {
            res.status(204);
            res.end();
            return;
        }
        if (!delivery || !signature || !event || !ua.includes('GitHub-Hookshot')) {
            throw new Error('no Auth');
        }

        if (!this.githubService.verify('Hong@410g', req.body, signature)) { // 校验参数失败
            throw new Error('no Auth');
        }

        Logger.info('验证成功，准备打包部署');
        if (event === 'push') {
            this.githubService.deploy(repository.name);
        }
        res.status(HttpStatus.OK).send({
            code: 0,
            message: 'ok',
            data: {
                message: '更新成功',
            },
        });
    }
}
