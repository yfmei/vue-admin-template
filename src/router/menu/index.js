
import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/admin/manage/role/assignPermissionsPage",
    component: Layout,
    redirect: "/GrantMenu",
    children: [
      {
        path: "",
        component: () => import("@/views/service/menu/super/assign"),
        name: "GrantMenu",
        meta: { title: "菜单管理", icon: "guide", noCache: true }
      }
    ]
  },
  {

    path: "/admin/manage/menu/queryAllMenus",
    component: Layout,
    redirect: "/ManageMenu",
    children: [
      {
        path: "",
        component: () => import("@/views/service/menu/super/index"),
        name: "ManageMenu",
        meta: { title: "菜单管理", icon: "guide", noCache: true }
      }
    ]
  }
]
