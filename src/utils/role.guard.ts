/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-17 18:08:39
 * @LastEditTime: 2020-06-18 17:10:46
 */ 
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles || (roles && !roles.length)) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => user.roles.some((role) => roles.includes(role.id));
        return user && user.roles && hasRole();
    }
}
