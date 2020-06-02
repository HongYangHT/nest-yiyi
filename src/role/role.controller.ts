/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 14:50:58
 * @LastEditTime: 2020-06-02 14:28:46
 */ 
import { Controller, UseGuards, Res, Post, Body, ValidationPipe, UsePipes, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './role.entity';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserService } from '../user/user.service';

@Controller('role')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly userService: UserService) {}
    @Post('add')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() roleDto: RoleDto) {
        const role: Role = await this.roleService.create(roleDto);
        return {
            role: classToPlain(role),
        };
    }

    @Post('bind')
    async bind(@Body() body) {
        return await this.roleService.bind(body);
    }
}
