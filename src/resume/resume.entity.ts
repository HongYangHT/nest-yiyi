/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:15:05
 * @LastEditTime: 2020-07-08 17:08:21
 */ 
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from '../base/base.entity';
import { Author } from '../author/author.entity';

@Entity()
export class Resume extends Base {
    @Column('varchar', { length: 100, comment: '所在城市' })
    position: string;

    @Column('varchar', { length: 40, comment: '省Id' })
    province: string;

    @Column('varchar', { length: 40, comment: '市Id' })
    city: string;

    @Column('varchar', { length: 40, comment: '区Id' })
    area: string;

    // @Column('tinytext', { comment: '详细地址' })
    // address: string;

    @Column('varchar', { length: 200, comment: '所在公司' })
    location: string;

    @Column('varchar', { length: 40, comment: '职位' })
    role: string;

    @Column('varchar', { length: 40, comment: '开始时间' })
    startTime: string;

    @Column('varchar', { length: 40, comment: '结束时间' })
    endTime: string;

    @Column('text', { comment: '具体工作内容' })
    content: string;

    @ManyToOne(type => Author, author => author.resumes)
    author: Author;
}
