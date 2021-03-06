/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-09 18:16:18
 * @LastEditTime: 2020-06-01 16:21:19
 */
import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MyLoggerService } from '../utils/log';

@Module({
    imports: [UserModule, RoleModule, HttpModule, PassportModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1y' },
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy, MyLoggerService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
