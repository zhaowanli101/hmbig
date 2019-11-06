<template>
  <!--发布文章组件 在router处导入并注册 -->
  <div class="container_publish">
    <el-card>
      <!-- 表头(面包屑) -->
      <div slot="header">
        <!-- 编辑和发布文章用一个组件,所以判断响应头中是否含有id值来进行后续操作 -->
        <my-bread>{{this.$route.query.id?"修改":"发表"}}文章</my-bread>
      </div>
      <el-form label-width="80px" :model="articleForm">
        <el-form-item label="标题 :">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容 :">
          <!-- 需要第三方的富文本组件 -->
          <!-- bidirectional data binding（双向数据绑定） -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面 :">
          <!--该为别的选项 @change 清空之前选择的图片地址 -->
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!--添加和 上传组件 需要单做组件在components中 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道 :">
          <!-- 封装好的频道组件组件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 需要判断头部是否携带id值来显示不同的后续操作,  带id是修改,不带是发布 -->
        <el-form-item v-if="this.$route.query.id">
          <!-- 设置修改和存入草稿的事件 upData -->
          <el-button type="primary" @click="upData(false)">修改</el-button>
          <el-button @click="upData(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <!-- 给发表和存入草稿绑定事件,请求需要传参draft  true为草稿  false为发表  可以使用相同的事件,传参不一样-->
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 提交表单数据
      articleForm: {
        title: null,
        // channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      // 富文本选项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  // 监听地址栏参数(id)变化，切换填充表单还是重置表单
  watch: {
    // key===>被监听的(this下的)数据的字段的名字
    // value ===> 值改变后触发的函数 (newVal,oldVal) 新值  旧值
    '$route.query.id': function (newVal, oldVal) {
      // 修改
      if (newVal) {
        this.getArticle(newVal)
      } else {
        // 发表  重置表单
        this.articleForm = {
          title: null,
          // channel_id: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  },
  methods: {
    // 发表和村为草稿事件
    async create (draft) {
      // 异步 发请求  draft数据在query中,所以在路径后边   请求的其他数据在body中
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 成功后提示  三元表达式,  提示后并跳转到内容管理页面
      this.$message.success(draft ? '存为草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 如果有ID,初始化就含有数据
    async getArticle (id) {
      const {
        data: { data }
      } = await this.$http.get(`articles/${id}`)
      // 将返回的数据复制给表单
      this.articleForm = data
    },
    // 修改文章
    async upData (draft) {
      // 这里提交的id可以是this.$route.query.id 之前返回的数据含有id值,并赋值给了articleForm,所以它也携带有id值
      await this.$http.put(
        `articles/${this.articleForm.id}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '存为草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  },
  created () {
    // 组件初始化时通过头部是否含有id值来判断是修改还是发表
    const articleId = this.$route.query.id
    if (articleId) {
      this.getArticle(articleId)
    }
  }
}
</script>

<style scoped lang="less">
</style>
