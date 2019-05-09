/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/order/super/query",
    component: Layout,
    redirect: "/order/query",
    children: [
      {
        path: "",
        component: () => import("./index"),
        name: "order",
        meta: { title: "订单管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/order/import/super/query",
    component: Layout,
    redirect: "/order/import",
    children: [
      {
        path: "",
        component: () => import("@/views/service/order/super/import"),
        name: "orderImport",
        meta: { title: "订单管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/order/list",
    component: Layout,
    redirect: "/order/query",
    children: [
      {
        path: "",
        component: () => import("./index"),
        name: "order",
        meta: { title: "订单管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/order/import",
    component: Layout,
    redirect: "/order/import",
    children: [
      {
        path: "",
        component: () => import("@/views/service/order/area/import"),
        name: "orderImport",
        meta: { title: "订单管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/sys/order/list",
    component: Layout,
    redirect: "/order/query",
    children: [
      {
        path: "",
        component: () => import("./index"),
        name: "order",
        meta: { title: "订单管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/sys/order/import",
    component: Layout,
    redirect: "/order/import",
    children: [
      {
        path: "",
        component: () => import("@/views/service/order/sys/import"),
        name: "orderImport",
        meta: { title: "订单管理", icon: "guide", noCache: true }
      }
    ]
  }
]
