<template>
  <!-- 创建登录页面的路由 -->
  <!-- 静态页面1,建立全屏背景 -->
  <div class="container">
    <!-- 用elementUI提供的框架搭建 el-card是组件,可以在style中直接.el-card选中-->
    <!-- 静态2 设置卡片 -->
    <el-card>
      <!-- 静态3 log -->
      <img src="../../assets/logo_index.png" alt />
      <!-- 静态4 表单控件 -->
      <el-form :model="loginForm" ref="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="loginMobile">
          <el-input v-model="loginForm.loginMobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="loginCode">
          <el-input
            v-model="loginForm.loginCode"
            placeholder="请输入验证码"
            style="width:240px; margin-right: 8px;"
          ></el-input>
          <el-button type="primary">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">已经仔细阅读协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width: 100%">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const mobileCode = (rule, value, callback) => {
  if (/^1[3-9]\d{9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('手机号格式不对'))
  }
}

export default {
  data () {
    return {
      loginForm: {
        loginMobile: '',
        loginCode: ''
      },
      loginRules: {
        loginMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: mobileCode, trigger: 'blur' }
        ],
        loginCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      //  el-form组件提供函数  validate
      //  传参：回调函数（valid）
      //  valid 如果为true 校验成功  否则失败
      // 获取el-form组件的实例
      //  加属性 ref="abc"
      //  获取 this.$refs['abc']

      // 对整个表单进行校验
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          // 校验成功  进行登录（发请求）
          console.log('ok')
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  /* 背景可以设置绝对定位来获取宽高 */
  position: absolute;
  top: 0;
  left: 0;
  /* 设置全屏背景  可以合写 */
  /* 背景图尺寸：拆分写法 background-size
  组合写法：background:..... / 背景图尺寸(width,height)
  特殊写法：cover  等比例缩放铺满容器多余不显示  contain 等比例缩放完全显示在容器内 */
  background: url("../../assets/moshou1 (2).jpg") no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 30px;
    }
  }
}

/* 要去routers文件夹下去导入路由 */
</style>
