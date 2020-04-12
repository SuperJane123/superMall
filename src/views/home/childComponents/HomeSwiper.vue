<template>
  <!-- 轮播图 开始 -->
  <swiper>
    <swiper-item v-for="(item,index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="ImgLoad" />
      </a>
    </swiper-item>
  </swiper>

  <!-- 轮播图 结束-->
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 轮播图加载完触发的函数
    ImgLoad() {
      // 因为轮播图一张图就可以撑开高度，所以只用发送一次事件就可以了
      if (!this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>