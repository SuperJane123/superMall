<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#ff5777">
      <img src="~assets/img/tabbar/home_active.svg" alt slot="tab-icon-active" />
      <img src="~assets/img/tabbar/home.svg" alt slot="tab-icon" />
      <div slot="tab-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#ff5777">
      <img src="~assets/img/tabbar/category_active.svg" alt slot="tab-icon-active" />
      <img src="~assets/img/tabbar/category.svg" alt slot="tab-icon" />
      <div slot="tab-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="#ff5777">
      <img src="~assets/img/tabbar/shopcart_active.svg" alt slot="tab-icon-active" />
      <img src="~assets/img/tabbar/shopcart.svg" alt slot="tab-icon" />
      <div slot="tab-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#ff5777">
      <img src="~assets/img/tabbar/profile_active.svg" alt slot="tab-icon-active" />
      <img src="~assets/img/tabbar/profile.svg" alt slot="tab-icon" />
      <div slot="tab-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
</style>