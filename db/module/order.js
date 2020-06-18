/**
 * @description sequelize配置数据库表数据--订单管理表
 * @author 李育
 */

const seq = require('../seq')
const { INTEGER, STRING, MEDIUMINT, DECIMAL, ENUM, TEXT } = require('../seqTypes')

const Order = seq.define('order', {
  order_id: {
    primaryKey: true, //主键
    type: INTEGER,  //整型
    allowNull: false, //数据不能为空
    unique: true, //用户数据不能重复
    autoIncrement: true, //自增
  },
  user_id: {
    type: MEDIUMINT,
    allowNull: false
  },
  order_number: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  order_price: {
    type: DECIMAL(10, 2),
    allowNull: false
  },
  order_pay: {
    type: ENUM('0', '1', '2', '3'),
    allowNull: false
  },
  is_send: {
    type: ENUM('是', '否'),
    allowNull: false
  },
  trade_no: {
    type: STRING,
    allowNull: false
  },
  order_fapiao_title: {
    type: ENUM('个人', '公司'),
    allowNull: false
  },
  order_fapiao_company: {
    type: STRING,
    allowNull: false
  },
  order_fapiao_content: {
    type: STRING,
    allowNull: false
  },
  consignee_addr: {
    type: TEXT,
    allowNull: false
  },
  pay_status: {
    type: ENUM('0', '1'),
    allowNull: false
  },
  createdtime: {
    type: INTEGER,
    allowNull: false
  },
  updatedtime: {
    type: INTEGER,
    allowNull: false
  }
}, {
  timestamps: false //去除createAt
});

const OrderGoods = seq.define('order_goods', {
  order_id: {
    type: INTEGER,
    allowNull: false
  },
  goods_id: {
    type: MEDIUMINT,
    allowNull: false
  },
  goods_price: {
    type: DECIMAL(10, 2),
    allowNull: false
  },
  goods_number: {
    type: INTEGER,
    allowNull: false
  },
  goods_total_price: {
    type: DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: false //去除createAt
})

//关联查询
OrderGoods.belongsTo(Order, {
  // 创建外联，OrderGoods.order_id => Order.order_id
  foreignKey: "order_id",
  targetKey: "order_id",
  as: "goods"
})

Order.hasMany(OrderGoods, {
  foreignKey: "order_id",
  targetKey: "order_id",
  as: "goods"
})


module.exports = {
  Order,
  OrderGoods
}