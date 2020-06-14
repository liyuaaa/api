/**
 * @description 处理业务逻辑和返回数据
 * @author 李育
 */

const { getUsername, createUsers } = require('../services/login')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { isExitsError, regiesterError, loginError } = require('../model/ErrorModel')
const { isExistSuccess, registerSuccess, loginSuccess } = require('../model/SuccessModel')
// 导入md5加密
const { getCrypto } = require('../utils/crypto')
//导入jsonwebtoken来获取jwt校验内容
const jwt = require('jsonwebtoken')
//jwt密钥
const { jwtKeys } = require('../conf/secretKeys')

/**
 * 判断用户是否存在
 * @param {string} username 用户名
 */
async function isExist(username) {
  const result = await getUsername(username)
  // 获取数据，如果获取到，证明该用户已经被占用
  if (result) {
    return new ErrorModel(isExitsError)
  }
  return new SuccessModel({
    meta: isExistSuccess,
  })
}

/**
 * 注册操作
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} mobile 电话号码
 * @param {string} email 邮箱
 * @param {integer} rid 用户角色id
 * @param {boolean} mg_state 状态
 * @param {boolean} role_name 用户身份
 */
async function register({ username, password, mobile, email, rid, mg_state, role_name }) {
  //判断用户名是否存在
  const usernameResult = await getUsername(username);
  if (usernameResult) {
    return new ErrorModel(isExitsError)
  }

  // 使用try来判断注册是否成功
  try {
    await createUsers({
      username,
      password: getCrypto(password),
      mobile,
      email,
      rid,
      mg_state,
      role_name
    })
    // 注册成功
    return new SuccessModel({
      meta: registerSuccess,
    });
  } catch (error) {
    console.log(error)
    return new ErrorModel(regiesterError)
  }
}

/**
 * 登录操作
 * @param {string} username 用户名
 * @param {string} password 密码
 */
async function login({ username, password }) {
  //获取jwt的校验数据
  const result = await getUsername(username, getCrypto(password));
  if (!result) {
    return new ErrorModel(loginError)
  }
  const token = jwt.sign(result, jwtKeys, { expiresIn: '48h' }) // expiresIn加密时间24小时
  console.log(token)
  const data = Object.assign(result, { "token": "Bearer " + token });
  return new SuccessModel({
    data,
    meta: loginSuccess
  })
}


module.exports = {
  isExist,
  register,
  login,
}