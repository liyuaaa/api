/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getRoles, addRoles, getRolesOne, createRoles, removeRoles, createRolesAn, removeRolesAn } = require('../services/roles')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getDataSuccess, createDataSuccess, deleteDataSuccess, updateDataSuccess } = require('../model/SuccessModel')
const { getDataError, createDataError, deleteDataError, updateDataError } = require('../model/ErrorModel')

/**
 * 查询用户列表
 */
async function selectRoles() {
  const result = await getRoles();
  if (!result) {
    return new ErrorModel(getDataError);
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

/**
 * 添加角色
 * @param {string} roleName 角色名称
 * @param {string} roleDesc 角色描述
 */
async function insertRoles({ roleName, roleDesc = "" }) {
  const result = await addRoles({ roleName, roleDesc })
  if (!result) {
    return new ErrorModel(createDataError)
  }
  return new SuccessModel({
    meta: createDataSuccess
  })
}

/**
 * 根据 ID 查询角色
 * @param {integer} 角色 ID
 */
async function selectRolesOne(id) {
  const result = await getRolesOne(id)
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

/**
 * 编辑提交角色
 * @param {integer} id 角色 ID 
 * @param {string} roleName 角色名称
 * @param {string} roleDesc 角色描述
 */
async function updateRoles({ id, roleName, roleDesc }) {
  const result = await createRoles({ id, roleName, roleDesc })
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 删除提交角色
 * @param {integer} id 角色 ID 
 */
async function deleteRoles(id) {
  const result = await removeRoles(id);
  if (!result) {
    return new ErrorModel(deleteDataError)
  }
  return new SuccessModel({
    meta: deleteDataSuccess
  })
}

/**
 * 角色授权
 * @param {integer} roleId 角色 ID
 * @param {string} rids 权限 ID 列表
 */
async function updateRolesAn({ roleId, rids }) {
  const result = await createRolesAn({ roleId, rids })
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 删除角色指定权限
 * @param {integer} roleId 角色 ID
 * @param {integer} rightId 权限 ID
 */
async function deleteRolesAn({ roleId, rightId }) {
  const result = await removeRolesAn({ roleId, rightId });
  if (!result[1]) {
    return new ErrorModel(deleteDataError)
  }
  return new SuccessModel({
    data: result[0],
    meta: deleteDataSuccess
  })
}

module.exports = {
  selectRoles,
  insertRoles,
  selectRolesOne,
  updateRoles,
  deleteRoles,
  updateRolesAn,
  deleteRolesAn
}