// 进行axios接口的导入导出  提供给main.js使用
import axios from 'axios'
// 对axios进行配置,baseURL前面的路径一样,所以可以设置公共样式
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

export default axios
