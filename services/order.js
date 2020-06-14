/**
 * @description 处理order的数据，进行操作查看
 * @author 李育
 */

const { Order, OrderGoods } = require('../db/module/order')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios')

/**
 * 订单数据列表
 * @param {string} query 查询参数
 * @param {integer} pagenum 查询参数
 * @param {integer} pagesize 查询参数
 */
async function getOrder({ query, pagenum, pagesize }) {
  whereOption = {
    limit: parseInt(pagesize),
    offset: (pagenum - 1) * pagesize
  }
  if (query) {
    Object.assign(whereOption, {
      where: {
        order_number: {
          [Op.like]: '%' + query + '%'  //模糊查询
        }
      }
    })
  }
  const result = await Order.findAll(whereOption)
  if (!result) {
    return result;
  }
  return result.map(item => item.dataValues)
}

/**
 * 修改订单状态
 * @param {integer} id 订单 ID
 * @param {integer} is_send 订单是否发货
 * @param {integer} order_pay 订单支付
 * @param {integer} order_price 订单价格
 * @param {integer} order_number 订单数量
 * @param {integer} pay_status 支付状态
 */
async function createOredr({ id, is_send, order_pay, order_price, order_number, pay_status }) {
  let is_sendData;
  if (is_send == 1) {
    is_sendData = "是"
  } else {
    is_sendData = "否"
  }
  const result = await Order.update({
    is_send: is_sendData,
    order_pay,
    order_price,
    order_number,
    pay_status,
    createdtime: Date.parse(new Date()) / 1000,
    updatedtime: Date.parse(new Date()) / 1000
  }, {
    where: {
      order_id: id,
    }
  })
  return result[0]
}

/**
 * 查看订单详情
 * @param {integer} id 订单id
 */
async function getOrderOne(id) {
  const result = await Order.findOne({
    where: {
      order_id: id
    },
    include: [
      {
        model: OrderGoods,
        as: "goods"
      }
    ]
  })
  if (!result) {
    return result
  }
  return result.dataValues
}

/**
 * 获取物流信息
 */
async function getKuaidi(id) {
  //使用ajax获取url的数据
  const result = await axios.get(`https://www.kuaidi100.com/query?type=youzhengguonei&postid=${id}`)
  if (!result) {
    return result
  }
  return result.data.data
}

module.exports = {
  getOrder,
  createOredr,
  getOrderOne,
  getKuaidi
}