/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user entity
 * @Date: 2019-11-08 21:50:39
 * @LastEditTime: 2019-11-25 20:22:53
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Base } from '../base/base.entity';

@Entity()
export class User extends Base {
  @Column('varchar', { length: 160 })
  username: string;

  @Column('varchar', { length: 160 })
  nickName: string;

  @Column('varchar', { length: 160 })
  password: string;
}
