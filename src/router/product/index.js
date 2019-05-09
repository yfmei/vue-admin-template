/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/product/super/query",
    component: Layout,
    redirect: "/product",
    children: [
      {
        path: "",
        component: () => import("@/views/service/product/super/index"),
        name: "product",
        meta: { title: "产品管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/product/list",
    component: Layout,
    redirect: "/product",
    children: [
      {
        path: "",
        component: () => import("@/views/service/product/area/index"),
        name: "product",
        meta: { title: "产品管理", icon: "guide", noCache: true }
      }
    ]
  }
]
