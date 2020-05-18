/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-09 18:04:34
 * @LastEditTime: 2020-05-13 14:23:46
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password === password) {
            // tslint:disable-next-line:no-shadowed-variable
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        const item = await this.userService.findById(user.id);
        return {
            ...classToPlain(item),
            access_token: this.jwtService.sign(payload),
        };
    }

    async getUserInfo(user: any) {
        const { id } = user;
        const item = await this.userService.findById(id);
        if (item) {
            return item;
        } else {
            throw new Error('员工不存在');
        }
    }
}
