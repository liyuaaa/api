/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getAttributes, createAttributes, setAttributes, removeAttributes } = require('../services/attributes')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getDataSuccess, createDataSuccess, updateDataSuccess, deleteDataSuccess } = require('../model/SuccessModel')
const { getDataError, createDataError, updateDataError, deleteDataError } = require('../model/ErrorModel')


/**
 * 获取参数列表数据
 * @param {integer} id 分类id
 * @param {string} sel 获取分类静态参数还是动态参数['only','many']
 */
async function selectAttributes({ id, sel }) {
  const result = await getAttributes({ id, sel })
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

/**
 * 添加动态参数或者静态属性
 * @param {integer} id 分类 ID
 * @param {string} attr_name 参数名称
 * @param {string} attr_sel [only,many]
 * @param {string} attr_vals 如果是 many 就需要填写值的选项，以逗号分隔
 */
async function insertAttributes({ id, attr_name, attr_sel, attr_vals }) {
  const result = await createAttributes({ id, attr_name, attr_sel, attr_vals })
  console.log('--', result)
  if (!result) {
    return new ErrorModel(createDataError)
  }
  return new SuccessModel({
    meta: createDataSuccess
  })
}

/**
 * 编辑提交参数
 * @param {integer} id 分类 ID
 * @param {integer} attrId 属性 ID
 * @param {string} attr_name 新属性的名字
 * @param {string} attr_sel 属性的类型[many或only]
 * @param {string} attr_vals 参数的属性值
 */
async function updataAttributes({ id, attrId, attr_name, attr_sel, attr_vals }) {
  const result = await setAttributes({ id, attrId, attr_name, attr_sel, attr_vals })
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 删除参数
 * @param {integer} id 分类 ID 
 * @param {integer} attrid 参数 ID 
 */
async function deleteAttributes({ id, attrid }) {
  const result = await removeAttributes({ id, attrid })
  if (!result) {
    return new ErrorModel(deleteDataError)
  }
  return new SuccessModel({
    meta: deleteDataSuccess
  })
}

module.exports = {
  selectAttributes,
  insertAttributes,
  updataAttributes,
  deleteAttributes
}