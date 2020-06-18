const router = require('koa-router')();
router.prefix('/api')
const { selectCategory, insertCategory, selectCategoryOne, updateCategory, deleteCategory } = require('../../controller/category')

//获取数据
router.get('/categories', async (ctx, body) => {
  const { type, pagesize, pagenum } = ctx.query;
  ctx.body = await selectCategory({ type, pagesize, pagenum })
})

//添加数据
router.post('/categories', async (ctx, body) => {
  const { cat_pid, cat_name, cat_level } = ctx.request.body;
  ctx.body = await insertCategory({ cat_pid, cat_name, cat_level })
})

//根据id查询分类
router.get('/categories/:id', async (ctx, body) => {
  const id = ctx.params.id
  ctx.body = await selectCategoryOne(id)
})

//修改数据
router.put('/categories/:id', async (ctx, body) => {
  const id = ctx.params.id
  const { cat_name } = ctx.request.body
  ctx.body = await updateCategory({ id, cat_name })
})

//删除数据
router.delete('/categories/:id', async (ctx, body) => {
  const id = ctx.params.id
  ctx.body = await deleteCategory(id)
})


module.exports = router