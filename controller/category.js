/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */
const { getCagegory, addCategory, getCategoryOne, createCategory, removeCategory } = require('../services/category')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { getDataSuccess, createDataSuccess, updateDataSuccess, deleteDataSuccess } = require('../model/SuccessModel')
const { getDataError, createDataError, updateDataError, deleteDataError } = require('../model/ErrorModel')

/**
 * 获取商品分类数据列表
 * @param {integer} type 级别分类分层列表
 * @param {integer} pagenum 当前页码数
 * @param {integer} pagesize 每页显示多少条数据
 */
async function selectCategory({ type, pagenum, pagesize }) {
  const result = await getCagegory({ type, pagenum, pagesize })
  if (!result[1]) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: {
      total: result[0],
      data: result[1]
    },
    meta: getDataSuccess
  })
}

/**
 * 添加分类
 * @param {integer} cat_pid 分类父 ID
 * @param {string} cat_name 分类名称
 * @param {integer} cat_level 分类层级
 */
async function insertCategory({ cat_pid, cat_name, cat_level }) {
  const result = await addCategory({ cat_pid, cat_name, cat_level })
  if (!result) {
    return new ErrorModel(createDataError)
  }
  return new SuccessModel({
    meta: createDataSuccess
  })
}

/**
 * 根据 id 查询分类
 * @param {integer} id 分类 ID 
 */
async function selectCategoryOne(id) {
  const result = await getCategoryOne(id)
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

/**
 * 编辑提交分类
 * @param {integer} id 分类id
 * @param {string} cat_name 分类名称
 */
async function updateCategory({ id, cat_name }) {
  const result = await createCategory({ id, cat_name })
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 删除分类
 * @param {integer} id 分类id
 */
async function deleteCategory(id) {
  const result = await removeCategory(id)
  if (!result) {
    return new ErrorModel(deleteDataError)
  }
  return new SuccessModel({
    meta: deleteDataSuccess
  })
}

module.exports = {
  selectCategory,
  insertCategory,
  selectCategoryOne,
  updateCategory,
  deleteCategory
}