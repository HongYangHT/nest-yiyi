/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 09:53:45
 * @LastEditTime: 2020-05-21 14:56:05
 */
import { IsString, Length } from 'class-validator';
export class AuthGithub {
    @IsString()
    @Length(1, 160, { message: 'Code值不能为空' })
    readonly code: string;

    @IsString()
    @Length(1, 160, { message: 'Client_id值不能为空' })
    // tslint:disable-next-line:variable-name
    readonly client_id: string;
}
