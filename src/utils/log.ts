/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 10:24:58
 * @LastEditTime: 2020-05-21 10:47:31
 */ 
import { Logger } from '@nestjs/common';
import { Log4jsService } from '@quickts/nestjs-log4js';

export class MyLoggerService {
    private readonly logger = new Logger('MyLoggerService');

    write(error) {
        this.logger.log(error);
    }
}
