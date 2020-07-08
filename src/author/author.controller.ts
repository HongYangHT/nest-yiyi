/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 10:12:36
 * @LastEditTime: 2020-07-03 14:56:44
 */ 
import { Controller, Post, Get, Body, Query, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorService } from './author.service';
import { AuthorDto } from './author.dto';
import { Author } from './author.entity';
import { classToPlain } from 'class-transformer';

@Controller('author')
export class AuthorController {
    constructor(
        private readonly authorService: AuthorService,
    ) {}

    @Post('add')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() authorDto: AuthorDto) {
        const author: Author = await this.authorService.create(authorDto);
        return classToPlain(author);
    }

    @Get('fetch/mine')
    async fetch(@Query() query) {
        const author: Author = await this.authorService.fetchDefault();
        return classToPlain(author);
    }
}
