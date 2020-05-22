/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user entity
 * @Date: 2019-11-08 21:50:39
 * @LastEditTime: 2020-05-21 15:27:39
 */
import { Entity, Column, OneToMany, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { Base } from '../base/base.entity';
import { Exclude } from 'class-transformer';
import { Role } from '../role/role.entity';

@Entity()
export class User extends Base {
  @Column('varchar', { length: 160, unique: true, comment: '用户名' })
  username: string;

  @Column('varchar', { length: 160, comment: '昵称' })
  nickName: string;

  @Column('varchar', { length: 160, comment: '密码' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column('varchar', { length: 256, comment: '头像', default: '' })
  avatar: string;

  @Column('varchar', { length: 64, comment: '来源, 1: 注册 2: github 3: 微信 4: QQ', default: 1})
  from: string;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
