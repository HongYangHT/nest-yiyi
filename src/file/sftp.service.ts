/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-09 16:33:29
 * @LastEditTime: 2020-06-10 10:45:12
 */
import PromiseFtp from 'promise-ftp';
import md5 from 'md5';
import fs from 'fs';
import path from 'path';
import { Logger } from '../utils/logical';

import Client from 'ssh2-sftp-client';

interface Config {
    /**
     * The hostname or IP address of the FTP server. Default: 'localhost'
     */
    host?: string;
    /**
     * The port of the FTP server. Default: 21
     */
    port?: number;
    /**
     * Set to true for both control and data connection encryption, 'control' for control connection encryption only, or 'implicit' for
     * implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990) Default: false
     */
    secure?: string | boolean;
    /**
     * Additional options to be passed to tls.connect(). Default: (none)
     */
    secureOptions?: any;
    /**
     * Username for authentication. Default: 'anonymous'
     */
    user?: string;

    username?: string;
    /**
     * Password for authentication. Default: 'anonymous@'
     */
    password?: string;
    /**
     * How long (in milliseconds) to wait for the control connection to be established. Default: 10000
     */
    connTimeout?: number;
    /**
     * How long (in milliseconds) to wait for a PASV data connection to be established. Default: 10000
     */
    pasvTimeout?: number;
    /**
     * How often (in milliseconds) to send a 'dummy' (NOOP) command to keep the connection alive. Default: 10000
     */
    keepalive?: number;
    /**
     * Debug function to invoke to enable debug logging.
     */
    debug?: (message: string) => void;
}

interface BaseDir {
    host: string;
    root: string;
    hostname: string;
    user?: string;
    topic?: string;
}

export class SftpService {
    private count: number;
    private files: any;
    private config: Config;
    private baseDir: BaseDir;
    constructor(files: any) {
        this.count = 0;
        this.files = files;
        this.config = {
            host: '119.23.214.172',
            port: 22,
            user: 'ftpuser',
            username: 'ftpuser',
            password: 'Hong@410g',
            connTimeout: 50000,
            secure: false,
            // debug: (err) => {
            //     Logger.info(err);
            // },
        };
        this.baseDir = {
            hostname: '//www.hcy.cool',
            host: 'http://119.23.214.172',
            root: '/home/ftpuser/www',
            user: '/home/ftpuser/www/images',
            topic: '/home/ftpuser/www/topic',
        };
    }

    /**
     * 上传文件到ftp
     * @param uploadRoot string
     * @param config Config
     * @param file any
     */
    uploadFileToFtp(uploadRoot = 'user', config = this.config, file = this.files) {
        return new Promise((resolve, reject) => {
            const fileFormat = (file.originalname).split('.');
            const fileDir = this.baseDir[uploadRoot] + '/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
            const fileName = md5(file.originalname + Date.now()) + '.' + fileFormat[fileFormat.length - 1];
            const fileRoot = fileDir + '/' + fileName;
            const ftp = new Client();
            ftp.connect(config).then(() => {
                Logger.info(`ftp(${this.config.host})：连接成功`);
                return ftp.mkdir(fileDir, true);
            })
            .then(() => {
                Logger.info(`ftp(${this.config.host})： 创建目录成功`);
                return ftp.put(file.path, fileRoot);
            }).then(() => {
                this.deleteTempFile(path.resolve(__dirname, '../../uploads'));
                resolve(fileRoot.replace(this.baseDir.root, this.baseDir.hostname));
                Logger.info(`ftp(${this.config.host})： 上传成功，${fileRoot.replace(this.baseDir.root, this.baseDir.hostname)}`);
                return ftp.end();
            }).catch(err => {
                Logger.info(`ftp(${this.config.host})： 上传失败，${err}`);
                return reject(err);
            });
        });
    }

    /**
     * 删除缓存文件
     * @param {*} path
     */
    // tslint:disable-next-line:no-shadowed-variable
    deleteTempFile(path: string): void {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((file, index) => {
                const curPath = path + '/' + file;
                if (fs.statSync(curPath).isDirectory()) {
                    this.deleteTempFile(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
    /**
     * 删除无用文件
     * @param {*} path
     */
    // tslint:disable-next-line:no-shadowed-variable
    removeFile(path: string, uploadRoot = 'user', config = this.config): void {
        const fileDir = this.baseDir[uploadRoot];
        const fileName = path.replace(this.baseDir.host + uploadRoot, '');
        const ftp = new PromiseFtp();
        ftp.connect(config).then(() => {
            return ftp.delete(fileDir + fileName);
        }).then(() => {
            return ftp.end();
        // tslint:disable-next-line:no-empty
        }).catch(err => {});
    }
}
