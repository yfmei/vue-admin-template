/**
 * @author yfmei
 * @date 2018/9/26
 */

// 获取cookie、
export function getCookie(cname) {
  let name = cname + "="
  let ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ""
}

/* 设置cookie,增加到vue实例方便全局调用*/

export function setCookie(cname, cvalue, exdays) {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = "expires=" + d.toGMTString()
  document.cookie = cname + "=" + cvalue + "; " + expires
}

// 删除cookie
export function delCookie(name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) { document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() }
}
