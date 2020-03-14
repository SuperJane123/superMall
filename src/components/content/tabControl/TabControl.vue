<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item,index) in titles"
      :key="index"
      @click="handleActice(index)"
    >
      <span class="item-text" :class="{active: currenIndex === index}">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currenIndex: 0 //当前tab索引
    };
  },
  methods: {
    //   点击tab栏
    handleActice(index) {
      this.currenIndex = index;
      this.$emit("tabClick",index)
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  /* margin: 0 10px; */
}
.item-text {
  /* display: inline-block; */
  padding: 6px 0;
  position: relative;
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear; /*chrome和safari*/
}
.item-text::before {
  content: "";
  position: absolute;
  top: 0;
  left: 100%;
  width: 0;
  height: 100%;
  border-bottom: 2px solid #ff5777;
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear; /*chrome和safari*/
}
/* .item-text:active {
  background: #000;
  color: #fff;
} */
.active ~ .item-text::before {
  left: 0;
}
.active::before {
  width: 100%;
  left: 0;
  top: 0;
}
.active {
  transform: scale(1);
  color: #000;
  font-size: 13px;
}
</style>