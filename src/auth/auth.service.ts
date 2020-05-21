/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-09 18:04:34
 * @LastEditTime: 2020-05-21 11:48:28
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { classToPlain, plainToClass } from 'class-transformer';
import bcrypt from 'bcrypt';
import { ErrorCode } from '../utils/error-code';
import { config } from '../utils/github.token';
import axios from 'axios';
import { User } from '../user/user.entity';
import { MyLoggerService } from '../utils/log';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly myLoggerService: MyLoggerService,
    ) {}
    /**
     * 用于本地登录验证
     * @param username 
     * @param password 
     */
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // tslint:disable-next-line:no-shadowed-variable
                const { password, ...result } = user;
                return result;
            } else {
                throw new HttpException({ message: '密码错误', status: ErrorCode.USER_PASSWORD_ERROR }, HttpStatus.OK);
            }
        } else {
            throw new HttpException({ message: '用户不存在', status: ErrorCode.USER_NOT_FOUND }, HttpStatus.OK);
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        const item = await this.userService.findById(user.id);
        return {
            ...classToPlain(item),
            access_token: this.jwtService.sign(payload),
        };
    }

    async signin(user: any) {
        const item = await this.userService.create(user);
        return {
            ...classToPlain(user),
        };
    }

    /**
     * 查询用户信息
     * @param user 
     */
    async getUserInfo(user: any) {
        const { id } = user;
        const item = await this.userService.findById(id);
        if (item) {
            return item;
        } else {
            throw new HttpException({ message: '用户不存在', status: ErrorCode.USER_NOT_FOUND }, HttpStatus.OK);
        }
    }

    /**
     * 用于jwt验证token是否存在
     * @param user
     */
    async validateToken(user: any) {
        const { id } = user;
        const item = await this.userService.findById(id);
        if (item) {
            return item;
        }
        return null;
    }

    /**
     * 用于github第三方登录
     * @param body
     */
    async loginWithGithub(query: any) {
        const { code, client_id } = query;
        if (!code) {
            throw new HttpException({ message: 'code 不存在', status: ErrorCode.CODE_NOT_FOUND }, HttpStatus.OK);
        }
        if (!client_id) {
            throw new HttpException({ message: 'client_id 值不存在', status: ErrorCode.CLIENT_ID_NOT_FOUND }, HttpStatus.OK);
        }

        try {
            const fetchToken = await axios.post('https://github.com/login/oauth/access_token', {
                ...query,
                client_secret: config.production.client_secret,
            });

            this.myLoggerService.write({
                ...query,
                client_secret: config.production.client_secret,
            });
            const githubUser = await axios.get(`https://api.github.com/user?${fetchToken.data}`);
            const searchUser = await this.userService.findOne(githubUser.data.login);
            // NOTE: 用户存在，他有可能是用户名一样
            if (searchUser) {
                const match = await bcrypt.compare(githubUser.data.id + '' , searchUser.password);
                if (match) {
                    // tslint:disable-next-line:no-shadowed-variable
                    const { password, ...result } = searchUser;
                    return result;
                } else {
                    // NOTE: 建一个用户
                    const salt = bcrypt.genSaltSync(10);
                    const user = plainToClass(User, {
                        username: githubUser.data.login,
                        password: bcrypt.hashSync(githubUser.data.id + '', salt),
                        nickName: githubUser.data.login,
                    });
                    const userItem = await this.userService.create(user);
                    return classToPlain(plainToClass(User, userItem));
                }
            } else {
                // NOTE: 建一个用户
                const salt = bcrypt.genSaltSync(10);
                const user = plainToClass(User, {
                    username: githubUser.data.login,
                    password: bcrypt.hashSync(githubUser.data.id + '', salt),
                    nickName: githubUser.data.login,
                });
                const userItem = await this.userService.create(user);
                return classToPlain(plainToClass(User, userItem));
            }
        } catch (error) {
            this.myLoggerService.write(error);
            throw new HttpException({ message: '授权登录报错', status: ErrorCode.AUTH_NOT_ACCESS }, HttpStatus.OK);
        }

    }
}
