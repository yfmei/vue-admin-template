/**
 * @author yfmei
 * 2018/7/6
 */

export default [
  {
    path: "/login",
    component: () => import("@/views/login/Login"),
    hidden: true,
    meta: { title: "登录", icon: "guide", noCache: true }

  }

]
