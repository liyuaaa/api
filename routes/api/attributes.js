const router = require('koa-router')();
const { selectAttributes, insertAttributes, updataAttributes, deleteAttributes } = require('../../controller/attributes')

router.prefix('/api'); //路由前缀

//获取参数列表
router.get('/categories/:id/attributes', async (ctx, next) => {
  const { id } = ctx.params;
  const { sel } = ctx.query;
  console.log(sel)
  ctx.body = await selectAttributes({ id, sel })
})

//添加动态参数或者静态属性
router.post('/categories/:id/attributes', async (ctx, body) => {
  const { id } = ctx.params;
  const { attr_name, attr_sel, attr_vals } = ctx.request.body;
  ctx.body = await insertAttributes({ id, attr_name, attr_sel, attr_vals })
})

//编辑提交参数
router.put('/categories/:id/attributes/:attrId', async (ctx, body) => {
  const { id, attrId } = ctx.params;
  const { attr_name, attr_sel, attr_vals } = ctx.request.body;
  ctx.body = await updataAttributes({ id, attrId, attr_name, attr_sel, attr_vals })
})

//删除参数
router.delete('/categories/:id/attributes/:attrid', async (ctx, body) => {
  const { id, attrid } = ctx.params;
  ctx.body = await deleteAttributes({ id, attrid })
})

module.exports = router;