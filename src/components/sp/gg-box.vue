<template>
         <div class="gg-box">
          <!-- 左规格名 -->
          <div class="gg-left">
            <p>规格名</p>
            <el-input v-model="ggarrItem.name"></el-input>
          </div>
          <!-- 分割线 -->
          <div class="gg-content"></div>
          <!-- 右边 规格参数价格 -->
          <div class="gg-right">
            <!-- 标题 -->
            <div class="gg-right-title">
              <p>参数名</p>
              <p>对应价格</p>
            </div>
            <!-- 每一项参数 -->
            <ggbox-item v-for="(x,y) in ggarrItem.can" :key="y" :canitem="x"></ggbox-item>
            <!-- 新增一项参数 -->
            <el-button  type="success">新增参数</el-button>
          </div>
        </div>
</template>

<script>
//载入 ggboxitem  组件 并渲染
import ggboxItem from "@/components/sp/gg-box-item"
//接受 props 
export default {
    props:["ggarrItem"],
    components:{
        ggboxItem
    }
}
</script>