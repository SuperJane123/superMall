<template>
  <div>
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{cartCount}})</div> -->
      <div slot="center">购物车({{count}})</div>
    </nav-bar>

    <cart-list />

    <cart-bottom-bar />

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComponents/cartList";
import CartBottomBar from "./childComponents/cartBottomBar"

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //mapGetters的两种用法
    //第一种，写在数组里
    // ...mapGetters(["cartCount"])
    // 第二种，写在对象里
    ...mapGetters({
      count: "cartCount"
    })
  }
};
</script>

<style scoped>
.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}
</style>