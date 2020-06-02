/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2019-11-08 21:54:00
 * @LastEditTime: 2020-05-30 17:17:48
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['roles'] });
  }

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['roles'],
    });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id, {
      relations: ['roles'],
    });
  }
}
