const router = require('koa-router')();
const { selectUsers, insertUsers, updateUsersType, selectUsersOne, updateUsers, deleteUsers } = require('../../controller/users')

// 路由前缀
router.prefix('/api');

//用户数据列表路由
router.get('/users', async (ctx, next) => {
  const { query, pagenum, pagesize } = ctx.request.body;
  ctx.body = await selectUsers({ query, pagenum, pagesize })
})

//添加用户
router.post('/users', async (ctx, next) => {
  const { username, password, email, mobile } = ctx.request.body;
  ctx.body = await insertUsers({ username, password, email, mobile })
})

//修改用户状态
router.put('/users/:uId/state/:type', async (ctx, next) => {
  const { uId, type } = ctx.params
  ctx.body = await updateUsersType({ uId, type })
})

//根据 ID 查询用户信息
router.get('/users/:id', async (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = await selectUsersOne(id)
})

//编辑用户提交
router.put('/users/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const { email, mobile } = ctx.request.body;
  ctx.body = await updateUsers({ id, email, mobile })
})

//删除单个用户
router.delete('/users/:id', async (ctx, body) => {
  const id = ctx.params.id;
  ctx.body = await deleteUsers(id)
})

//
module.exports = router