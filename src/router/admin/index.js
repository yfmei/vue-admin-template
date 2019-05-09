/**
 * @author yfmei
 * 2018/7/6
 */
import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/areaadmin/super/query",
    component: Layout,
    redirect: "/admin",
    children: [
      {
        path: "",
        component: () => import("@/views/service/admin/super/index"),
        name: "admin",
        meta: { title: "管理员管理", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/systemadmin/list",
    component: Layout,
    redirect: "/sysadmin",
    children: [
      {
        path: "",
        component: () => import("@/views/service/admin/area/index"),
        name: "sysadmin",
        meta: { title: "管理员管理", icon: "guide", noCache: true }
      }
    ]
  }
]
