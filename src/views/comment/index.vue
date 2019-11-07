<template>
  <!-- 文章评论管理组件   去router配置路由 -->
  <div class="container_comment">
    <!-- 卡片 -->
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <!-- 用prop接收数据 -->
        <el-table-column label="标题" width="400px" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 绑定关闭打开事件 两个用一个接口所以事件可以用一个  需要传参id和当前的状态,而数据在row中,所以传入scope.row就可以了-->
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
              size="small"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
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
export default {
  data () {
    return {
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 10
      },
      // 总页数
      total: 0,
      // 表格数据
      articles: []
    }
  },
  created () {
    // 获取文章相关数据
    this.getArticles()
  },
  methods: {
    // 切换评论状态  点击后会弹出提示框   传入参数row提供数据
    toggleStatus (row) {
      // row里包含id和comment_status的数据
      // 这里解构赋值会有语法问题,所以直接赋值就可以 ,获取当前的状态
      const text = row.comment_status
        ? '您确认关闭评论功能吗?'
        : '您确认开启评论功能吗?'

      this.$confirm(text, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 成功后发送请求,改变状态   提交的状态为当前的取反的状态
          const {
            data: { data }
          } = await this.$http.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          // 成功后提示 如果返回的状态为true,则打开成功 否则关闭成功
          this.$message.success(
            data.allow_comment ? '打开评论成功' : '关闭评论成功'
          )
          // 更新当前状态
          row.comment_status = data.allow_comment
        })
        .catch(() => {})
    },
    // 获取数据
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // console.log(this.articles)
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    }
  }
}
</script>

<style scoped lang="less">
</style>
