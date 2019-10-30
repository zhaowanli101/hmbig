<template>
  <!-- 内容管理页面.要去router处导入并注册 -->
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
        <el-select v-model="reqParams.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <!-- v-model 绑定的值是[起始日期,结束日期] -->
        <el-date-picker
          v-model="dateArr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>

    <!-- 后备插槽  这里不填内容的时候使用slot标签中的内容 -->
    <!-- <page></page> -->
    <!-- 默认插槽  在中间写入内容-->
    <!-- <page>456</page> -->
    <!-- <page>
      <div slot="content"></div>
    </page>-->
  </el-card>
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
      // 日期范围
      dateArr: [],
      // 提交后台的对象
      reqParams: {
        // 状态为空的时候不会进行提交
        status: null,
        channel_id: null
      },
      channelOptions: [{ value: 1, label: 'java' }, { value: 2, label: '前端' }]
    }
  }
}
</script>

<style>
</style>
