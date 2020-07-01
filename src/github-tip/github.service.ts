/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-01 17:58:25
 * @LastEditTime: 2020-07-01 18:41:39
 */ 
import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { Logger } from '../utils/logical';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class GithubService {
    verify(secret: string, payload: object | string, signature: string) {
        const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
        const signatureBuffer = Buffer.from(signature);
        const verifyBuffer = Buffer.from(`sha1=${this.sign(data, secret)}`);
        if (signatureBuffer.length !== verifyBuffer.length) {
            return false;
        }

        return timingSafeEqual(signatureBuffer, verifyBuffer);
    }
    sign( data: string, secret: string) {
        return createHmac('sha1', secret).update(data).digest('hex');
    }

    deploy(name) {
        this.runCmd('sh', ['./build.sh'], `/root/workspace/${name}`)
        .then(() => Logger.info(`打包成功`))
        .catch((e) => Logger.info(`打包失败 ${e.toString()}`));
    }

    runCmd(cmd: string, args: string[], pwd?: string) {
        return new Promise((resolve, reject) => {
            if (pwd) {
                process.chdir(pwd);
            }
            Logger.info(`${cmd} ${args} ${pwd}`);
            const shell = spawn(cmd, args, {
                stdio: 'inherit',
                shell: true,
            });
            shell.stdout.on('data', (e) => Logger.info(e.toString()));
            shell.stderr.on('data', (e) => Logger.info(e.toString()));
            shell.on('close', (code) => {
                if (code !== 0) {
                    Logger.info(`${cmd} ${args} error, code: ${code}`);
                    reject(code);
                    return;
                }
                resolve(code);
            });
        });
    }
}
