/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 10:24:58
 * @LastEditTime: 2020-06-02 11:28:40
 */
import { Logger } from '@nestjs/common';

export class MyLoggerService {
    private readonly logger = new Logger('MyLoggerService');

    write(error) {
        this.logger.log(error);
    }
}
