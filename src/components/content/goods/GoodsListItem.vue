<template>
<!-- 每个商品 -->
  <div class="goods-list-item">
      <div class="goods-img">
          <img :src="goodsItem.show.img" alt="" @load="upLoadImg">
      </div>
      <div class="goods-info">
          <p class="goods-title">{{goodsItem.title}}</p>
          <div class="goods-dec">
              <span class="goods-price">¥{{goodsItem.price}}</span>
              <span class="goods-cfav">{{goodsItem.cfav}}</span>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
      upLoadImg(){  //图片加载完就会触发的函数
          this.$bus.$emit("upLoadImg")
      }
  },
};
</script>
<style scoped>
.goods-list-item {
    /* width: 48%; */
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}
.goods-img img {
    width: 100%;
    border-radius: 5px;
}
.goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center ;
}
.goods-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-dec {
    display: flex;
    justify-content: space-between;
}
.goods-price {
    color: var(--color-high-text);
}
.goods-cfav {
    position: relative;
}
.goods-cfav::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

}
</style>