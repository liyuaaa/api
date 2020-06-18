/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getGoods, createGoods, getGoodsOne, setGoods, removeGoods } = require('../services/goods')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getDataSuccess, createDataSuccess, updateDataSuccess, deleteDataSuccess } = require('../model/SuccessModel')
const { getDataError, createDataError, updateDataError, deleteDataError } = require('../model/ErrorModel')

/**
 * 商品列表数据
 * @param {string} query //查询参数
 * @param {integer} pagenum //当前页码
 * @param {integer} pagesize //每页显示条数
 */
async function selectGoods({ query, pagenum, pagesize }) {
  const result = await getGoods({ query, pagenum, pagesize })
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({

    data: {
      total: result[0],
      pagenum: parseInt(result[1]),
      goods: result[2]
    },
    meta: getDataSuccess
  })
}

/**
 * 添加商品
 * @param {string} goods_name 商品名称
 * @param {string} goods_cat 下拉选择器选种的数据
 * @param {integer} goods_price 价格
 * @param {integer} goods_number 数量
 * @param {integer} goods_weight 重量
 * @param {string} goods_introduce 介绍
 * @param {string} pics 上传的图片临时路径（对象）
 * @param {object} attrs 商品的参数（数组），包含 `动态参数` 和 `静态属性`
 */
async function insertGoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
  const result = await createGoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs })
  if (!result) {
    return new ErrorModel(createDataError)
  }
  return new SuccessModel({
    meta: createDataSuccess
  })
}

/**
 * 根据 ID 查询商品
 * @param {integer} id 商品 ID
 */
async function selectGoodsOne(id) {
  const result = await getGoodsOne(id)
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

/**
 * 编辑提交商品
 * @param {integer} id 商品 ID
 * @param {string} goods_name 商品名称
 * @param {integer} goods_price 价格
 * @param {integer} goods_number 数量
 * @param {integer} goods_weight 重量
 */
async function updateGoods({ id, goods_name, goods_price, goods_number, goods_weight }) {
  const result = await setGoods({ id, goods_name, goods_price, goods_number, goods_weight })
  console.log(result)
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 删除商品
 * @param {integer} id 商品 ID
 */
async function deleteGoods(id) {
  const result = await removeGoods(id)
  if (!result) {
    return new ErrorModel(deleteDataError)
  }
  return new SuccessModel({
    meta: deleteDataSuccess
  })
}

module.exports = {
  selectGoods,
  insertGoods,
  selectGoodsOne,
  updateGoods,
  deleteGoods
}