/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/access/super/query",
    component: Layout,
    redirect: "/access",
    children: [
      {
        path: "",
        component: () => import("@/views/service/app/access/super/index"),
        name: "access",
        meta: { title: "应用管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/group/super/query",
    component: Layout,
    redirect: "/group",
    children: [
      {
        path: "",
        component: () => import("@/views/service/app/group/super/index"),
        name: "group",
        meta: { title: "应用组管理", icon: "guide", noCache: true }
      }
    ]
  }
]
