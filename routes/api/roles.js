const router = require('koa-router')();
const { selectRoles, insertRoles, selectRolesOne, updateRoles, deleteRoles, updateRolesAn, deleteRolesAn } = require('../../controller/roles')

router.prefix('/api'); //路由前缀

//查询用户列表
router.get('/roles', async (ctx, next) => {
  ctx.body = await selectRoles();
})

//添加角色
router.post('/roles', async (ctx, next) => {
  const { roleName, roleDesc } = ctx.request.body;
  ctx.body = await insertRoles({ roleName, roleDesc })
})

//根据id查询角色
router.get('/roles/:id', async (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = await selectRolesOne(id)
})

//编辑用户提交
router.put('/roles/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const { roleName, roleDesc } = ctx.request.body;
  ctx.body = await updateRoles({ id, roleName, roleDesc })
})

//删除角色
router.delete('/roles/:id', async (ctx, body) => {
  const id = ctx.params.id;
  ctx.body = await deleteRoles(id)
})

//角色授权
router.post('/roles/:roleId/rights', async (ctx, body) => {
  const roleId = ctx.params.roleId;
  const rids = ctx.request.body.rids;
  ctx.body = await updateRolesAn({ roleId, rids })
})

//删除角色指定权限
router.delete('/roles/:roleId/rights/:rightId', async (ctx, body) => {
  const { roleId, rightId } = ctx.params;
  ctx.body = await deleteRolesAn({ roleId, rightId })
})
module.exports = router