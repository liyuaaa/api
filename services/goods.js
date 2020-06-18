/**
 * @description 处理goods的数据，进行操作查看
 * @author 李育
 */

const { Goods, GoodsAttrs, GoodsPics } = require('../db/module/goods')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * 商品列表数据
 * @param {string} query //查询参数
 * @param {integer} pagenum //当前页码
 * @param {integer} pagesize //每页显示条数
 */
async function getGoods({ query, pagenum, pagesize }) {
  let GoodsData = [];
  //查询条数
  const { count: totalpage } = await Goods.findAndCountAll();
  GoodsData.push(totalpage)
  GoodsData.push(pagenum)
  Findquery = {
    limit: parseInt(pagesize), //查询几行
    offset: (pagenum - 1) * pagesize,//跳过几行
  }
  if (query) {
    Object.assign(Findquery, {
      where: {
        goods_name: {
          [Op.like]: '%' + query + '%'  //模糊查询
        }
      }
    })
  }
  let result = await Goods.findAll(Findquery)
  if (!result) {
    UsersData.push(result)
    return result;
  }
  result = result.map(item => item.dataValues);
  GoodsData.push(result);
  return GoodsData
}

/**
 * 添加商品
 * @param {string} goods_name 商品名称
 * @param {string} goods_cat 下拉选择器选种的数据
 * @param {integer} goods_price 价格
 * @param {integer} goods_number 数量
 * @param {integer} goods_weight 重量
 * @param {string} goods_introduce 介绍
 * @param {string} pics 上传的图片临时路径（对象）
 * @param {object} attrs 商品的参数（数组），包含 `动态参数` 和 `静态属性`
 */
async function createGoods({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
  const result = await createGoodsData({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs });
  return result
}

//添加数据业务逻辑
async function createGoodsData({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
  const goods_cat_data = goods_cat.split(',');
  //判断用户名是否重复
  const goods_name_data = await Goods.findOne({
    where: {
      goods_name
    }
  })
  if (goods_name_data != null) {
    //查到用户名相同
    console.log("数据重复")
    return null;
  }
  //添加数据到goods表
  let result = await Goods.create({
    goods_name,
    goods_price,
    goods_number,
    goods_weight,
    goods_introduce,
    add_time: Date.parse(new Date()) / 1000,
    upd_time: Date.parse(new Date()) / 1000,
    cat_one_id: goods_cat_data[0],
    cat_two_id: goods_cat_data[1],
    cat_three_id: goods_cat_data[2],
  })

  //获取添加完成后的goods_id
  const goods_id_max = await Goods.findOne({
    attributes: ["goods_id"],
    order: [
      ['goods_id', 'desc']
    ]
  })
  //添加goods_attrs数据
  if (attrs != null) {
    attrs.forEach(async item => {
      result = await GoodsAttrs.create({
        goods_id: goods_id_max.dataValues.goods_id,
        attr_id: item.attr_id,
        attr_value: item.attr_val
      })
    });
  }

  //添加图片
  if (pics != null) {
    pics.forEach(async item => {
      result = await GoodsPics.create({
        goods_id: goods_id_max,
        pics_big: item.pic,
        pics_mid: item.pic,
        pics_sma: item.pic,
      })
    })
  }
  return result.dataValues
}

/**
 * 根据 ID 查询商品
 * @param {integer} id 商品 ID
 */
async function getGoodsOne(id) {
  const result = await Goods.findOne({
    where: {
      goods_id: id
    }
  })
  if (!result) {
    return result;
  }
  return result.dataValues
}

/**
 * 编辑提交商品
 * @param {integer} id 商品 ID
 * @param {string} goods_name 商品名称
 * @param {integer} goods_price 价格
 * @param {integer} goods_number 数量
 * @param {integer} goods_weight 重量
 */
async function setGoods({ id, goods_name, goods_price, goods_number, goods_weight }) {
  const result = await Goods.update({
    goods_name,
    goods_price,
    goods_number,
    goods_weight
  }, {
    where: {
      goods_id: id
    }
  })
  return result[0]
}

/**
 * 删除商品
 * @param {integer} id 商品 ID
 */
async function removeGoods(id) {
  const result = await Goods.destroy({
    where: {
      goods_id: id
    }
  })
  return result
}

module.exports = {
  getGoods,
  createGoods,
  getGoodsOne,
  setGoods,
  removeGoods
}
