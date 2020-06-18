const router = require('koa-router')();
const { selectGoods, insertGoods, selectGoodsOne, updateGoods, deleteGoods } = require('../../controller/goods')

router.prefix('/api'); //路由前缀

//获取商品列表数据
router.get('/goods', async (ctx, next) => {
  const { query, pagenum, pagesize } = ctx.query
  ctx.body = await selectGoods({ query, pagenum, pagesize })
})

//添加商品
router.post('/goods', async (ctx, next) => {
  const { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs } = ctx.request.body;
  ctx.body = await insertGoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs })
})

//根据id获取商品
router.get('/goods/:id', async (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = await selectGoodsOne(id)
})

//编辑提交商品
router.put('/goods/:id', async (ctx, body) => {
  const id = ctx.params.id
  const { goods_name, goods_price, goods_number, goods_weight } = ctx.request.body
  ctx.body = await updateGoods({ id, goods_name, goods_price, goods_number, goods_weight })
})

//删除商品
router.delete('/goods/:id', async (ctx, body) => {
  const { id } = ctx.params
  ctx.body = await deleteGoods(id)
})

module.exports = router