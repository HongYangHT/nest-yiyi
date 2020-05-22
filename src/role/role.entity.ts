/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 14:19:31
 * @LastEditTime: 2020-05-21 18:10:28
 */ 
import { Entity, Column, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Base } from '../base/base.entity';
import { User } from '../user/user.entity';

@Entity()
export class Role extends Base {
    @Column('varchar', { length: 160, unique: true, comment: '角色名' })
    roleName: string;

    @ManyToMany(type => User, user => user.roles)
    users: User[];
}
