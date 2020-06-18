const router = require('koa-router')();
const { selectOrder, selectOrderOne, updateOrder, selectOrderData, selectKuaidi } = require('../../controller/order')
router.prefix('/api'); //路由前缀
//获取订单数据列表
router.get('/orders', async (ctx, body) => {
  const { query, pagenum, pagesize } = ctx.query;
  ctx.body = await selectOrder({ query, pagenum, pagesize })
})
//根据id获取订单数据
router.get('/orders/:id', async (ctx, body) => {
  const id = ctx.params.id;
  ctx.body = await selectOrderOne(id)
})
//修改订单状态
router.put('/orders/:id', async (ctx, body) => {
  const id = ctx.params.id
  const { is_send, order_pay, order_price, pay_status } = ctx.request.body;
  console.log(is_send, order_pay, order_price, pay_status)
  ctx.body = await updateOrder({ id, is_send, order_pay, order_price, pay_status })
})
//查看订单详情
router.get('/orders/:id', async (ctx, body) => {
  const id = ctx.query
  ctx.body = await selectOrderData(id)
})
//获取物流信息
router.get('/kuaidi/:id', async (ctx, body) => {
  const id = ctx.params.id
  ctx.body = await selectKuaidi(id)
})

module.exports = router