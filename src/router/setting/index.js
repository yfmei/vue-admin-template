/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/setting",
    component: Layout,
    redirect: "/setting",
    children: [
      {
        path: "",
        component: () => import("@/views/setting/setting"),
        name: "setting",
        meta: { title: "修改密码", icon: "guide", noCache: true }
      }
    ]
  }
]
