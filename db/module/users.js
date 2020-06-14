/**
 * @description sequelize配置数据库表数据--用户表
 * @author 李育
 */

const seq = require('../seq')
// 导入seq的数据类型
const { STRING, INTEGER, BOOLEAN } = require('../seqTypes')

// users表
const Users = seq.define('users', {
  username: {
    type: STRING,
    allowNull: false, //数据不能为空
    comment: '用户名', //说明
    unique: true, //用户的数据不能重复
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  mobile: {
    type: STRING,
    allowNull: false,
    comment: '电话号码'
  },
  email: {
    type: STRING,
    allowNull: false,
    comment: '邮箱'
  },
  rid: {
    type: INTEGER,
    allowNull: false,
    comment: '用户角色id'
  },
  mg_state: {
    type: BOOLEAN,
    allowNull: false,
    comment: '状态'
  },
  role_name: {
    type: STRING,
    allowNull: false,
    comment: '用户身份'
  },
  avatar: {
    type: STRING,
    comment: '头像'
  },
});


module.exports = {
  Users
}