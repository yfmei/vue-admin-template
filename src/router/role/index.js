
import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/admin/manage/role/getRoleList",
    component: Layout,
    redirect: "/role",
    children: [
      {
        path: "",
        component: () => import("@/views/service/role/super/index"),
        name: "role",
        meta: { title: "角色管理", icon: "guide", noCache: true }
      }
    ]
  }
]
