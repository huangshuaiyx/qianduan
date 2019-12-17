import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login=()=> import("@/view/login.vue")
const base=()=> import("@/view/base.vue")

const fxuser=()=>import("@/components/fenxi/user.vue")
const fxorder=()=>import("@/components/fenxi/order.vue")
const qxlist=()=>import("@/components/qxgl/list.vue")
const qxadd=()=>import("@/components/qxgl/add.vue")
const jslist=()=>import("@/components/juese/list.vue")
const jsadd=()=>import("@/components/juese/add.vue")
const gladd=()=>import("@/components/gly/add.vue")
const gllist=()=>import("@/components/gly/list.vue")
const jsedit=()=>import("@/components/juese/edit.vue")
const gledit=()=>import("@/components/gly/edit.vue")
const spadd=()=>import("@/components/sp/add.vue")
const splist=()=>import("@/components/sp/list.vue")
import axios from "axios"
Vue.use(Router)

let router= new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/base',
      name: 'base',
      component: base,
      children:[
        {
          path: 'fxuser',
          name: 'fxuser',
          component: fxuser
        },
        {
          path: 'fxorder',
          name: 'fxorder',
          component: fxorder
        },
        {
          path: 'qxlist',
          name: 'qxlist',
          component: qxlist
        },
        {
          path: 'qxadd',
          name: 'qxadd',
          component: qxadd
        },
        {
          path: 'jslist',
          name: 'jslist',
          component: jslist
        },
        {
          path: 'jsadd',
          name: 'jsadd',
          component: jsadd
        },
        {
          path: 'gladd',
          name: 'gladd',
          component: gladd
        },
        {
          path: 'gllist',
          name: 'gllist',
          component: gllist
        },
        {
          path: 'jsedit',
          name: 'jsedit',
          component: jsedit
        },
        {
          path: 'gledit',
          name: 'gledit',
          component: gledit
        },
        {
          path: 'spadd',
          name: 'spadd',
          component: spadd
        },
        {
          path: 'splist',
          name: 'splist',
          component: splist
        },
      ]
    }
  ]
})
//全局路由守卫 -- 当路由发生时改变--

router.beforeEach((to,from,next)=>{
  //排除 登陆页面
  let token = localStorage.getItem("houtaitoken") ? JSON.parse(localStorage.getItem("houtaitoken")).token : ""
  let id = localStorage.getItem("houtaitoken") ? JSON.parse(localStorage.getItem("houtaitoken")).id : ""
  if(to.name!="login"){
    axios.get("/checktoken",{
      headers:{token:token}
    }).then(res=>{
      // console.log(res)
      if (res.data.err_code == 200) {

        // axios.get("/checkqx", {
        //   params: {
        //     id: id,
        //     name: to.name
        //   }
        // }).then(val => {
        //   if (val.data.err_code == 200) {
            next();
        //   } else {
        //     //没有权限 弹框 -- 没有权限请联系超管。。
        //     alert("没有权限")

        //   }
        // })
      } else {
        console.log("token 过期")
        router.push({ name: "login" })
      }
    })
  }else {
    next();
  }
})
export default router