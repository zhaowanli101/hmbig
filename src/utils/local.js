// 一 封装一个工具,用于登录时保存,获取,删除用户的信息的模块

// 设置常量KEY,方便以后获取用户信息
const KEY = 'deng-lu-hei-ma'
// 三 声明对象用于导出
const local = {

  // 1 存储用户信息  1-3用于login页面的存储用户信息(sessionStorage)
  setUser (user) { // 1-2 user参数为传进来的数据,需要转化成json字符串才可以使用
    const jsonStr = JSON.stringify(user)
    // 1-1 登录功能,用户登录后就不用保存登录信息,所以用sessionStorage保存
    // 存储 setItem(key,value) key将来获取时候需要使用  value json字符串格式
    window.sessionStorage.setItem(KEY, jsonStr)
  },

  // 2获取用户信息  2-3 用于router处的路由导航卫士设置
  getUser () {
    // 2-1 声明变量用于存储 获取取用户信息
    const jsonStr = window.sessionStorage.getItem(KEY)
    // 2-2 返回获取到的信息 解析成json对象格式
    return JSON.parse(jsonStr)
  },

  // 3删除用户信息
  delUser () {
    // 3-1利用removeItem来移除用户信息
    window.sessionStorage.removeItem(KEY)
    // 此处不用clear() 因为它会清除所有的数据
    // 也可以使用setItem(KET,"")后者为空也是删除信息
  }

}

// 二 需要导出这个工具
export default local
// 在登录页面导入local,用来设置用户信息
