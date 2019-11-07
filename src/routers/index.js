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

// 引入local工具包 用于路由导航卫士
import local from '@/utils/local'

// 导入内容管理页 是二级路由 并注册
import article from '@/views/article'
// 导入素材管理组件并注册
import Images from '@/views/image'
// 导入publish发布文章组件
import Publish from '@/views/publish'
// 导入comment文章评论组件
import Comment from '@/views/comment'
// 导入setting文章评论组件
import Setting from '@/views/setting'
// 导入fans粉丝管理组件
import Fans from '@/views/fans'

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
    }, {
      path: '/article',
      component: article
    }, {
      path: '/images',
      component: Images
    }, {
      path: '/publish',
      component: Publish
    }, {
      path: '/comment',
      component: Comment
    }, {
      path: '/setting',
      component: Setting
    }, {
      path: '/fans',
      component: Fans
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})

// 登录页
// router提供的路由导航守卫,属于前置的,在跳转页面前进行判断,符合条件跳转,不符合条件跳转到指定页面
router.beforeEach((to, from, next) => {
  // to 跳转目标路由对象
  // from 从哪里跳过来的路由对象
  // next() 放行  next('/login') 拦截到登录
  // next()

  // 声明变量接收获取用户信息的方法
  const user = local.getUser()
  // 如果你访问的不是登录页面，且又没有登录，跳转到登录页面。
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

// 导出
export default router
