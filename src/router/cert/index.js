import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/cert/super/query",
    component: Layout,
    redirect: "/cert",
    children: [
      {
        path: "",
        component: () => import("@/views/service/cert/super/index"),
        name: "cert",
        meta: { title: "证书管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/usercert/list",
    component: Layout,
    redirect: "/area/cert",
    children: [
      {
        path: "",
        component: () => import("@/views/service/cert/area/index"),
        name: "cert",
        meta: { title: "证书管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/sys/usercert/list",
    component: Layout,
    redirect: "/sys/cert",
    children: [
      {
        path: "",
        component: () => import("@/views/service/cert/sys/index"),
        name: "cert",
        meta: { title: "证书管理", icon: "guide", noCache: true }
      }
    ]
  }
]
