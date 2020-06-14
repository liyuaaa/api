/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getMenu } = require('../services/menu')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { getDataError } = require('../model/ErrorModel')
const { getDataSuccess } = require('../model/SuccessModel')

/**
 * 获取左侧菜单栏数据
 */
async function selectMenu() {
  const result = await getMenu();
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

module.exports = {
  selectMenu
}