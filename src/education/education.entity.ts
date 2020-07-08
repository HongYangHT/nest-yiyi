/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:26:50
 * @LastEditTime: 2020-07-03 11:09:18
 */ 
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../base/base.entity';
import { Author } from '../author/author.entity';

@Entity()
export class Education extends Base {
    @Column('varchar', { length: 100, comment: '所在城市' })
    position: string;

    @Column('varchar', { length: 40, comment: '省Id' })
    province: string;

    @Column('varchar', { length: 40, comment: '市Id' })
    city: string;

    @Column('varchar', { comment: '学校' })
    school: string;

    @Column('varchar', { comment: '专业' })
    majoring: string;

    @Column('varchar', { comment: '学历' })
    education: string;

    @ManyToOne(type => Author, author => author.educations)
    @JoinColumn()
    author: Author;
}
