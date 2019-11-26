/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 
 * @Date: 2019-11-09 01:09:14
 * @LastEditTime: 2019-11-26 18:34:22
 */
import {PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;
}
