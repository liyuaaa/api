const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const cors = require('koa-cors')

const login = require('./routes/api/login')
const users = require('./routes/api/users')
const menu = require('./routes/api/menu')
const rights = require('./routes/api/rights')
const attributes = require('./routes/api/attributes')
const goods = require('./routes/api/goods')
const roles = require('./routes/api/roles')
const category = require('./routes/api/category')
const order = require('./routes/api/order')

//导入jwt
const jwtKoa = require('koa-jwt')
//jwt密钥
const { jwtKeys } = require('./conf/secretKeys')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(path.join(__dirname, '.', 'tmp_uploads'))) //查看本地图片

//解决跨域
app.use(cors())


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// jwt配置
// app.use(jwtKoa({
//   secret: jwtKeys //密钥
// }).unless({
//   path: [/^\/api\/login/, /^\/api\/register/, /^\/api\/isExist/], //数组中的路径不需要jwt校验
// }))

// routes
app.use(login.routes(), login.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(menu.routes(), menu.allowedMethods())
app.use(rights.routes(), rights.allowedMethods())
app.use(attributes.routes(), attributes.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(roles.routes(), roles.allowedMethods())
app.use(category.routes(), category.allowedMethods())
app.use(order.routes(), order.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
