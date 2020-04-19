import {
  request
} from "./request"

export function getDetail(params) {
  return request({
    url: "/detail",
    params
  })
}


export function getRecommend(){
  return request({
      url: '/recommend'
  })
}

/*商品详情数据*/
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountBgColor = itemInfo.discountBgColor
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice

  }
}

/**商品店铺信息 */
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}


/*获取商品参数*/
export class GoodsParam {
  constructor(info, rule) {
    //注: images可能没有值(某些商品有值，某些没有值)
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables

  }
}

