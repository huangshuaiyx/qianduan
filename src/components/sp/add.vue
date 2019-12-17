<template>
  <div>
    <h1>商品添加</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input></el-input>
      </el-form-item>

      <!-- 规格参数 -->
      <el-form-item label="规格参数">
        <h1 class="gg-title">规格参数</h1>
            <!-- 规格组建 -->
            <ggBox v-for="(x,y) in ggarr" :key="y" :ggarrItem="x"></ggBox>


      <el-button type="primary" @click="xin()">新增</el-button>
      </el-form-item>
      <!-- 商品价格 -->
      <el-form-item label="商品价格">
        <el-input></el-input>
      </el-form-item>
      <!-- 缩略图 -->
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="轮播图">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
        
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情">

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//加载 gg-box组件 并渲染    
import ggBox from "@/components/sp/gg-box.vue";
//获取 vuex 中的 state.ggarr
import {mapState} from "vuex"
//ggarr 数组中有几项 调用 几次 ggbox 组件
//循环 ggarr 数组 调用ggbox
export default {
    components:{
        ggBox
    },
    computed: {
        ...mapState(["ggarr"])
    },
    methods: {
        xin(){
            console.log(123)
        }
    },
}
</script>

<style lang="">
.gg-title {
  border-bottom: 1px solid;
}
.gg-content{
    border: solid 1px black
    }
.gg-box {
  display: flex;
}
.gg-right-title,
.gg-right-item {
  display: flex;
  justify-content: space-around;
}
/* 缩略图 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>