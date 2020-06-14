const router = require('koa-router')();
const { selectGoods, insertGoods } = require('../../controller/goods')

router.prefix('/api'); //路由前缀

router.get('/goods', async (ctx, next) => {
  const { query, pagenum, pagesize } = ctx.request.body;
  ctx.body = await selectGoods({ query, pagenum, pagesize })
})

router.post('/goods', async (ctx, next) => {
  const { goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs } = ctx.request.body;
  ctx.body = await insertGoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs })
})

module.exports = router