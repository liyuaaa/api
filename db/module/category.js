/**
 * @description sequelize配置数据库表数据--商品分类管理表
 * @author 李育
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../seqTypes')
const Category = seq.define('category', {
  cat_id: {
    primaryKey: true, //主键
    type: INTEGER,  //整型
    allowNull: false, //数据不能为空
    unique: true, //用户数据不能重复
    autoIncrement: true, //自增
  },
  cat_name: {
    type: STRING,
  },
  cat_pid: {
    type: INTEGER
  },
  cat_level: {
    type: INTEGER
  },
  cat_deleted: {
    type: INTEGER
  },
  cat_icon: {
    type: STRING
  },
  cat_src: {
    type: TEXT
  }
}, {
  timestamps: false //去除createAt
});

module.exports = {
  Category
}