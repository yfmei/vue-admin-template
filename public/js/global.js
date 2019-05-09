/**
 * vue-cli 3.0 增加的 public 目录和 static 目录一样，不会被 webpack 打包
 * 因此可以用来实现抽离全局配置
 * @author yfmei
 * @date 2018/10/19
 */

// 创建全局变量，保存项目配置
let BASE_URL = "https://simkey.tech/bleservice"
const ENV = "pro"

if (ENV === "dev") {
  BASE_URL = "http://localhost:8080/bleservice"
}

window.bleGlobal = {
  baseUrl: BASE_URL,
  env: ENV,
  debug: true
}

