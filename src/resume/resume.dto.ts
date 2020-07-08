/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:15:23
 * @LastEditTime: 2020-07-03 11:17:37
 */ 
import { Base } from '../base/base.dto';
import { Author } from '../author/author.entity';

export class ResumeDto extends Base {
    readonly position: string;
    readonly author: Author;
    readonly province: string;
    readonly city: string;
    readonly location: string;
    readonly role: string;
    readonly startTime: string;
    readonly endTime: string;
    readonly content: string;
}
