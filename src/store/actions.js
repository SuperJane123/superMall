import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'


export default {
  addCart({
    commit,
    state
  }, payLoad) {
    return new Promise((resolve, reject) => {
      //1.查找数组中是否有该商品,注意这里用数组find方法找到的对象引用地址是一样的，所以oldPayLoad添加了属性，实际上cartList的属性也会添加属性
      let oldPayLoad = state.cartList.find(e => e.iid === payLoad.iid)
      if (oldPayLoad) {
        commit(ADD_COUNTER, oldPayLoad)
        resolve('商品数量+1')
      } else {
        commit(ADD_TO_CART, payLoad)
        resolve('添加商品成功')

      }
    })
  }
}
