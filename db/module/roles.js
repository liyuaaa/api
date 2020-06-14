/**
 * @description sequelize配置数据库表数据--角色管理表
 * @author 李育
 */

const seq = require('../seq');

const { INTEGER, STRING, TEXT } = require('../seqTypes');

const Roles = seq.define('roles', {
  roleId: {
    type: INTEGER,  //整型
    unique: true, //用户数据不能重复
    autoIncrement: true, //自增
    primaryKey: true, //主键
  },
  roleName: {
    type: STRING,
    allowNull: false,
  },
  ps_ids: {
    type: STRING,
  },
  ps_ca: {
    type: TEXT,
  },
  roleDesc: {
    type: TEXT,
  },
}, {
  timestamps: false //去除createAt
});

module.exports = {
  Roles
}