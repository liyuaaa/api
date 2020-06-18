/**
 * @description 处理category的数据，进行操作查看
 * @author 李育
 */

const { Category } = require('../db/module/category');
const category = require('../db/module/category');

/**
 * 获取商品分类数据列表
 * @param {integer} type 级别分类分层列表
 * @param {integer} pagenum 当前页码数
 * @param {integer} pagesize 每页显示多少条数据
 */
async function getCagegory({ type = 3, pagenum, pagesize }) {
  let ArrayData = []; //存放数据
  //获取数据个数数量
  const { count: resultNumber } = await Category.findAndCountAll({
    where: {
      cat_level: 0
    }
  });
  ArrayData.push(resultNumber)
  const oneResult = await categoryFindAll(0, pagenum, pagesize)
  const twoResult = await categoryFindAll(1)
  const threeResult = await categoryFindAll(2)

  //判断type传过来是多少级分类
  if (type == 1) {
    oneResult.map(item => item.dataValues)
  }
  if (type == 2) {
    oneResult.map(item => {
      const data = twoResult.filter(twoItem => twoItem.cat_pid == item.cat_id)
      return item.children = data
    })
  }
  if (type == 3) {
    oneResult.map(item => {
      const data = twoResult.filter(twoItem => {
        const threeData = threeResult.filter(threeItem => threeItem.cat_pid == twoItem.cat_id)
        twoItem.children = threeData
        return twoItem.cat_pid == item.cat_id
      })
      return item.children = data
    })
  }

  if (!oneResult) {
    return result
  }
  ArrayData.push(oneResult)
  return ArrayData
}

//获取商品数据数据
async function categoryFindAll(level, pagenum = 0, pagesize = 0) {
  const findAllData = {
    where: {
      cat_level: level
    },
    attributes: ['cat_id', 'cat_name', 'cat_pid', 'cat_level', 'cat_deleted'],
  }
  if (pagenum != 0 || pagesize != 0) {
    Object.assign(findAllData, {
      limit: parseInt(pagesize),
      offset: (pagenum - 1) * pagesize
    })
  }
  const query = await Category.findAll(findAllData)
  return query.map(item => item.dataValues)
}


/**
 * 添加分类
 * @param {integer} cat_pid 分类父 ID
 * @param {string} cat_name 分类名称
 * @param {integer} cat_level 分类层级
 */
async function addCategory({ cat_pid, cat_name, cat_level }) {
  console.log(cat_level)
  const result = await Category.create({
    cat_pid,
    cat_name,
    cat_level
  })
  if (!result) {
    return result;
  }
  return result.dataValues
}

/**
 * 根据 id 查询分类
 * @param {integer} id 分类 ID 
 */
async function getCategoryOne(id) {
  const result = await Category.findOne({
    where: {
      cat_id: id
    },
    attributes: ['cat_id', 'cat_name', 'cat_pid', 'cat_level', 'cat_deleted']
  })
  if (!result) {
    return result
  }
  return result.dataValues
}

/**
 * 编辑提交分类
 * @param {integer} id 分类id
 * @param {string} cat_name 分类名称
 */
async function createCategory({ id, cat_name }) {
  const result = await Category.update({
    cat_name
  }, {
    where: {
      cat_id: id
    }
  })
  return result[0]
}

/**
 * 删除分类
 * @param {integer} id 分类id
 */
async function removeCategory(id) {
  const result = await Category.destroy({
    where: {
      cat_id: id
    }
  })
  return result
}

module.exports = {
  getCagegory,
  addCategory,
  getCategoryOne,
  createCategory,
  removeCategory
}