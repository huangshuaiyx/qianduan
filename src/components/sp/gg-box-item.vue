<template>
    <div>
        <div class="gg-right-item">
              <el-button type="danger">删除</el-button>
              <el-input v-model="canitem.name"></el-input>
              <el-input v-model="canitem.price"></el-input>
            </div>
    </div>
</template>
<script>
export default {
    props:['canitem']
}
</script>