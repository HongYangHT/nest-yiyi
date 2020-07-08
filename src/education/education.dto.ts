/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:27:02
 * @LastEditTime: 2020-07-03 14:26:30
 */ 
import { Base } from '../base/base.dto';
import { Author } from '../author/author.entity';

export class EducationDto extends Base {
    readonly position: string;
    readonly province: string;
    readonly city: string;
    readonly school: string;
    readonly majoring: string;
    readonly education: string;
    readonly author: Author;
}
