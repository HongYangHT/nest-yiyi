/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 14:51:36
 * @LastEditTime: 2020-05-21 15:29:40
 */ 
import { Base } from '../base/base.dto';
import { IsString, Length } from 'class-validator';
import { User } from '../user/user.entity';

export class RoleDto extends Base {
    @IsString()
    @Length(1, 20, { message: '角色名不能为空' })
    readonly roleName: string;

    readonly users: User[];
}
