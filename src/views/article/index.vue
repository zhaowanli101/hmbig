<template>
  <!-- 加div是template有且只有一个根标签 -->
  <div>
    <!-- 内容管理页面.要去router处导入并注册 -->
    <!-- 内容筛选 -->
    <el-card class="box-card">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- clearable是清空频道选项 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <!-- v-model 绑定的值是[起始日期,结束日期] -->
          <!-- 绑定时间事件 -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- 绑定事件 -->
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章显示 -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <!-- total是文章总条数 -->
        <span>根据筛选条件共查询到 {{total}} 条结果:</span>
      </div>
      <!-- 显示文章 -->

      <!-- - 在组件初始化的时候
      - 根据当默认的筛选条件，查询文章列表
      - 把数据赋值 articles
      - 渲染列
      - 普通列，内容就是后台文本数据，使用prop指定字段名称(属性),可以直接获得数据。
      - 自定义列，内容由自己来决定。-->
      <!-- 标题和时间可以用普通方式获取到数据,剩下的就需要使用自定义属性获取 -->

      <el-table :data="articleData" style="width: 100%">
        <el-table-column label="封面">
          <!-- 插槽中插入img -->
          <template slot-scope="scope">
            <!-- 利用elementUI的自定义插入图片(后台没有照片的时候) 可以把图标换成自己的图片 -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px; height:100px">
              <!-- 通过 slot="error"可以设置加载失败后的操作-->
              <div slot="error" class="image-slot">
                <img src="../../assets/error.gif" alt width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <!-- 状态中插入TAG标签  放在template插槽中-->
        <el-table-column label="状态">
          <!-- 用后台提供的status判断文章是哪种类型 -->
          <template slot-scope="scope">
            <!-- 用v-if判断status的状态是多少 -->
            <el-tag v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1" type="warning">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="info">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <!-- 插入按钮 -->
          <template slot-scope="scope">
            <!-- 添加elementUI中自带的属性,改变外观 -->
            <el-button
              @click="toEdit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button @click="delArticle" type="danger" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分x`页 -->
      <!-- layout="prev, pager, next" 当前分页组包含的布局 -->
      <!-- total 总条数 -->
      <!-- page-size 默认一页显示10条 -->
      <!-- current-page 指定当前激活的按钮 -->
      <!-- @current-change 作用：当页码发生改变触发  默认传入当前新的页码 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 导入面包屑组件my-bread
// import MyBread from '@/components/my-bread'

// 练习用
// import page from '../../api/chacao'
export default {
  // components: { MyBread },
  data () {
    return {
      // 日期范围  有开始时间和结束事件,所以放在数组中
      dateArr: [],
      // 表格数据
      articleData: [],
      // 文章页数
      page: 1,
      // 提交后台的对象
      reqParams: {
        // 状态为空的时候不会进行提交
        status: null,
        channel_id: null,
        per_page: 20,
        page: 1,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [],
      // 定义总条数
      total: 0
    }
  },
  created () {
    // 获取频道列表方法的调用
    this.getChannelOptions()
    // 获取文章列表方法的调用
    this.getArticles()
  },
  methods: {
    // 获取文章频道
    async getChannelOptions () {
      // 异步获取不用传值,解构赋值并赋值给channelOptions
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 获取文章列表
    async getArticles () {
      // 将获取的数据对象解构赋值
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 将获取的数据赋值给表格
      console.log(data)

      this.articleData = data.results
      // 文章总条数
      this.total = data.total_count
    },
    // 分页事件   传入新的页
    pager (newPage) {
      // 修改当前页码为新页码
      this.reqParams.page = newPage
      // 换页后需要重新获取文章列表
      this.getArticles()
    },
    // 筛选功能
    search () {
      // 处理频道空字符串问题
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.reqParams.page = 1
      this.getArticles()
      // 筛选完后返回第一页并重新获取数据
    },
    // 时间改变事件  传入时间
    // 选择日期
    changeDate (dateArr) {
      // dateArr 是数组 [date,date]  起始时间  结束时间
      // 我们需要： dateArr 是数组 [string,string]  string === '2019-10-02'
      // value-form="yyyy-MM-dd" 格式转换成功
      // 注意：清空日期之后，dateArr是null  对应的 begin end 值也该为null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    }, // 去编辑 异步方式
    async toEdit (id) {
      // 第一种  query传参方式
      // this.$router.push(`/publish?id=${id}`)
      // 第二种  query传参方式
      await this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除文章 异步方式 删除需要获取id值
    async delArticle (id) {
      // 发请求  restfull 接口规则（get post put patch delete）
      await this.$http.delete(`/article${id}`)
      // 提示信息
      this.$message.success('删除成功')
      // 重新获取数据
      this.getArticles()
    }
  }
}
// 获取不到ID值
// 问题：JS有最大安全数值
// - 过大的数字在计算的时候，或者json转换的时候，产生误差。
// - Number.MAX_SAFE_INTEGER  最大安全数值
// Number.MAX_SAFE_INTEGER + 1 // 9007199254740992
// Number.MAX_SAFE_INTEGER + 2 // 9007199254740992

// 解决方案：

// - 通过axios获取的数据，默认使用JSON.parse(后台给的json字符串)
// - 不是有axios的默认转换方式，自己来实现转换？？？
//   - 第三方插件，转换json，json-bigint  解决最大安全数字
//   - json-bigint  文档：https://www.npmjs.com/package/json-bigint
//     - npm i json-bigint
//     - import JSONBIG from 'json-bigint'
//     - JSONBIG.parse(后台json)
// - 怎么在axios中使用自定义格式转换？
//  transformResponse: [function (data) {
// 对 data 进行任意转换处理
//     return data;
//   }],

// 处理json格式，json-bigint处理   api/index.js
// axios.defaults.transformResponse = [(data) => {
// 后台的原始数据   理想情况 json字符串
// const result = JSONBIG.parse(data)
// return result
// }]
</script>

<style>
</style>
