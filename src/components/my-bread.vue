<template>
  <!-- 封装面包屑组件-->
  <!-- 在全局下注册,以后用的时候直接用属性名就可以了  在components文件的index.js中 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread'
}
</script>

<style>
</style>
