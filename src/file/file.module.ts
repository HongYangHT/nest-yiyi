/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-08 18:29:49
 * @LastEditTime: 2020-06-09 17:00:59
 */ 
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import path from 'path';
import { diskStorage } from 'multer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Module({
    imports: [MulterModule.register({
        storage: diskStorage({
            destination: path.resolve(__dirname, `../../uploads`),
            filename: (req, file, cb) => {
                return cb(null, file.originalname);
            },
        }),
    })],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule {}
