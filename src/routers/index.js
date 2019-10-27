// 引入vue-router 文件
import VueRouter from 'vue-router'
// 引入vue
import Vue from 'vue'

// 导入登录页面login的路由  然后去实例中注册路由
import Login from '@/views/login'

// 使用vue.use
Vue.use(VueRouter)

// 实例化vue
const router = new VueRouter({
  // 路由配置对象
  // 关键选项routes  作用是配置路由规则
  routes: [{
    path: '/login',
    component: Login
  }]
})

// 导出
export default router
