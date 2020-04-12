<template>
  <div v-if="Object.keys(detailInfo).length != 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(ditem,index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{ditem.key}}</div>
      <div class="info-list">
        <img :src="litem | Imgfilter" alt v-for="(litem,index) in ditem.list" :key="index" @load="imgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0, //图片加载次数
      imagesLength: []
    };
  },
  methods: {
    // 为了提高性能，等图片全部加载完毕在发送事件给父组件
    imgLoad() {
      // if (++this.counter == this.imagesLength.length) {
      //   this.$emit("imageLoad");
      // }
      this.$emit("imageLoad");
    }
  },

  // watch: {
  //   detailInfo() {
  //     if (Object.keys(this.detailInfo).length != 0) {
  //       for (let ditem of this.detailInfo.detailImage) {
  //         for (let sitem of ditem.list) {
  //           this.imagesLength.push(sitem);
  //         }
  //       }
  //     }
  //   }
  // },
  filters: {
    Imgfilter(val){
      return "http:" + val
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-key {
  padding-left: 10px;
  margin: 10px 0 10px 15px;
  font-size: 18px;
  border-left: 5px solid;
}
.info-list img {
  width: 100%;
}
</style>