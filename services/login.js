/**
 * @description 处理users的数据，进行操作查看(登录，注册)
 * @author 李育
 */
const { Users } = require('../db/module/users')

/**
 * 查询用户名是否存在
 * @param {string} username 用户名
 */
async function getUsername(username, password) {
  if (!username) {
    return null;
  }
  // 查询条件
  whereOption = {
    username
  }
  //如果有输入密码，就把数据添加到whereOption里面
  if (password) {
    Object.assign(whereOption, { password })
  }
  //查询数据
  const result = await Users.findOne({
    attributes: ['id', 'rid', 'username', 'mobile', 'email', 'mg_state', 'role_name', 'createdAt'],
    where: whereOption
  })

  // 没找到数据，直接返回
  if (result == null) {
    return result
  }
  return result.dataValues
}

/**
 * 添加用户(注册用户)
 * @param {string} username 用户名
 * @param {string} password 用户名
 * @param {string} mobile 用户名
 * @param {string} email 用户名
 * @param {integer} rid 用户名
 * @param {boolean} mg_state 状态
 * @param {boolean} role_name 用户身份
 */
async function createUsers({ username, password, mobile, email, rid, mg_state, role_name }) {
  const result = await Users.create({
    username,
    password,
    mobile,
    email,
    rid,
    mg_state,
    role_name
  })
  return result.dataValues
}

module.exports = {
  getUsername,
  createUsers,
}