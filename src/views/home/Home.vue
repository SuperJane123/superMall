<template>
  <div class="home">
    <div class="nav-bar">
      <!-- 购物车导航栏 -->
      <NavBar>
        <div slot="center">购物车</div>
      </NavBar>
    </div>
    <!-- tab控制栏 -->
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      class="fixed-tab"
      ref="tabControl1"
      v-show="isTabFixed"
    />

    <Scroll
      class="content"
      ref="scroll"
      @scroll="handleGetPosition"
      :probe-type="3"
      :pullUpLoad="true"
      @pullingUp="handleLoadMore"
    >
      <!-- 轮播图 -->
      <HomeSwiper :banner="banner" @swiperImgLoad="swiperImgLoad" />

      <!-- 精品推荐 -->
      <home-rec-view :recommend="recommend" />

      <!-- 特性商品 -->
      <featrue-view />

      <!-- tab控制栏 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />

      <!-- 商品数据 -->
      <goods-list :goodsList="showGoods" />
    </Scroll>

    <!-- 返回顶部按钮 -->
    <BackTop @click.native="handlebackTop" v-show="is_show_backTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecView from "./childComponents/HomeRecView";
import FeatrueView from "./childComponents/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getGoodsData } from "network/home";

import { debounce } from "common/utils";
import {itemListenerMixin,backTop} from "common/mixin";


export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecView,
    FeatrueView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  mixins: [itemListenerMixin,backTop],
  data() {
    return {
      banner: [], //轮播图
      recommend: [], //导航推荐,
      goods: {
        //商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop", //当前tab类型
      // is_show_backTop: false, //控制显示返回顶部按钮
      tabOffSetTop: 0, //tab-control距离顶部的高度
      isTabFixed: false, //是否显示第二个假的tab-controll
      scrollY: 0, //记录离开home时滚动的高度
      // itemImgListener: null
    };
  },
  methods: {
    // 轮播图加载完触发的函数
    swiperImgLoad() {
      console.log("轮播图图片加载完");
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log("tab距离顶部高度", this.tabOffSetTop);
    },

    // 上拉加载更多
    handleLoadMore() {
      console.log("触发了加载更多");
      this.getGoodsData(this.currentType);
    },

    // scroll组件传递的时间--获取滚动位置
    handleGetPosition(position) {
      // console.log(position)
      // 1.判断backTop是否显示
      // this.is_show_backTop = -position.y > BACK_POSITION;
      this.listenShowBackTop(position)

      // 2.判断tab-control是否吸顶
      this.isTabFixed = -position.y > this.tabOffSetTop;
    },

    //  点击返回顶部按钮，回到顶部
    // handlebackTop() {
    //   console.log(this.$refs.scroll); //通过$refs可以获取组件里的对象
    //   this.$refs.scroll.scrollTo(0, 0);
    // },

    // 点击tab栏切换数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currenIndex = index;
      this.$refs.tabControl2.currenIndex = index;
    },

    // 请求商品数据
    getGoodsData(type) {
      const page = this.goods[type].page + 1;
      let params = { type, page };
      getGoodsData(params).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },

    // 请求首页所有数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mounted() {
    // // 拿到了在防抖函数的返回函数，图片完成加载事件中，调用refresh
    // const refresh = debounce(this.$refs.scroll.reFresh, 250);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("upLoadImg", this.itemImgListener);
  },
  activated() {
    console.log("activated");
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    this.$refs.scroll.reFresh();
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY();
    this.$bus.$off("upLoadImg",this.itemImgListener);
    console.log("离开时的高度", this.scrollY);
  },
  created() {
    this.getHomeMultidata();

    this.getGoodsData("pop");
    this.getGoodsData("new");
    this.getGoodsData("sell");
  }
};
</script>

<style scoped>
.home {
  /* padding: 0 15px; */
  padding-top: 44px;
  position: relative;
  height: 100vh;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 9;
}
.home-swiper {
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.home-rec-view {
  overflow: hidden;
}
.feature-view {
  overflow: hidden;
}
.fixed-tab {
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: 300px; */
  /* overflow: hidden */
}
</style>