/**
 * @description sequelize配置连接数据库
 * @author 李育
 */
const Sequelize = require('sequelize')

const config = {
  host: 'localhost',
  dialect: 'mysql'
}
// 配置连接
const seq = new Sequelize('vueshop', 'root', '123456', config)

module.exports = seq