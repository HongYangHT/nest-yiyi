/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 
 * @Date: 2019-11-09 01:39:33
 * @LastEditTime: 2019-11-26 18:47:23
 */
import { IsString } from 'class-validator';
export class Base {
   readonly id: string;
   readonly created: string;
   readonly updated: string;
}
