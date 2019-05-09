/**
 * @author yfmei
 * @date 2018/7/19
 */

import Layout from "@/views/layout/Layout"

export default [
  {
    path: "/admin/manage/role/addRolePage",
    component: Layout,
    redirect: "/role",
    children: [
      {
        path: "",
        component: () => import("@/views/service/permission/super/RoleAdd"),
        name: "roleAdd",
        meta: { title: "role", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/admin/manage/role/getRoleList",
    component: Layout,
    redirect: "/role/query",
    children: [
      {
        path: "",
        component: () => import("@/views/service/permission/super/RoleQuery"),
        name: "roleList",
        meta: { title: "roleList", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/admin/manage/menu/queryAllMenus",
    component: Layout,
    redirect: "/menu",
    children: [
      {
        path: "",
        component: () => import("@/views/service/permission/super/MenuManage"),
        name: "menu",
        meta: { title: "menu", icon: "guide", noCache: true }
      }
    ]
  }
]
