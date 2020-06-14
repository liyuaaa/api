/**
 * @description sequelize配置数据库表数据--权限管理表
 * @author 李育
 */

const seq = require('../seq');
const { STRING, INTEGER, SMALLINT, ENUM } = require('../seqTypes')

const Rights = seq.define('rights', {
  authname: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  pid: {
    type: INTEGER,
    allowNull: false,
  },
  level: {
    type: ENUM("0", "1", "2"),
    allowNull: false,
  }
}, {
  timestamps: false //去除createAt
});

const RightsApi = seq.define('rights_api', {
  ps_id: {
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
  pathname: {
    type: STRING,
  }
}, {
  timestamps: false
});

//外键关联
RightsApi.belongsTo(Rights, {
  // 创建关联，Rights.id => RightsApi.ps_id
  foreignKey: "ps_id",
  as: "path"
})

Rights.hasMany(RightsApi, {
  // 创建外联，Rights.id => RightsApi.ps_id
  foreignKey: "ps_id",
  as: "path"
})

// Rights.belongsTo(RightsApi, {
//   //创建外联 Rights.pid => RightsApi.ps_id
//   foreignKey: "pid",
//   targetKey: "ps_id"
// })

// RightsApi.hasMany(Rights, {
//   //创建外联 Rights.pid => RightsApi.ps_id
//   foreignKey: "pid",
//   targetKey: "ps_id"
// })

module.exports = {
  Rights,
  RightsApi
}