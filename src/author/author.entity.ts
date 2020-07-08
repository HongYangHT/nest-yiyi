/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:13:12
 * @LastEditTime: 2020-07-03 16:42:01
 */
import { Entity, Column, OneToMany} from 'typeorm';
import { Base } from '../base/base.entity';
import { Resume } from '../resume/resume.entity';
import { Education } from '../education/education.entity';

@Entity()
export class Author extends Base {
    @Column('varchar', { length: 40, unique: true, comment: '作者' })
    name: string;

    @Column('varchar', { length: 200, comment: '地址' })
    address: string;

    @Column('varchar', { length: 40, comment: '省Id' })
    province: string;

    @Column('varchar', { length: 40, comment: '市Id' })
    city: string;

    @Column('varchar', { length: 40, comment: '区Id' })
    area: string;

    @Column('varchar', { length: 22, comment: '电话' })
    phone: string;

    @Column('varchar', { length: 100, comment: '邮箱' })
    mail: string;

    @Column('varchar', { length: 100, comment: 'github 主页' })
    github: string;

    @Column('text', { comment: '最近概况' })
    overview: string;

    @Column('text', { comment: '爱好' })
    favor: string;

    @Column('text', { comment: '技能' })
    skill: string;

    @OneToMany(type => Resume, resume => resume.author)
    resumes: Resume[];

    @OneToMany(type => Education, education => education.author)
    educations: Education[];
}
