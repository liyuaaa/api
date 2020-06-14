/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getRights } = require('../services/rights')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { getDataError } = require('../model/ErrorModel')
const { getDataSuccess } = require('../model/SuccessModel')

/**
 * 获取权限列表数据列表
 * @param {string} type 类型,值 list 或 tree
 */
async function selectRights(type) {
  const result = await getRights(type)
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

module.exports = {
  selectRights
}