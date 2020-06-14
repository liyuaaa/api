/**
 * @description sequelize配置数据库表数据--权限管理表
 * @author 李育
 */

const seq = require('../seq')
const { STRING, SMALLINT, ENUM, TEXT, INTEGER } = require('../seqTypes')

const Attributes = seq.define('attributes', {
  attr_name: {
    type: STRING,
    allowNull: false
  },
  cat_id: {
    type: SMALLINT,
    allowNull: false,
    unique: true
  },
  attr_sel: {
    type: ENUM('only', 'many'),
    allowNull: false
  },
  attr_write: {
    type: ENUM('manual', 'list')
  },
  attr_vals: {
    type: TEXT,
  },
  delete_time: {
    type: INTEGER
  }
}, {
  timestamps: false //去除createAt
});

module.exports = {
  Attributes
}