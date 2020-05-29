/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-29 16:17:19
 * @LastEditTime: 2020-05-29 20:24:26
 */ 
import { Entity, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Base } from '../base/base.entity';

@Entity()
export class Topic extends Base {
    @Column('varchar', { length: 160, comment: '文章名' })
    title: string;

    @Column('longtext', { comment: '文章内容'})
    content: string;

    @Column('int', { comment: '浏览次数'})
    visit: number;

    @Column('varchar', { comment: '发布时间' })
    commit: string;

    @Column('varchar', { comment: '访问链接' })
    url: string;
}
