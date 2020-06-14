/**
 * @description 处理attibutes的数据，进行操作查看
 * @author 李育
 */

const { Attributes } = require('../db/module/attributes')


/**
 * 获取参数列表数据
 * @param {integer} id 分类id
 * @param {string} sel 获取分类静态参数还是动态参数['only','many']
 */
async function getAttributes({ id, sel }) {
  const result = await Attributes.findAll({
    where: {
      cat_id: id,
      attr_sel: sel
    }
  })
  if (!result) {
    return result;
  }
  return result.map(item => item.dataValues)
}


/**
 * 添加动态参数或者静态属性
 * @param {integer} id 分类 ID
 * @param {string} attr_name 参数名称
 * @param {string} attr_sel [only,many]
 * @param {string} attr_vals 如果是 many 就需要填写值的选项，以逗号分隔
 */
async function createAttributes({ id, attr_name, attr_sel, attr_vals }) {
  const result = await Attributes.create({
    cat_id: id,
    attr_name,
    attr_sel,
    attr_vals,
    attr_write: "list",
    delete_time: null
  })
  if (!result) {
    return result;
  }
  console.log(result.dataValues)
  return result.dataValues;
}

/**
 * 编辑提交参数
 * @param {integer} id 分类 ID
 * @param {integer} attrId 属性 ID
 * @param {string} attr_name 新属性的名字
 * @param {string} attr_sel 属性的类型[many或only]
 * @param {string} attr_vals 参数的属性值
 */
async function setAttributes({ id, attrId, attr_name, attr_sel, attr_vals }) {
  const result = await Attributes.update({
    attr_name,
    attr_sel,
    attr_vals
  }, {
    where: {
      cat_id: id,
      id: attrId
    }
  })
  if (!result) {
    return result
  }
  console.log(result[0])
  return result[0]
}


/**
 * 删除参数
 * @param {integer} id 分类 ID 
 * @param {integer} attrid 参数 ID 
 */
async function removeAttributes({ id, attrid }) {
  const result = Attributes.destroy({
    where: {
      cat_id: id,
      id: attrid
    }
  })
  return result
}

module.exports = {
  getAttributes,
  createAttributes,
  setAttributes,
  removeAttributes
}