<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "TabBar"
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: pink;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
}

</style>