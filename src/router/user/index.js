/**
 * @author yfmei
 * 2018/7/6
 */

import Layout from "@/views/layout/Layout"
export default [
  {
    path: "/userinfo/super/query",
    component: Layout,
    redirect: "/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/super/info/index"),
        name: "z",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/user/approval/super/list",
    component: Layout,
    redirect: "/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/super/approval/index"),
        name: "superUserApproval",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/user/import/super/query",
    component: Layout,
    redirect: "/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/super/import/index"),
        name: "superUserImport",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/userinfo/list",
    component: Layout,
    redirect: "/area/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/area/info/index"),
        name: "superUserInfo",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/user/approval/area/list",
    component: Layout,
    redirect: "/area/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/area/approval/index"),
        name: "userApproval",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/area/userinfo/import",
    component: Layout,
    redirect: "/area/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/area/import/index"),
        name: "userImport",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/sys/userinfo/import",
    component: Layout,
    redirect: "/area/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/sys/import/index"),
        name: "userImport",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  },
  {
    path: "/sys/userinfo/list",
    component: Layout,
    redirect: "/area/userinfo",
    children: [
      {
        path: "",
        component: () => import("@/views/service/user/sys/info/index"),
        name: "superUserInfo",
        meta: { title: "用户信息", icon: "guide", noCache: true }
      }
    ]
  }
]
