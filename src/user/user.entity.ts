/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user entity
 * @Date: 2019-11-08 21:50:39
 * @LastEditTime: 2020-05-18 18:00:57
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Base } from '../base/base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends Base {
  @Column('varchar', { length: 160, unique: true, comment: '用户名' })
  username: string;

  @Column('varchar', { length: 160, comment: '昵称' })
  nickName: string;

  @Column('varchar', { length: 160, comment: '密码' })
  @Exclude({ toPlainOnly: true })
  password: string;
}
