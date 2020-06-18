/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getUsername } = require('../services/login')
const { getUsers, createUsers, setUsersType, getUsersOne, setUsers, removeUsers, setUsersRoles } = require('../services/users')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getDataError, createDataError, isExitsError, updateDataError, deleteDataError } = require('../model/ErrorModel')
const { getDataSuccess, createDataSuccess, updateDataSuccess, deleteDataSuccess } = require('../model/SuccessModel')
const { getCrypto } = require('../utils/crypto')


/**
 * 获取用户数据列表
 * @param {string} query 查询条件
 * @param {interger} pagenum 当前页码
 * @param {interger} pagesize 每页显示条数
 */
async function selectUsers({ query, pagenum, pagesize }) {
  const result = await getUsers({ query, pagenum, pagesize });
  if (!result) {
    return new ErrorModel(getDataError);
  }
  return new SuccessModel({
    data: {
      totalpage: result[0],
      pagenum: parseInt(pagenum),
      users: result[1]
    },
    meta: getDataSuccess
  })
}

/**
 * 添加用户
 * @param {string} username 用户名 
 * @param {string} password 密码 
 * @param {string} email 邮箱 
 * @param {string} mobild 电话号码 
 */
async function insertUsers({ username, password, email, mobile }) {
  //判断用户名是否存在
  const usernameResult = await getUsername(username)
  if (usernameResult) {
    return new ErrorModel(isExitsError)
  }
  const result = await createUsers({ username, password: getCrypto(password), email, mobile })
  if (!result) {
    return new ErrorModel(createDataError)
  }
  return new SuccessModel({
    meta: createDataSuccess
  })
}

/**
 * 修改用户状态
 * @param {integer} uId 用户id
 * @param {boolean} type 用户状态
 */
async function updateUsersType({ uId, type }) {
  const result = await setUsersType({ uId, type })
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 根据 ID 查询用户信息
 * @param {integer} id 用户id
 */
async function selectUsersOne(id) {
  const result = await getUsersOne(id)
  if (!result) {
    return new ErrorModel(getDataError)
  }
  return new SuccessModel({
    data: result,
    meta: getDataSuccess
  })
}

/**
 * 编辑用户提交
 * @param {integer} id 用户id 
 * @param {string} email 邮箱 
 * @param {string} mobile 电话号码
 */
async function updateUsers({ id, email, mobile }) {
  const result = await setUsers({ id, email, mobile })
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

/**
 * 删除单个用户
 * @param {integer} id 
 */
async function deleteUsers(id) {
  const result = await removeUsers(id)
  if (!result) {
    return new ErrorModel(deleteDataError)
  }
  return new SuccessModel({
    meta: deleteDataSuccess
  })
}

/**
 * 分配角色权限
 * @param {integer} id 用户id
 * @param {integer} rid 权限id
 */
async function updateUsersRole(id, rid) {
  const result = await setUsersRoles(id, rid)
  if (!result) {
    return new ErrorModel(updateDataError)
  }
  return new SuccessModel({
    meta: updateDataSuccess
  })
}

module.exports = {
  selectUsers,
  insertUsers,
  updateUsersType,
  selectUsersOne,
  updateUsers,
  deleteUsers,
  updateUsersRole
}