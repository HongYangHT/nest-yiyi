/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2019-11-30 20:57:22
 * @LastEditTime: 2020-06-10 20:11:49
 */
import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from './logical';

interface Response<T> {
  data: T;
}

@Injectable()
export default class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
    intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(rawData => {
        const req = context.getArgByIndex(1).req;
        const ip = req.headers['X-Real-IP'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        const logFormat = `************************************************************************* \n
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${ip}
        User: \n ${JSON.stringify(req.user)} \n
        Response data: \n ${JSON.stringify(rawData)} \n ************************************************************************* \n`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return {
          data: rawData,
          status: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
