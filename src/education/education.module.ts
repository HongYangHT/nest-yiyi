/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:26:14
 * @LastEditTime: 2020-07-03 14:49:03
 */ 
import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './education.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Education])],
    providers: [EducationService],
    controllers: [EducationController],
    exports: [EducationService],
})
export class EducationModule {}
