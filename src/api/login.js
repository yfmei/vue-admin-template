import request from "@/util/request"
import { setCookie, delCookie } from "@/util/cookie"
import { encryptByDES } from "@/util/encrypt"

export function login(self, keyStr) {
  let form = self.loginForm

  // 加密
  let userName = encryptByDES(form["userName"], keyStr)
  let userPassword = encryptByDES(form["userPassword"], keyStr)

  let captcha = form["captcha"]
  let vcode = form["vcode"]
  return request({
    url: "/admin/login",
    method: "POST",
    data: { userName, userPassword, captcha, vcode, "dataSource": 20 }
  }).then(function (response) {
    let result = response.data
    console.log(response)
    if (result.statusCode === 200) {
      console.log("api login success")
      redirectUrl(self)
    } else {
      // parseMsg(result.returnObj)
    }
  })
}

export function redirectUrl(data) {
  return request({
    url: "/admin/getToken",
    method: "POST"
  }).then(function (res) {
    let userType = res.data.returnObj.userType
    let adminType = "observer"
    if (userType === "60") {
      adminType = "super"
    } else if (userType === "63") {
      // 访客
      adminType = "observer"
    } else if (userType === "61") {
      adminType = "area"
    } else {
      adminType = "sys"
    }

    // 管理员类型用vuex保存
    data.$store.commit("changeType", adminType)
    // 网页刷新 store 中的值就没了，放到cookie中备用
    setCookie("adminType", adminType)

    // 跳转到首页
    data.$router.push({ path: "/" })
  })
}

export function captcha(vm, date) {
  return request({
    url: "/admin/captcha",
    method: "get",
    data: date,
    responseType: "arraybuffer"
  }).then(response => {
    vm.captcha = "data:image/png;base64," + btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), "")
    )
  }).then(data => {
    console.log(data)
  })
}

export function logout(self) {
  return request({
    url: "/admin/logout",
    method: "post"
  }).then(response => {
    let result = response.data
    if (result.statusCode === 200) {
      console.log("注销 success")
      delCookie("adminType")
      self.$router.push({ path: "/login" })
    } else {
      // parseMsg(result.returnObj)
    }
  }).then(data => {
    console.log(data)
  })
}
