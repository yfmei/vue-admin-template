
import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/ukey/reset/super/applyReset",
    component: Layout,
    redirect: "/ukey",
    children: [
      {
        path: "",
        component: () => import("@/views/service/ukey/super/applyReset/index"),
        name: "ukey",
        meta: { title: "蓝牙卡", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/ukey/approval/super/list",
    component: Layout,
    redirect: "/ukey",
    children: [
      {
        path: "",
        component: () => import("@/views/service/ukey/super/approval/index"),
        name: "ukey",
        meta: { title: "蓝牙卡", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/ukey/import/super/query",
    component: Layout,
    redirect: "/ukey",
    children: [
      {
        path: "",
        component: () => import("@/views/service/ukey/super/import/index"),
        name: "ukey",
        meta: { title: "蓝牙卡", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/ukey/info/super/query",
    component: Layout,
    redirect: "/ukey",
    children: [
      {
        path: "",
        component: () => import("@/views/service/ukey/super/info/index"),
        name: "ukey",
        meta: { title: "蓝牙卡信息", icon: "guide", noCache: true }
      }
    ]
  }
]
