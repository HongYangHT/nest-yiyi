/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:16:58
 * @LastEditTime: 2020-05-29 20:25:36
 */ 
import { Base } from '../base/base.dto';
import { IsString, Length } from 'class-validator';
import { User } from '../user/user.entity';

export class TopicDto extends Base {
    @IsString()
    @Length(1, 20, { message: '文章名不为空' })
    readonly title: string;

    @IsString()
    readonly content: string;

    readonly visit: number;

    readonly commit: string;

    readonly url: string;
}
