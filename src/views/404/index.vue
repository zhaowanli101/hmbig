<template>
  <!-- 设置404路由,就是路径不对的时候显示404页面,去router中的index注册路由 -->
  <div class="container_NotFound"></div>
</template>

<script>
export default {}
</script>

<style lang="less">
.container_NotFound {
  width: 100%;
  height: 100%;
  /* 背景可以设置绝对定位来获取宽高 */
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/404.png") no-repeat center / cover;
}
</style>
