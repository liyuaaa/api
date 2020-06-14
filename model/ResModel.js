/**
 * @description 获取用户模型，获取用户成功和失败的信息
 * @author 李育
 */

class ResModel {
  constructor({ data, error, meta }) {
    this.error = error;
    this.data = data;
    this.meta = meta;
  }
}

/**
 * @description 成功的数据模型
 */
class SuccessModel extends ResModel {
  constructor({ data, meta }) {
    super({
      data,
      meta,
    })
  }
}

/**
 * @description 失败的数据模型
 */
class ErrorModel extends ResModel {
  constructor({ error, meta }) {
    super({
      error: -1,
      meta
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}