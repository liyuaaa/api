/**
 * @description 处理rights的数据，进行操作查看
 * @author 李育
 */

const { Rights, RightsApi } = require('../db/module/rights')

async function getRights(type) {
  let result;
  console.log(type)
  if (type != "list" && type != "tree") {
    return result = { "err": "请输入list或者tree" };
  }
  if (type == "list") {
    result = await listData()
  } else {
    result = await treeData()
  }

  if (!result) {
    return result
  }
  return result;
}

// 获取list的数据
async function listData() {
  const result = await Rights.findAll({
    include: {
      model: RightsApi,
      attributes: ['pathname'],
      as: "path",
    },
  })
  return getPath(result)
}

//获取tree数据
async function treeData() {
  // 获取一级数据
  const oneData = getPath(await treeFindAll(1))
  //获取二级数据
  const twoData = getPath(await treeFindAll(2))
  //获取三级数据
  const threeData = getPath(await treeFindAll(3))

  //指定pid对应相同id，并且添加chidren
  oneData.map(oneItem => {
    const data = twoData.filter(twoItem => {
      const threeVal = threeData.filter(threeItem => twoItem.id === threeItem.pid)
      twoItem.children = threeVal
      return oneItem.id === twoItem.pid
    })
    return oneItem.children = data
  })
  return oneData;
}

//获取tree的数据库操作  
async function treeFindAll(level) {
  const query = await Rights.findAll({
    attributes: ['id', 'authname', 'pid'],
    include: {
      model: RightsApi,
      attributes: ['pathname'],
      as: "path"
    },
    where: {
      level
    }
  })
  return query
}

//处理path显示的方法
function getPath(result) {
  const res = result.map(item => {
    const data = item.dataValues;
    data.path = data.path.map(item => item.dataValues.pathname);
    data.path = data.path.toString();
    return data;
  })
  return res;
}

async function getRightsData(level) {
  return getPath(await treeFindAll(level));
}


module.exports = {
  getRights,
  getRightsData
}
