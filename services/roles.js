/**
 * @description 处理roles的数据，进行操作查看
 * @author 李育
 */

const { Roles } = require('../db/module/roles')
const { getRightsData } = require('./rights') //获取权限的数据
/**
 * 查询角色列表数据
 */
async function getRoles(roleId) {
  whereOption = {
    attributes: ['roleId', 'roleName', 'ps_ids', 'roleDesc'],
  }
  if (roleId) {
    Object.assign(whereOption, {
      where: {
        roleId
      }
    })
  }
  const result = await Roles.findAll(whereOption);
  if (!result) {
    return result;
  }
  const oneRightData = await getRightsData(1); //获取一级权限列表的数据
  const twoRightData = await getRightsData(2); //获取二级权限列表的数据
  const threeRightData = await getRightsData(3); //获取三级权限列表的数据
  const rolesData = result.map(item => item.dataValues)
  rolesData.map(item => {
    const arrayData = item.ps_ids.split(',')
    // 一级权限数据,获取跟角色列表相匹配的ps_id数据
    const oneRights = oneRightData.filter(oneItem => arrayData.find(element => element == oneItem.id))
    // 二级权限数据
    const twoRights = twoRightData.filter(twoItem => arrayData.find(element => element == twoItem.id))
    // 三级权限数据
    const threeRights = threeRightData.filter(threeItem => arrayData.find(element => element == threeItem.id))

    //对二级权限添加children
    twoRights.map(twoItem => twoItem.chidren = threeRights.filter(threeItem => twoItem.id === threeItem.pid));
    //对一级权限添加children
    oneRights.map(oneItem => oneItem.chidren = twoRights.filter(twoItem => oneItem.id === twoItem.pid))
    return item.chidren = oneRights
  });
  return rolesData
}

/**
 * 添加角色
 * @param {string} roleName 角色名称
 * @param {string} roleDesc 角色描述
 */
async function addRoles({ roleName, roleDesc = "" }) {
  const result = await Roles.create({
    roleName,
    roleNesc
  })
  if (!result) {
    return result
  }
  return result.dataValues
}

/**
 * 根据 ID 查询角色
 * @param {integer} id 角色 ID
 */
async function getRolesOne(id) {
  const result = await Roles.findOne({
    attributes: ['roleId', 'roleName', 'roleDesc'],
    where: {
      roleId: id,
    },
  })
  if (!result) {
    return result
  }
  return result.dataValues
}

/**
 * 编辑提交角色
 * @param {integer} id 角色 ID 
 * @param {string} roleName 角色名称
 * @param {string} roleDesc 角色描述
 */
async function createRoles({ id, roleName, roleDesc }) {
  const result = await Roles.update({
    roleName,
    roleDesc
  }, {
    where: {
      roleId: id
    }
  })
  return result[0]
}

/**
 * 删除提交角色
 * @param {integer} id 角色 ID 
 */
async function removeRoles(id) {
  const result = await Roles.destroy({
    where: {
      roleId: id
    }
  })
  return result
}

/**
 * 角色授权
 * @param {integer} roleId 角色 ID
 * @param {string} rids 权限 ID 列表
 */
async function createRolesAn({ roleId, rids }) {
  const result = await Roles.update({
    ps_ids: rids
  }, {
    where: {
      roleId
    }
  })
  if (!result) {
    return result;
  }
  return result[0]
}

/**
 * 删除角色指定权限
 * @param {integer} roleId 角色 ID
 * @param {integer} rightId 权限 ID
 */
async function removeRolesAn({ roleId, rightId }) {
  //获取对应roleId的数据
  const resultData = await Roles.findOne({
    where: {
      roleId
    }
  });
  //把获取到的ps_ids数据转为数组，并且跟rightId进行查询，并删除对应的内容
  let rightIdData = resultData.dataValues.ps_ids.split(',')
  const rightIndex = rightIdData.findIndex(item => {
    return item == rightId
  });
  rightIdData.splice(rightIndex, 1)
  rightIdData = rightIdData.join(',')

  //把获取到的数据进行删除
  const result = await Roles.update({
    ps_ids: rightIdData
  }, {
    where: {
      roleId
    }
  })
  if (!result) {
    return result
  }
  let ArrayData = []; //存放数据
  const roleData = await getRoles(roleId); //重新获取roles数据
  ArrayData.push(roleData)
  ArrayData.push(result[0])
  return ArrayData
}

module.exports = {
  getRoles,
  addRoles,
  getRolesOne,
  createRoles,
  removeRoles,
  createRolesAn,
  removeRolesAn
}