/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 记录日志文件工具
 * @Date: 2019-11-11 09:15:50
 * @LastEditTime: 2019-11-11 09:22:27
 */
const path = require('path')
const log4js = require('koa-log4')

log4js.configure({
  pm2: true,
  pm2InstanceVar: '$404',
  appenders: {
    http: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 生成文件的规则
      alwaysIncludePattern: true,
      backup: 3,
      filename: path.join('./logs/', 'http.log') // 生成文件名
    },
    db: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log', // 生成文件的规则
      alwaysIncludePattern: true,
      backup: 3,
      filename: path.join('./logs/', 'db.log') // 生成文件名
    },
    error: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      backup: 3,
      filename: path.join('./logs/', 'error.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info'
    },
    http: {
      appenders: ['http'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'warn'
    },
    db: {
      appenders: ['db'],
      level: 'info'
    }
  }
})

exports.httpLogger = () => log4js.koaLogger(log4js.getLogger('http')) // 记录所有访问级别的日志
exports.errorLogger = log4js.getLogger('error') // 记录所有应用级别的日志
exports.dbLogger = log4js.getLogger('db') // 记录sql请求的日志