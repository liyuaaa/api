const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeError } = require('../model/ErrorModel')
const { uploadDataSuccess } = require('../model/SuccessModel')
const fse = require('fs-extra')
const path = require('path')


// const MAX_SIZE = 1024 * 1024 * 1024  //1M最大存储量
const SAVA_PIC = "tmp_uploads" //存储文件目录
//判断有没有相应目录，没有就进行创建
fse.pathExists(SAVA_PIC)
  .then(res => {
    if (!res) {
      fse.ensureDir(SAVA_PIC)
    }
  })
/**
 * 
 * @param {string} name 文件名字
 * @param {string} file 文件原始目录
 * @param {integer} size 文件大小
 * @param {string} type 文件类型
 */
async function saveFile({ name, filePath, size, type }) {
  //移动文件
  const fileName = Date.now() + '_' + name //文件名字
  const distFileName = path.join(SAVA_PIC, fileName) //完整的文件目录
  await fse.move(filePath, distFileName); //移动到指定目录，原始目录移动到指定目录

  const result = {
    tmp_path: distFileName,
    url: "http://127.0.0.1:8899/" + distFileName
  }
  //返回信息
  return new SuccessModel({
    data: result,
    meta: uploadDataSuccess
  })
}

module.exports = {
  saveFile
}