const router = require('koa-router')();
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/picture')

router.prefix('/api')
router.post('/upload', koaForm(), async (ctx, body) => {
  const file = ctx.req.files['tmp_path']
  const { size, path, name, type } = file
  ctx.body = await saveFile({ size, path, name, type })
})

module.exports = router;