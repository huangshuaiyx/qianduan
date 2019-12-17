<template>
  <div class="base">
    <el-container>
      <el-header>
        <h1>渠道商后台管理</h1>
        
        <el-button class="tui" @click="loginout()" >退出</el-button>
      </el-header>
      <el-container class="content">
        <!-- 左侧 -->
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <!-- 统计 -->
            <el-submenu v-for="(v,i) in leftlist" :index="(i+1).toString()" :key="i">
              <template slot="title">
                <i class="el-icon-orange"></i>
                <span>{{v.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="`${i+1}-${i2+1}`"
                  v-for="(v2,i2) in v.children"
                  :key="`${i}-${i2}`"
                  @click="$router.push({'name':v2.name})"
                >{{v2.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: [],
      adminname:""
    };
  },
  methods: {
    loginout() {
      //请求 本地储存 的 token
      localStorage.removeItem("houtaitoken");
      //跳转到 登陆页面
      this.$router.push({ name: "login" });
    },
    treelist(info, pid) {
      var data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
            ...info[i],
            children: this.treelist(info, info[i]._id)
          };
          // 如果 没有子权限 -- 删除 children 属性
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
          // console.log(data);
        }
      }
      // console.log(data);
      return data;
    }
  },

  mounted() {
    // this.axios.get("/listquanxian").then(res => {
    //   this.left = res.data.info;
    // });
    // 根据管理员 id  查找对应权限 --渲染到左侧导航
    this.axios
      .get("/adminqx", {
        params: {
          id: JSON.parse(localStorage.getItem("houtaitoken")).id
        }
      })
      .then(res => {
        this.left = res.data.qxarr;
        this.adminname = res.data.name;
      });
  },
  computed: {
    leftlist() {
      let x = this.treelist(this.left, 0);
      return x;
    }
  }
};
</script>

<style lang="">
* {
  margin: 0;
  padding: 0;
}
.base {
  background: #bebebe;
}
.content {
  margin-top: 20px;
}
.el-header {
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-header > h1 {
  margin-left: 50%;
  transform: translateX(-50%);
}

.el-aside {
  margin-left: 10px;
  margin-right: 10px;
  height: 100vh;
  background: yellow;
  overflow: auto;
  background: #f7f7f7;
}
.el-main {
  margin-right: 10px;
  height: 100vh;
  background: blue;
  overflow: auto;
  background: #f7f7f7;
}
</style>