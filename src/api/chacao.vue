<template>
  <div class="page">
    <p>头</p>
    <p>
      <slot>我是后备内容</slot>
    </p>
    <p name="content"></p>
    <p>尾</p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
</style>
