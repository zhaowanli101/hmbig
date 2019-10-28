<template>
  <!-- 首页组件 -->
  <!-- -->
  <el-container class="container_home">
    <el-aside class="aside" :width="isOpen?'200px':'64px'">
      <!-- 导航菜单 -->
      <!-- logo区 -->
      <div class="logo_top" :class="{smallLog:!isOpen}"></div>
      <div class="smallLog"></div>
      <!-- 整个菜单的容器 -->
      <!-- default-active="2" 当前激活菜单的 index   菜单项的index的值和default-active的值相等 当前菜单想被选中-->
      <!-- -给el-menu加上属性router按照index的值进行跳转 -->
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <!-- el-submenu  拥有子级菜单使用submenu -->
        <!-- el-menu-item  不拥有子级菜单使用menu-item -->
        <!-- index="2" 当前菜单项的唯一标识 -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/images">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 缩进图标 -->
        <span class="el-icon-s-fold fold" @click="toggleOpen"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="dropdown_r">
          <span class="el-dropdown-link">
            <img src="../../assets/avatar.jpg" alt />
            用户名
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 设置导航栏开关,设置默认为true开启状态
      isOpen: true
    }
  },
  methods: {
    toggleOpen () {
      // 设置isOpen状态
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="less">
.container_home {
  width: 100%;
  height: 100%;
  /* 背景可以设置绝对定位来获取宽高 */
  position: absolute;
  top: 0;
  left: 0;
  .aside {
    background-color: #002033;
    .logo_top {
      width: 100%;
      height: 60px;
      background: #002344 url("../../assets/logo_admin.png") no-repeat center /
        140px auto;
    }
    // 用于覆盖大的log
    .smallLog {
      background-image: url("../../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
  }
  .header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .fold {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown_r {
      float: right;
      font-weight: bold;
      vertical-align: middle;

      img {
        width: 30px;
        vertical-align: middle;
      }
    }
  }
}
</style>
