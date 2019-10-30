// 进行axios接口的导入导出  提供给main.js使用
import axios from 'axios'

// 引入router
import router from '@/routers'

// 引入local用于操作拦截器,
import local from '@/utils/local'
// 对axios进行配置,baseURL前面的路径一样,所以可以设置公共样式
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 设置请求拦截器   登录页面
// 添加请求拦截器   config相当于req
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 有用户信息或没有的时候
  const user = local.getUser() || {}
  // 设置请求头
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器  登录页
// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 请求失败
  if (err.response.status === 401) {
    // 跳转登录页面  http://localhost:8080/#/login
    // window.location.href = 'http://localhost:8080/#/login'
    // window.location.hash = '#/login'
    // 建议使用 vue-router 来跳转 , push是router实例的函数
    return router.push('/login')
  }
  return Promise.reject(err)
})

// 导出axios
export default axios
