/**
 * @description 同步数据库数据
 * @author 李育
 */
const seq = require('./seq')
// require('./module/users')
// require('./module/menu')
require('./module/rights')

// 测试连接
seq.authenticate().then(() => {
  console.log('连接成功');
}).catch(() => {
  console.log('error')
})
// 执行同步数据库
seq.sync({ force: true })
  .then(() => {
    console.log('同步数据库成功')
    process.exit(); //退出seq程序
  })
  .catch((error) => {
    console.log(error)
    console.log('同步数据库失败')
  })