/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 验证管道
 * @Date: 2019-11-26 16:27:16
 * @LastEditTime: 2019-11-29 18:12:31
 */
import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export default class ValidatePipe implements PipeTransform {
  async transform(value: any, metaData: ArgumentMetadata) {
    const { metatype } = metaData;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints).join(',');
      throw new BadRequestException(message);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Number, Boolean, Array, Object];
    return !types.find(type => metatype === type);
  }
}
