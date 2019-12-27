/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: base entity
 * @Date: 2019-11-09 01:09:14
 * @LastEditTime: 2019-11-29 17:57:34
 */
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
