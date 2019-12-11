<template>
  <div class="login" v-if="f==false">
    <div class="img">
      <img
        src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=226418344,3562831340&amp;fm=26&amp;gp=0.jpg"
        alt
      />
    </div>
    <h2>渠道商管理平台</h2>
    <form class="form">
      <select name id>
        <option value="管理员">管理员</option>
        <option value="企业">企业</option>
        <option value="平台">平台</option>
      </select>
      <input type="text" placeholder="账号" />
      <input type="text" placeholder="密码" />
      <input type="button" value="登录" @click="loginto()" />
    </form>
  </div>
  <div v-else class="ok">
    <i class="el-icon-success size animated shake"></i>
    <p class="animated fadeInLeft" animate-delay="3s" animate-duration="2s">登陆成功</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      f: false
    };
  },
  methods: {
    loginto() {
      //收集表单的数据 --- 用axios---接口---
      //node---数据库查询用户密码数据是否存在
      //返回---正确（token）---错误
      //正确--保存token--跳转到base页面
      //错误--不跳转
      this.f = true; //显示对勾
      setTimeout(() => {
        this.$router.push({ name: "base" });
      }, 3000); //定时器
    }
  }
};
</script>

<style lang="">
* {
  margin: 0;
  padding: 0;
}
.img {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
}
img {
  width: 100%;
}
.login {
  width: 60%;
  height: 100vh;
  margin: 0 auto;
  /* border: solid 1px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form {
  width: 50%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
}
h2 {
  text-align: center;
}
.ok {
  height: 100vh;
  width: 100px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
}
.size {
  font-size: 100px;
}
p {
  text-align: center;
}
input {
  height: 25px;
  margin-bottom: 5px;
}
</style>