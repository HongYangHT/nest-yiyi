/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:12:44
 * @LastEditTime: 2020-07-03 14:43:25
 */ 
import { Injectable } from '@nestjs/common';
import { AuthorDto } from './author.dto';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { Author } from './author.entity';
import { Resume } from '../resume/resume.entity';
import { Education } from '../education/education.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) {}
    @Transaction()
    async create(authorDto: AuthorDto, @TransactionManager() manager?: EntityManager): Promise<Author> {
        const resumes = await manager.save(Resume, authorDto.resumes);
        const educations = await manager.save(Education, authorDto.educations);
        authorDto = Object.assign(authorDto, {
            resumes,
            educations,
        });
        const author = await manager.save(Author, authorDto);
        return author;
    }

    async fetchDefault(): Promise<Author> {
        return await this.authorRepository.findOne({
            where: {
                name: '洪阳',
            },
            relations: ['resumes', 'educations'],
        });
    }
}
