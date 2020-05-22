/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-21 14:51:25
 * @LastEditTime: 2020-05-21 17:00:22
 */
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Role]), UserModule],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService], // NOTE: 将service抛出，形成共享模块
})
export class RoleModule {}
