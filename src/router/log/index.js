/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/log/super/query",
    component: Layout,
    redirect: "/log",
    children: [
      {
        path: "",
        component: () => import("@/views/service/log/super/index"),
        name: "log",
        meta: { title: "日志管理", icon: "guide", noCache: true }
      }
    ]
  }
]
