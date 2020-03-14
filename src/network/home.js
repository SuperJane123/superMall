import {request} from "./request"

// 请求首页所有数据
export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
};

// 请求首页商品数据
export function getGoodsData(params) {
  return request({
    url: "/home/data",
    params
  })
}

