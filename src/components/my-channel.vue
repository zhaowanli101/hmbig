<template>
  <!-- 内容管理封装的组件    需要去components中的index.js中注册全局组件-->
  <!-- clearable是清空频道选项     这里有一个数据改变事件@change 频道改变过，把频道ID提交给父组件-->
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  //   在子组件内部：接受父组件数据
  props: ['value'],
  data () {
    return {
      //   value: '',
      channelOptions: []
    }
  },
  created () {
    //   获取频道列表
    this.getChannelOptions()
  },
  methods: {
    //   获取频道列表
    async getChannelOptions () {
      // 异步获取不用传值,解构赋值并赋值给channelOptions
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 传入频道的ID值
    fn (channelId) {
      if (channelId === '') channelId = null

      //   把id传给父组件
      this.$emit('input', channelId)
    }
  }
}
</script>

<style>
</style>
