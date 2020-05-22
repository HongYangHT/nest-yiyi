/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-09 18:04:57
 * @LastEditTime: 2020-05-21 15:10:26
 */
import { Controller, Request, Post, UseGuards, Get, Body, Res, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDto } from '../user/user.dto';
import bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { AuthGithub } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * 本地账号登录
     * @param req request
     */
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signin')
    async signin(@Res() res, @Body() userDto: UserDto) {
        const salt = bcrypt.genSaltSync(10);
        userDto = {
            ...userDto,
            password: bcrypt.hashSync(userDto.password, salt),
        };
        const user = await this.authService.signin({
            ...userDto,
            from: 1,
        });
        res.status(HttpStatus.CREATED).send({
            status: HttpStatus.OK,
            success: '请求完成',
            data: {
                user: classToPlain(plainToClass(User, user)),
            },
        });
    }

    /**
     * 使用github第三方登录
     * @param req request
     */
    @Get('login/github')
    @UsePipes(new ValidationPipe({ transform: true }))
    async loginWithGithub(@Query() query: AuthGithub) {
        return this.authService.loginWithGithub(query);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('fetch')
    async getProfile(@Request() req) {
        const user = await this.authService.getUserInfo(req.user);
        return classToPlain(user);
    }
}
