<template>
    <div>
        <h1>我是订单</h1>
        <el-form :inline="true"  class="demo-form-inline">
  <el-form-item label="订单号">
    <el-input  placeholder="订单号" v-model="ddnum"></el-input>
  </el-form-item>

   <el-form-item label="订单日期">
          <el-date-picker
      type="daterange"
      v-model="times"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>

  <el-form-item label="订单号">
      <el-button @click="search">搜索</el-button>
  </el-form-item>
        </el-form>
        <!-- //显示表格 -->
        <h1>订单信息 <span>导出表格</span></h1>
    </div>
</template>


<script>
export default {
    data() {
        return {
            ddnum:"",
            times:""
        }
    },
    methods: {
    search(){
        console.log('订单哈',this.ddunm)
        console.log('时间',this.times[0].getTime())
    }
    },
}
</script>