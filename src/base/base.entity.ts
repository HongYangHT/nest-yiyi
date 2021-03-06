/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: base entity
 * @Date: 2019-11-09 01:09:14
 * @LastEditTime: 2020-05-18 15:54:18
 */
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  @Transform(value => dayjs.utc(value).format('YYYY-MM-DD HH:mm:ss'), { toPlainOnly: true })
  created: string;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updated: string;
}
