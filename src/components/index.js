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

// 导入频道封装组件
import MyChannel from './my-channel.vue'

// 导入发布文章组件
import MyImage from './my-image.vue'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
