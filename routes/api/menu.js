const router = require('koa-router')();
const { selectMenu } = require('../../controller/menu')
// 路由前缀
router.prefix('/api');

/**
 * 获取左侧菜单栏数据
 */
router.get('/menu', async (ctx, body) => {
  ctx.body = await selectMenu()
})

module.exports = router