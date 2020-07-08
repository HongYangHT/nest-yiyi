/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:14:37
 * @LastEditTime: 2020-07-03 14:11:39
 */ 
import { Injectable } from '@nestjs/common';
import { ResumeDto } from './resume.dto';
import { Resume } from './resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResumeService {
    constructor(
        @InjectRepository(Resume)
        private readonly resumeRepository: Repository<Resume>,
    ) {}
    async create(resumeDto: ResumeDto): Promise<Resume> {
        return await this.resumeRepository.save(resumeDto);
    }

    async createMulti(resumeDtoArr: ResumeDto[]): Promise<Resume[]> {
        return await this.resumeRepository.save(resumeDtoArr);
    }
}
