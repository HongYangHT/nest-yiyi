/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:14:29
 * @LastEditTime: 2020-07-03 14:50:34
 */ 
import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './resume.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Resume])],
    providers: [ResumeService],
    controllers: [ResumeController],
    exports: [ResumeService],
})
export class ResumeModule {}
