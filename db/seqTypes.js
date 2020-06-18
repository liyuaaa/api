/**
 * @description 封装sequelize的数据类型
 * @author 李育
 */
const Seq = require('sequelize')
module.exports = {
  STRING: Seq.STRING, //字符串类型
  TEXT: Seq.TEXT, //文本类型
  INTEGER: Seq.INTEGER, //数据类型
  DECIMAL: Seq.DECIMAL, //存储数据库精确的类型
  BOOLEAN: Seq.BOOLEAN, //布尔类型
  SMALLINT: Seq.SMALLINT,//数据类型
  ENUM: Seq.ENUM,//枚举类型
  MEDIUMINT: Seq.MEDIUMINT,
  CHAR: Seq.CHAR
}