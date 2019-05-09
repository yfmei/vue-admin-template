
import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/order/task/super/query",
    component: Layout,
    redirect: "/task",
    children: [
      {
        path: "",
        component: () => import("@/views/service/task/super/index"),
        name: "task",
        meta: { title: "任务", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/userinfo/task",
    component: Layout,
    redirect: "/task",
    children: [
      {
        path: "",
        component: () => import("@/views/service/task/area/index"),
        name: "task",
        meta: { title: "任务", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/sys/userinfo/task",
    component: Layout,
    redirect: "/task",
    children: [
      {
        path: "",
        component: () => import("@/views/service/task/sys/index"),
        name: "task",
        meta: { title: "任务", icon: "guide", noCache: true }
      }
    ]
  }
]
