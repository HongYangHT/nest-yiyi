/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description:
 * @Date: 2019-11-30 20:57:22
 * @LastEditTime: 2019-11-30 21:13:41
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
}

@Injectable()
export default class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: Observable<T>,
  ): Observable<Response<T>> {
    return next.pipe(
      map(rawData => {
        return {
          data: rawData,
          status: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
