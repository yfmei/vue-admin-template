/**
 * @author yfmei
 * 2018/7/6
 */
import Vue from "vue/types"
import Router from "vue-router/types"
import Layout from "@/views/layout/Layout"
// import admin from "@/router/admin"
// import app from "@/router/app"
// import ca from "@/router/ca"
// import cert from "@/router/cert"
// import log from "@/router/log"
import login from "@/router/login"
// import menu from "@/router/menu"
// import order from "@/router/order"
// import role from "@/router/role"
// import permission from "@/router/permission"
// import product from "@/router/product"
// import system from "@/router/system"
// import task from "@/router/task"
// import user from "@/router/user"
// import ukey from "@/router/ukey"

import request from "@/utils/request"
import { Message } from "element-ui/types"

// 开发模式不使用懒加载, 因为懒加载过多页面会导致 webpack 的热更新非常慢.
Vue.use(Router)
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
let constantRouterMap = [
  {
    path: "",
    component: Layout,
    redirect: "", // 重定向路由 /a URL变成 /b，然后匹配路由 /b
    alias: "", // 路由别名，访问 /b，URL还是 /b， 实际访问的却是 /a
    children: [{
      path: "",
      component: () => import("@/views/dashboard/dashboard.vue"),
      name: "dashboard",
      meta: { title: "dashboard", icon: "dashboard", noCache: true }
    }]
  },
  {
    path: "/layout",
    name: "main",
    component: () => import("@/views/layout/Layout")
  },
  { path: "/element", component: () => import("@/components/element"), hidden: true },
  { path: "/bootstrap", component: () => import("@/components/bootstrap"), hidden: true }
]

// export const routes = constantRouterMap.concat(admin, app, ca, cert, log, login, menu, order, role, permission, product, system, task, user, ukey)
export const routes = constantRouterMap.concat(login)

const router = new Router({
  // mode: "history", // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})


// 这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
// to 目标路由 from 来源路由
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  if (to.meta.content) {
    let head = document.getElementsByTagName("head")
    let meta = document.createElement("meta")
    meta.content = to.meta.content
    head[0].appendChild(meta)

    let meta1 = document.createElement("meta")
    meta1.characterSet = to.meta.charset
    head[0].appendChild(meta1)

    let meta2 = document.createElement("meta")
    meta2.name = to.meta.name
    head[0].appendChild(meta2)
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path === "/login") {
    next()
  } else {
    request({
      url: "/admin/getToken",
      data: {},
      method: "post"
    }).then(function (res) {
      const data = res.data
      const code = res.status
      let statusCode = data.statusCode
      // 未登录, 跳转到登录页
      console.log("路由拦截响应 code: " + code)
      console.log("路由拦截响应 data.statusCode: " + statusCode)
      // 1.首先判断接口是否正常
      //  1.1.接口正常则判断是否登录
      //    2.1未登录去登录
      //    2.2登录正常路由
      //  1.2 接口不正常直接提示
      if (code === 200) {
        if (statusCode === undefined) {
          return
        }

        if (statusCode === 200) {
          next()
        } else if (statusCode === 607) {
          // 未登录
          next({
            path: "/login"
          })
        }
      }
    })
  }
})

export default router
