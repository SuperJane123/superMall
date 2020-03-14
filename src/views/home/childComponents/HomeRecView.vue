<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
      <a :href="item.link">
        <div class="item-img">
          <img :src="item.image" alt />
        </div>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.recommend {
  display: flex;
  padding: 15px 0;
  text-align: center;
  background-color: #fff;
}
.recommend-item {
  flex: 1;
  font-size: 12px;
  
}
.recommend-item img {
    margin-bottom: 5px;
    width: 70%
}
</style>