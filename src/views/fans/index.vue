<template>
  <!-- 粉丝管理,去router中导入并注册 -->
  <div class="container_fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="first">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" size="small" plain>+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <!-- vue通过ref获取DOM元素 -->
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 导入echarts图表组件
import echarts from 'echarts'
// 强行导入一个图片
import circleUrl from '../../assets/avatar.jpg'

export default {
  data () {
    return {
      activeName: 'first',
      reqParams: {
        page: 1,
        per_page: 21
      },
      fansList: [],
      // 总页数
      total: 0,
      //  定义一个图片
      circleUrl
    }
  },
  mounted () {
    // echarts使用dom元素,需要初始化完成,渲染完dom元素,在mounted钩子函数中
    // 1获取dom元素
    const dom = this.$refs.dom
    // 2 初始化echarts
    const myEcharts = echarts.init(dom)
    // 3 准备配置项和数据 配置项由echarts提供
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 4 使用
    myEcharts.setOption(option)
  },
  created () {
    this.getFans()
  },
  methods: {
    //   当前页数 赋值给提交的页数获取新的数据
    pager (newPage) {
      this.reqParams.page = newPage
      //   获取新的数据
      this.getFans()
    },
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      console.log(data.results)
      this.fansList = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.fans_item {
  width: 150px;
  height: 190px;
  padding-top: 20px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
