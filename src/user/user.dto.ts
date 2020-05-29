/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user dto
 * @Date: 2019-11-08 23:01:16
 * @LastEditTime: 2020-05-28 19:51:32
 */
import { Base } from '../base/base.dto';
import { IsString, Length, Validate } from 'class-validator';
import { Role } from '../role/role.entity';
import { ErrorCode } from '../utils/error-code';
export class UserDto extends Base {
  @IsString()
  @Length(1, 20, {
      message: '用户名不能为空',
      context: {
        errorCode: 1003,
        developerNote: ErrorCode.USERNAME_IS_EMPTY,
      },
    },
  )
  @Validate(value => {
    const phone = /^1[0-9]{10}/;
    const email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/;
    return phone.test(value) || email.test(value);
  })
  readonly username: string;

  @IsString()
  readonly nickName: string;

  @IsString()
  @Length(6, 20, { message: '密码长度请设置6-20的字符', context: { errorCode: 400, developerNote: '密码长度请设置6-20的字符' } })
  readonly password: string;

  readonly roles: Role[];

  readonly avatar: string;
  readonly from: string;
}
