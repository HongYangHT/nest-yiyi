/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 09:53:45
 * @LastEditTime: 2020-05-21 09:57:40
 */
import { IsString } from 'class-validator';
export class AuthGithub {
    @IsString({ message: 'Code值不能为空' })
    readonly code: string;

    @IsString({ message: 'Client_id值不能为空'})
    // tslint:disable-next-line:variable-name
    readonly client_id: string;
}
