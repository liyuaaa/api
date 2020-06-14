const router = require('koa-router')();
const { selectOrder, updateOrder, selectOrderOne, selectKuaidi } = require('../../controller/order')
router.prefix('/api'); //路由前缀
//获取订单数据列表
router.get('/orders', async (ctx, body) => {
  const { query, pagenum, pagesize } = ctx.request.body;
  ctx.body = await selectOrder({ query, pagenum, pagesize })
})
//修改订单状态
router.put('/orders/:id', async (ctx, body) => {
  const id = ctx.params.id
  const { is_send, order_pay, order_price, order_number, pay_status } = ctx.request.body;
  ctx.body = await updateOrder({ id, is_send, order_pay, order_price, order_number, pay_status })
})
//查看订单详情
router.get('/orders/:id', async (ctx, body) => {
  const id = ctx.params.id
  ctx.body = await selectOrderOne(id)
})
//获取物流信息
router.get('/kuaidi/:id', async (ctx, body) => {
  const id = ctx.params.id
  ctx.body = await selectKuaidi(id)
})

module.exports = router