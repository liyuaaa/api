const router = require('koa-router')();
const { isExist, register, login } = require('../../controller/login')

// 路由前缀
router.prefix('/api');

// 用户是否存在路由
router.post('/isExist', async (ctx, next) => {
  const { username } = ctx.request.body
  ctx.body = await isExist(username)
})

// 注册路由
router.post('/register', async (ctx, next) => {
  const { username, password, mobile, email, rid, mg_state, role_name } = ctx.request.body;
  ctx.body = await register({ username, password, mobile, email, rid, mg_state, role_name })
})

//登录路由
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log(username, password)
  ctx.body = await login({ username, password })
})

module.exports = router