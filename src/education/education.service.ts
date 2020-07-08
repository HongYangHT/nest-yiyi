/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:26:27
 * @LastEditTime: 2020-07-03 14:27:31
 */ 
import { Injectable } from '@nestjs/common';
import { Education } from './education.entity';
import { EducationDto } from './education.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) {}

    async create(education: EducationDto): Promise<Education> {
        return await this.educationRepository.save(education);
    }

    async createMulti(educations: Education[]): Promise<Education[]> {
        return await this.educationRepository.save(educations);
    }
}
