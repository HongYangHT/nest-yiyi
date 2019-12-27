/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user dto
 * @Date: 2019-11-08 23:01:16
 * @LastEditTime: 2019-11-29 18:11:35
 */
import { Base } from '../base/base.dto';
import { IsString, Length } from 'class-validator';
export class UserDto extends Base {
  @IsString({ message: '用户名必须为字符串' })
  @Length(1, 20, { message: '用户名不能为空' })
  readonly username: string;

  @IsString({ message: '用户昵称必须为字符串' })
  @Length(1, 20, { message: '用户昵称不能为空' })
  readonly nickName: string;

  @IsString({ message: '用户密码必须为字符串' })
  @Length(6, 20, { message: '密码长度请设置6-20的字符', context: { errorCode: 400, developerNote: '密码长度请设置6-20的字符' } })
  readonly password: string;
}
