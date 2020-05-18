/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 
 * @Date: 2019-11-08 21:34:59
 * @LastEditTime: 2020-04-28 18:21:21
 */
const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
module.exports = {
  "type": "mysql",
  "host": "119.23.214.172",
  "port": 3306,
  "username": "yiyi",
  "password": "Hong@410g",
  "database": "yiyi",
  "entities": [`${SOURCE_PATH}/**/*.entity{.ts,.js}`],
  "timezone": "UTC",
  "charset": "utf8mb4",
  "synchronize": process.env.NODE_ENV === 'production' ? false : true,
  "logging": "all",
  "migrations": ["migrations/*.ts"],
  "cli": {
    "migrationsDir": "migrations"
  },
  "logger": "advanced-console",
  "maxQueryExecutionTime": 10000
}
