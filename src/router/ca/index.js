/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/ca/super/query",
    component: Layout,
    redirect: "/ca",
    children: [
      {
        path: "",
        component: () => import("@/views/service/ca/super/index"),
        name: "ca",
        meta: { title: "CA管理", icon: "guide", noCache: true }
      }
    ]
  }
]
