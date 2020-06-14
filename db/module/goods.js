/**
 * @description sequelize配置数据库表数据--商品管理表
 * @author 李育
 */

const seq = require('../seq')
const { STRING, INTEGER, BOOLEAN, DECIMAL, SMALLINT, TEXT, ENUM } = require('../seqTypes')

const Goods = seq.define('goods', {
  goods_id: {
    primaryKey: true, //主键
    type: INTEGER,  //整型
    allowNull: false, //数据不能为空
    unique: true, //用户数据不能重复
    autoIncrement: true, //自增
  },
  goods_name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  goods_price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    unique: true,
  },
  goods_number: {
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
  goods_weight: {
    type: SMALLINT,
    allowNull: false,
    unique: true,
  },
  goods_state: {
    type: INTEGER,
    unique: true,
  },
  add_time: {
    type: INTEGER,
    unique: true,
  },
  upd_time: {
    type: INTEGER,
    unique: true,
  },
  hot_mumber: {
    type: INTEGER,
    unique: true,
  },
  is_promote: {
    type: SMALLINT,
    unique: true,
  },
}, {
  timestamps: false //去除createAt
});

const GoodsAttrs = seq.define('goods_attrs', {
  goods_id: {
    type: INTEGER,  //整型
    allowNull: false, //数据不能为空
  },
  attr_id: {
    type: INTEGER,
    unique: true,
  },
  attr_value: {
    type: TEXT,
  },
  add_price: {
    type: DECIMAL(8, 2),
  },
})

// //外键关联
GoodsAttrs.belongsTo(Goods, {
  // Goods.cat_id -> Attributes.cat_id
  foreignKey: "goods_id",
  targetKey: "goods_id"
})

Goods.hasMany(GoodsAttrs, {
  // Goods.cat_id -> Attributes.cat_id
  foreignKey: "goods_id",
  targetKey: "goods_id"
})


module.exports = {
  Goods,
  GoodsAttrs,
}