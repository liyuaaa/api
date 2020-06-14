/**
 * @description 数据加密
 * @author 李育
 */

// 导入node里面的crypto来进行加密
const crypto = require('crypto');
// 导入密钥
const { md5CryptoKeys } = require('../conf/secretKeys')
/**
 * md5加密
 * @param {data} data 明文数据 
 */
function _md5(data) {
  const md5 = crypto.createHash('md5');
  return md5.update(data).digest('hex'); //digest编码方式，可以有 'hex'、'binary'或者'base64'
}

function getCrypto(content) {
  const str = content + md5CryptoKeys;
  return _md5(str)
}

module.exports = {
  getCrypto
}