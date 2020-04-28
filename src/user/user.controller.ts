/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: user service
 * @Date: 2019-11-08 21:56:54
 * @LastEditTime: 2020-04-28 16:21:27
 */
import { Controller, Post, Body, Res, HttpStatus, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('add')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Res() res, @Body() userDto: UserDto) {
    const user: UserDto = await this.userService.create(userDto);
    res.status(HttpStatus.CREATED).send({
      code: HttpStatus.CREATED,
      success: '请求完成',
      data: {
        user,
      },
    });
  }

  @Get('fetch')
  async findAll(@Res() res) {
    const user: UserDto[] = await this.userService.findAll();
    res.status(HttpStatus.OK).send({
      code: HttpStatus.OK,
      success: '请求成功',
      data: {
        user,
      },
    });
  }
}
