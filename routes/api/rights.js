const router = require('koa-router')();
const { selectRights } = require('../../controller/rights')

// 路由前缀
router.prefix('/api')

/**
 * 获取权限列表数据列表
 * @param {string} type 类型,值 list 或 tree
 */
router.get('/rights/:type', async (ctx, next) => {
  const type = ctx.params.type
  ctx.body = await selectRights(type)
})

module.exports = router