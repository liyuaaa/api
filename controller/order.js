/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getOrder, createOredr, getOrderOne, getKuaidi } = require('../services/order')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getDataError, updateDataError } = require('../model/ErrorModel')
const { getDataSuccess, updateDataSuccess } = require('../model/SuccessModel')

/**
 * 订单数据列表
 * @param {string} query 查询参数
 * @param {integer} pagenum 查询参数
 * @param {integer} pagesize 查询参数
 */
async function selectOrder({ query, pagenum, pagesize }) {
  const result = await getOrder({ query, pagenum, pagesize })
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
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
async function updateOrder({ id, is_send, order_pay, order_price, order_number, pay_status }) {
  const result = await createOredr({ id, is_send, order_pay, order_price, order_number, pay_status })
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 查看订单详情
 * @param {integer} id 订单id
 */
async function selectOrderOne(id) {
  const result = await getOrderOne(id)
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

/**
 * 获取物流信息
 */
async function selectKuaidi(id) {
  const result = await getKuaidi(id)
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

module.exports = {
  selectOrder,
  updateOrder,
  selectOrderOne,
  selectKuaidi
}