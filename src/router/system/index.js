/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/system/super/query",
    component: Layout,
    redirect: "/system",
    children: [
      {
        path: "",
        component: () => import("@/views/service/system/super/index"),
        name: "system",
        meta: { title: "系统管理", icon: "guide", noCache: true }
      }
    ]
  }
]
