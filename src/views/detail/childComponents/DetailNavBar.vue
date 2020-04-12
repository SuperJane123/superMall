<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item ,index) in titles"
          :key="index"
          class="title-item"
          @click="titelClick(index)"
          :class="{active: currenIndex === index}"
        >{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currenIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titelClick(index) {
      this.currenIndex = index;
    },
    backClick() {
      //   this.$router.go(-1)
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 12px;
}
.active {
  color: var(--color-high-text);
}
.back {
  text-align: center;
}
.back img {
  vertical-align: middle;
}
</style>