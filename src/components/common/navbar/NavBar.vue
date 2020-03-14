<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "nabbar"
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  line-height: 44px;
  border-bottom: 1px solid #f5f5f5;
}

.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
  text-align: center;
}
</style>