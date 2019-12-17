<template>
  <div>
    <h1>我是添加权限的组件</h1>
    <el-form ref="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="路由name">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="父权限">
        <el-cascader v-model="value" :show-all-levels="false" :props="{ checkStrictly: true }" :options="options"></el-cascader>
      </el-form-item>
    </el-form>
    <el-button @click="add">添加</el-button>
     <el-button @click="$router.push({name:'qxlist'})">返回</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      name: "",
      value: [],
      options: [
        //默认 一级 pid 0
        {
          value: "0",
          label: "一级权限"
        }
      ]
    };
  },
  //组件挂载后 请求所有权限数据
  mounted() {
    this.axios.get("/listquanxian").then(res => {
      //   console.log(res.data)
      if (res.data.err_code == 200) {
        let info = res.data.info;
        // console.log(info);
        let wxjinfo = this.tree(info, 0);
        this.options = [...this.options, ...wxjinfo];
        console.log(this.options);
      }
    });
  },
  methods: {
    tree(info, pid) {
      var data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
            value: info[i]._id,
            label: info[i].title,
            children: this.tree(info, info[i]._id)
          };
          //如果没有子权限--删除 children 属性
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
        }
      }
      return data;
    },

    add() {
      let pid = this.value.pop();
      let obj = {
        title: this.title,
        name: this.name,
        pid: pid
      };
      console.log(obj);
      //调用 添加权限接口
      this.axios.post("/addquanxian",obj).then(res=>{
        if(res.data.err_code==200){
          console.log("添加成功")
          this.$router.push({name:"qxlist"})
        }else{
          this.name="";
          this.title="";
        }
      })
    }
  }
};
</script>