/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:58
 * @LastEditTime: 2020-05-30 10:58:23
 */ 
import { Base } from '../base/base.dto';
import { IsString, Length } from 'class-validator';
import { User } from '../user/user.entity';

export class TopicDto extends Base {
    @IsString()
    @Length(1, 20, { message: '文章名不为空' })
    readonly title: string;

    readonly content: string;

    readonly visit: number;

    readonly commit: string;

    readonly url: string;
}
