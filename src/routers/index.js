// 引入vue-router 文件
import VueRouter from 'vue-router'
// 引入vue
import Vue from 'vue'

// 导入登录页面login的路由  然后去实例中注册路由
import Login from '@/views/login'
// 导入首页home,然后注册
import Home from '@/views/home'
// 导入welcome,然后注册为二级路由
import welcome from '@/views/welcome'
// 引入404 然后注册
import NotFound from '@/views/404'

// 使用vue.use
Vue.use(VueRouter)

// 实例化vue
const router = new VueRouter({
  // 路由配置对象
  // 关键选项routes  作用是配置路由规则
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    // 在home下边配置一个二级路由
    children: [{
      path: '',
      component: welcome
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})

// 导出
export default router
