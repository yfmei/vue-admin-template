/**
 * @author yfmei
 * 2018/7/6
 */
import axios from "axios/index"
import qs from "qs"
import { Message } from "element-ui/types"
import router from "../router/router"
import { trimObject } from "@/util/common"

// create an axios instance
const service = axios.create({
  // baseURL: global.BASE_URL,
  // baseURL: "http://124.207.3.80:8701/bleservice/",
  // baseURL: "http://7.225.220.103:8080/bleservice",
  withCredentials: true, // 跨域时携带cookie等认证信息
  // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  // proxy: {
  //   host: "localhost",
  //   port: 8080
  // },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    // "Content-Type": "multipart/form-data"
    // "Access-Control-Allow-Origin": "http://localhost:8081",
    // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
  },
  // 这个选项会在发送参数前进行处理, 通过qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
    // todo 上传文件不能转化
    trimObject(data)

    data = qs.stringify(data)
    return data
  }],
  // 在 then/catch之前处理 response 的数据
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    /* eslint no-param-reassign:0 */

    if (typeof data === "string") {
      try {
        data = JSON.parse(data)
      } catch (e) { /* Ignore */ }
    }
    return data
  }],
  data: {
    appName: ""
  },
  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
    console.log(progressEvent)
  },
  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
    console.log(progressEvent)
  },
  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300 // default
  },
  timeout: 10000 // request timeout
})

// service.defaults.baseURL = global.BASE_URL
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  console.log(config["url"])
  // config["headers"]["Content-Type"] = "multipart/form-data"
  // console.log("headers: " + config["headers"]["Content-Type"])
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

function login(msg) {
  Message({
    message: msg,
    type: "error",
    duration: 3 * 1000
  })
  router.push({ path: "/login" })
}
// 状态码错误信息
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
}
// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    // 1.首先判断接口是否正常
    //  1.1.接口正常则判断自定义状态码
    //  1.2 接口不正常直接提示
    if (response.status === 200) {
      const data = response.data
      let code = data.statusCode
      console.log("request 拦截响应 code: " + code)
      if (code === undefined) {
        return response
      }

      if (code === 200) {
        // todo 很难判断 data.returnObj有时为数据有时为信息
        if (data.returnObj === "成功") {
          // returnObj 若不为"成功"则为请求数据
          Message({
            message: data.returnObj,
            type: "success",
            duration: 3 * 1000
          })
        }
      } else if (code === 607) {
        // 未登录
        login(data.returnObj)
      } else {
        // 其他状态码
        Message({
          message: data.returnObj,
          type: "error",
          duration: 3 * 1000
        })
      }
    }
    // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    // if (code === 50008 || code === 50012 || code === 50014) {
    //   // 请自行在引入 MessageBox
    //   // import { Message, MessageBox } from 'element-ui'
    //   MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录", "确定登出", {
    //     confirmButtonText: "重新登录",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     store.dispatch("FedLogOut").then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    // }
    return response
  },
  error => {
    // 在这里判断错误请求
    console.log("request error: " + error) // for debug
    // error.response.status 404、403、500等
    Message({
      message: error.message,
      type: "error",
      duration: 3 * 1000
    })
    return Promise.reject(error)
})

/**
 * 模拟表单提交
 * @param url
 * @param params
 * @returns {HTMLFormElement}
 */// eslint-disable-next-line
function createFromPost(url, params) {
  let temp = document.createElement("form")
  temp.id = "dummyPostForm"
  temp.name = "dummyPostForm"
  temp.action = url
  temp.method = "POST"
  temp.style.display = "none"
  // 添加到body中
  document.body.appendChild(temp)
  for (let item in params) {
    if (params.hasOwnProperty(item)) {
      let opt = document.createElement("input")
      opt.name = item
      opt.type = "hidden"
      opt.value = params[item]
      temp.appendChild(opt)
    }
  }
  temp.submit()
  return temp
}

export default service
