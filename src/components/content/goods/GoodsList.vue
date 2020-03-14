<template>
<!-- 商品列表 -->
  <div class="good-list">
    <goods-list-item  v-for="(item,index) in goodsList" :key="index" :goodsItem="item"/>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem"
export default {
  name: "GoodsList",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>
<style scoped>
.good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>