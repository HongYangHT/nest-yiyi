/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:13:25
 * @LastEditTime: 2020-07-03 16:42:38
 */
import { Base } from '../base/base.dto';
import { Resume } from '../resume/resume.entity';
import { Education } from '../education/education.entity';

export class AuthorDto extends Base {
    readonly name: string;
    readonly address: string;
    readonly province: string;
    readonly area: string;
    readonly city: string;
    readonly phone: string;
    readonly mail: string;
    readonly github: string;
    readonly overview: string;
    readonly favor: string;
    readonly skill: string;
    readonly resumes: Resume[];
    readonly educations: Education[];
}