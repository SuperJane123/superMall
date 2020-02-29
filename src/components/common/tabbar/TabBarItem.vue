<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="tab-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="tab-icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="tab-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String
    },
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // is_active: false
    };
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    }
  },
  computed: {
    isActive() {
      
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
}
.tab-bar-item img {
  margin: 3px 0;
  height: 24px;
  width: 24px;
  vertical-align: middle;
}
.active {
  color: red;
}
</style>