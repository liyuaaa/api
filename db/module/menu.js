/**
 * @description sequelize配置数据库表数据--左侧菜单栏表
 * @author 李育
 */
const seq = require('../seq')
// 导入seq的数据类型
const { STRING, INTEGER } = require('../seqTypes')

const Menu = seq.define('menu', {
  authname: {
    type: STRING,
    allowNull: false,
    unique: true,
    commit: '名称'
  }
});

const MenuChildren = seq.define('menuChildren', {
  authname: {
    type: STRING,
    allowNull: false,
    unique: true,
    commit: '名称'
  },
  path: {
    type: STRING,
    allowNull: false,
    unique: true,
    commit: '路径'
  },
  pId: {
    type: INTEGER,
    unique: true,
    commit: '对应id，用来匹配父元素'
  }
})

//外键关联
MenuChildren.belongsTo(Menu, {
  // 创建外联，MenuChildren.pId => Menu.id
  foreignKey: "pId",
  as: 'children'
})

Menu.hasMany(MenuChildren, {
  // 创建外联，MenuChildren.pId => Menu.id
  foreignKey: "pId",
  as: 'children'
})

module.exports = {
  Menu,
  MenuChildren
}