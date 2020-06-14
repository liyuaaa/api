/**
 * @description 失败信息集合
 * @author 李育
 */
module.exports = {
  //用户名已经存在
  isExitsError: {
    error: 400,
    meta: "该用户名已经存在",
  },
  //注册失败
  regiesterError: {
    error: 400,
    meta: "注册失败，请重试",
  },
  //登录失败
  loginError: {
    error: 400,
    meta: "登录失败，请重试",
  },
  //获取数据失败
  getDataError: {
    error: 400,
    meta: "获取数据失败",
  },
  //添加数据失败
  createDataError: {
    error: 400,
    meta: "添加数据失败",
  },
  //修改数据失败
  updateDataError: {
    error: 400,
    meta: "修改数据失败",
  },
  //删除数据失败
  deleteDataError: {
    error: 400,
    meta: "删除数据失败",
  },
  //图片太大
  uploadFileSizeError: {
    error: 400,
    meta: "图片上传数量太大",
  },
}