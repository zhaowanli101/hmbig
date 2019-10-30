// -作用： 在vue插件内， 进行全局组件的注册
//   -
//   插件写法： 固定模式 -
//   使用一个js模块 -
//   导出必须是一个对象 -
//   对象中必须有一个属性： install -
//   install的值必须是函数 -
//   默认传参： Vue 对象 -
//   基于 Vue 对象 实现想要的功能 -
//   在main.js入口文件中使用这个插件使用插件： Vue.use(插件)

import MyBread from './my-bread.vue'
export default {
  install (Vue) {
    Vue.component('my-bread', MyBread)
  }
}
