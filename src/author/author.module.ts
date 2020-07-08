/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:12:24
 * @LastEditTime: 2020-07-03 14:48:15
 */ 
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    controllers: [AuthorController],
    providers: [AuthorService],
    exports: [AuthorService],
})
export class AuthorModule {}
