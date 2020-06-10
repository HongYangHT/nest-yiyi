/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-02 11:15:19
 * @LastEditTime: 2020-06-10 20:11:04
 */ 
// src/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from './logical';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const code = res.statusCode; // 响应状态码
        const ip = req.headers['X-Real-IP'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
        const logFormat = `************************************************************************* \n
        Request original url: ${req.originalUrl}
        Method: ${req.method.toLocaleUpperCase()}
        IP: ${ip}
        Status code: ${code}
        Parmas: ${JSON.stringify(req.params)}
        Query: ${JSON.stringify(req.query)}
        Body: ${JSON.stringify(req.body)} \n ************************************************************************* \n`;
        // 根据状态码，进行日志类型区分
        if (code >= 500) {
            Logger.error(logFormat);
        } else if (code >= 400) {
            Logger.warn(logFormat);
        } else {
            Logger.access(logFormat);
            Logger.log(logFormat);
        }
        next();
    }
}
