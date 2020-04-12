<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <Scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goodsInfo="goodsInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="detailImageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goodsList="recommends" />
    </Scroll>
    <detail-bottom-bar />

    <!-- 返回顶部按钮 -->
    <BackTop @click.native="handlebackTop" v-show="is_show_backTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { itemListenerMixin,backTop } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail", //如果在keepalive中使用incule/excuel 需要配置name

  data() {
    return {
      iid: null, //商品详情id
      topImages: null, //轮播图
      goodsInfo: {}, //商品详情数据
      shop: {}, //商家信息
      detailInfo: {}, //商品图片详情
      paramInfo: {}, //商品参数
      commentInfo: {}, //评论参数
      recommends: [], //推荐商品数据
      itemImgListener: null,
      themeTopYs: [0, 1000, 2000, 3000],
      getThemeTopY: null
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin,backTop],
  methods: {
    //监听滚动事件
    contentScroll(position) {
      this.listenShowBackTop(position)
    },

    // 获取详情数据
    getDetail() {
      this.iid = this.$route.query.id;
      getDetail({ iid: this.iid }).then(res => {
        //1.获取数据
        let data = res.result;

        //2.获取顶部的轮播图数据
        this.topImages = data.itemInfo.topImages;

        //3.商品详情数据
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        //4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        //5.获取商品图片详情信息
        this.detailInfo = data.detailInfo;

        //6.获取商品参数
        let { info, rule } = data.itemParams;
        this.paramInfo = new GoodsParam(info, rule);

        // 7.获取评论信息
        if (data.rate.commentInfo != 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },

    // 获取推荐商品
    getRecommend() {
      getRecommend().then(res => {
        console.log("推荐", res);
        this.recommends = res.data.list;
      });
    },

    // 图片加载完
    detailImageLoad() {
      this.refresh();
    }
  },
  created() {
    this.getDetail();
    this.getRecommend();
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      console.log(this.$refs.param.$el);
      console.log(this.$refs.comment.$el);
      console.log(this.$refs.recommend.$el);
    });
  },
  mounted() {
    // 拿到了在防抖函数的返回函数，图片完成加载事件中，调用refresh
    // const refresh = debounce(this.$refs.scroll.reFresh, 250);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("upLoadImg", this.itemImgListener);
  },
  destroyed() {
    this.$bus.$off("upLoadImg", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 20;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 12;
  background-color: #fff;
}

.detail-scroll {
  height: calc(100% - 44px - 58px);
}
</style>