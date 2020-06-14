/**
 * @description 处理menu的数据，进行操作查看
 * @author 李育
 */
const { Menu, MenuChildren } = require('../db/module/menu')

/**
 * 获取左侧菜单栏数据
 */
async function getMenu() {
  const result = await Menu.findAll({
    attributes: ['id', 'authname'],
    include: [
      {
        attributes: ['id', 'authname', 'path'],
        as: 'children',
        model: MenuChildren, //连表查询的数据
      }
    ],
    order: [
      ['id', 'asc']
    ]
  })
  if (!result) {
    return result
  }
  return result.map(item => item.dataValues)
}

module.exports = {
  getMenu
}