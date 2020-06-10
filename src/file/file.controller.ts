/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-08 18:30:46
 * @LastEditTime: 2020-06-10 11:19:00
 */ 
import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SftpService } from './sftp.service';
import { ErrorCode } from '../utils/error-code';

@Controller('file')
export class FileController {
    private sftpService: SftpService;
    @Post('upload/avatar')
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fieldSize: 2,
        },
        fileFilter: (req, file, cb) => {
            let mimetype = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
            if (mimetype.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('请选择正确的图片格式'), false);
            }
        },
    }))
    async uploadFile(@UploadedFile() file) {
        this.sftpService = new SftpService(file);
        const url = await this.sftpService.uploadFileToFtp();
        return {
            url,
        };
    }
}
