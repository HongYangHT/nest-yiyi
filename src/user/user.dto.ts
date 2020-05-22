/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user dto
 * @Date: 2019-11-08 23:01:16
 * @LastEditTime: 2020-05-21 15:30:13
 */
import { Base } from '../base/base.dto';
import { IsString, Length } from 'class-validator';
import { Role } from '../role/role.entity';
export class UserDto extends Base {
  @IsString()
  @Length(1, 20, { message: '用户名不能为空' })
  readonly username: string;

  @IsString()
  @Length(0, 20, { message: '用户昵称不能为空' })
  readonly nickName: string;

  @IsString()
  @Length(6, 20, { message: '密码长度请设置6-20的字符', context: { errorCode: 400, developerNote: '密码长度请设置6-20的字符' } })
  readonly password: string;

  readonly roles: Role[];
}
