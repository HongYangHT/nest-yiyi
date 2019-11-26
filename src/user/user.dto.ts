/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user dto
 * @Date: 2019-11-08 23:01:16
 * @LastEditTime: 2019-11-26 18:59:25
 */
import { Base } from '../base/base.dto';
import { IsString } from 'class-validator';
export class UserDto extends Base {
  @IsString()
  readonly username: string;
  @IsString()
  readonly nickName: string;
  @IsString()
  readonly password: string;
}
