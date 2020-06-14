/**
 * @description 处理users的数据，进行操作查看
 * @author 李育
 */
const { Users } = require('../db/module/users')
const Sequelize = require('sequelize');
const Op = Sequelize.Op; //导入Op包
/**
 * 查询用户数据列表
 * @param {string} query 查询条件
 * @param {integer} pagesize 每页显示条数
 * @param {integer} pagenum 当前页码
 */
async function getUsers({ query, pagesize, pagenum }) {
  let UsersData = [];
  //查询条数
  const { count: totalpage } = await Users.findAndCountAll();
  UsersData.push(totalpage);
  //查询多行
  Findquery = {
    limit: parseInt(pagesize), //每页显示页数
    offset: (pagenum - 1) * pagesize, //跳过几行 
    attributes: ['id', 'rid', 'username', 'mobile', 'email', 'mg_state', 'role_name', 'createdAt'],
  }
  if (query) {
    Object.assign(Findquery, {
      where: {
        username: {
          [Op.like]: '%' + query + '%'  //模糊查询
        }
      }
    })
  }
  let result = await Users.findAll(Findquery)
  if (!result) {
    UsersData.push(result);
    return UsersData;
  }
  result = result.map(item => item.dataValues);
  UsersData.push(result);
  return UsersData
}

/**
 * 添加用户
 * @param {string} username 用户名 
 * @param {string} password 密码 
 * @param {string} email 邮箱 
 * @param {string} mobild 电话号码 
 */
async function createUsers({ username, password, email, mobile }) {
  const result = await Users.create({
    username,
    password,
    email,
    mobile,
    rid: 1,
    mg_state: true,
    role_name: "员工"
  })
  if (!result) {
    return result;
  }
  return result.dataValues;
}

/**
 * 修改用户状态
 * @param {integer} uId 用户id
 * @param {boolean} type 用户状态
 */
async function setUsersType({ uId, type }) {
  const result = await Users.update({
    mg_state: type
  }, {
    where: {
      id: uId
    }
  })
  if (!result) {
    return result
  }
  return result[0]
}

/**
 * 根据 ID 查询用户信息
 * @param {integer} id 用户id
 */
async function getUsersOne(id) {
  const result = await Users.findOne({
    attributes: ['id', 'username', 'rid', 'mobile', 'email'],
    where: {
      id
    }
  })
  if (!result) {
    return result
  }
  return result.dataValues
}

/**
 * 编辑用户提交
 * @param {integer} id 用户id 
 * @param {string} email 邮箱 
 * @param {string} mobile 电话号码
 */
async function setUsers({ id, email, mobile }) {
  const result = await Users.update({
    email,
    mobile
  }, {
    where: {
      id
    }
  })
  if (!result) {
    return result;
  }
  return result[0]
}

/**
 * 删除单个用户
 * @param {integer} id 
 */
async function removeUsers(id) {
  const result = await Users.destroy({
    where: {
      id
    }
  })
  return result
}

module.exports = {
  getUsers,
  createUsers,
  setUsersType,
  getUsersOne,
  setUsers,
  removeUsers
}