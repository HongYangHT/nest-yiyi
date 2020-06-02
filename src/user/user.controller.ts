/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user service
 * @Date: 2019-11-08 21:56:54
 * @LastEditTime: 2020-06-02 14:36:26
 */
import { Controller, Post, Body, Res, HttpStatus, Get, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import bcrypt from 'bcrypt';
import { User } from './user.entity';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() userDto: UserDto) {
    const salt = bcrypt.genSaltSync(10);
    userDto = {
      ...userDto,
      password: bcrypt.hashSync(userDto.password, salt),
    };
    const user: User = await this.userService.create(userDto);
    return {
      user: classToPlain(plainToClass(User, user)),
    };
  }

  @Get('fetch')
  async findAll(@Res() res) {
    const user: User[] = await this.userService.findAll();
    return {
      user: classToPlain(user),
    };
  }
}
