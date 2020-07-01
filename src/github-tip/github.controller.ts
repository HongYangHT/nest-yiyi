/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-01 11:51:02
 * @LastEditTime: 2020-07-01 14:59:35
 */ 
import { Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { MyLoggerService } from '../utils/log';
import { spawn } from 'child_process';
import createHandler from 'github-webhook-handler';

@Controller('github')
export class GithubController {
    constructor(
        private readonly myLoggerService: MyLoggerService,
    ) {}
    @Post('tip')
    async postTip() {
        await new Promise((resolve, reject) => {
            const handler = createHandler({ path: '/api/v1/github/tip', secret: 'Hong@410g' });
            handler.on('error', err => {
                this.myLoggerService.write(`Error: ${ err.message }`);
            });
            handler.on('push', event => {
                this.myLoggerService.write(`Received a push event for %s to %s'
                    ${ event.payload.repository.name }
                    ${ event.payload.ref }`);
                try {
                    const s = spawn('sh', ['./build.sh'], {
                        cwd: `/root/workspace/${event.payload.repository.name}`,
                    });
                    s.stdout.on('data', (data) => {
                        this.myLoggerService.write(`${event.payload.repository.name}: ${data}`);
                    });
                    s.stderr.on('data', (data) => {
                        this.myLoggerService.write(`${event.payload.repository.name}: ${data}`);
                    });
                    this.myLoggerService.write(`${event.payload.repository.name} has rebuild`);
                } catch (e) {
                    this.myLoggerService.write(e);
                }
            });
            handler.on('issues', event => {
                this.myLoggerService.write(`Received an issue event for %s action=%s: #%d %s',
                ${event.payload.repository.name}
                ${event.payload.action}
                ${event.payload.issue.number}
                ${event.payload.issue.title}`);
            });
            resolve();
        });
        return { message: '更新成功' };
    }
}
