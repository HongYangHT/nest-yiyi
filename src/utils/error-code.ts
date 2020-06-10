/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-18 17:05:50
 * @LastEditTime: 2020-06-10 11:13:47
 */
export enum ErrorCode {
    USER_NOT_FOUND = '10001',
    USER_PASSWORD_ERROR = '10002',
    CODE_NOT_FOUND = '10003',
    CLIENT_ID_NOT_FOUND = '10004',
    AUTH_NOT_ACCESS = '10005',
    USER_OR_ROLE_NOT_FOUND = '10006',

    USER_OR_TOPIC_NOT_FOUND = '10007',

    // 验证信息
    USERNAME_IS_EMPTY = '20001',

    // 上传文件格式不对
    FILE_NOT_SUIT = '30001',
}
