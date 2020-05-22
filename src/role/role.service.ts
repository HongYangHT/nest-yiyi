/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 14:51:11
 * @LastEditTime: 2020-05-21 18:27:48
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { User } from '../user/user.entity';
import { Transaction, TransactionManager, EntityManager, TransactionRepository } from 'typeorm';
import { ErrorCode } from '../utils/error-code';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async create(role: Role): Promise<Role> {
        return await this.roleRepository.save(role);
    }

    @Transaction()
    async bind(manager: EntityManager, body: any) {
        const { user_id, role_id } = body;
        const user: User = await manager.findOne(User, user_id, {
            relations: ['roles'],
        });
        const role: Role = await manager.findOne(Role, role_id);
        if (!user || !role) {
            throw new HttpException({ message: '用户或角色不存在', status: ErrorCode.USER_OR_ROLE_NOT_FOUND }, HttpStatus.OK)
        }
        user.roles = [...user.roles, role];
        await manager.save(user);
        // await manager.update<User>(User, user.id, user);
        return user;
    }
}
