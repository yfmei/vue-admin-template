/**
 * @author yfmei
 * @date 2019/1/7
 */
import CryptoJS from "crypto-js"
import request from "@/util/request"

export function getToken(self, callback) {
  return request({
    url: "/admin/getLoginPass",
    method: "POST",
    data: {}
  }).then(function (response) {
    let result = response.data
    console.log(response)
    if (result.statusCode === 200) {
      console.log("api loginPass success")
      let keyStr = result.returnObj

      callback(self, keyStr)
    } else {
      // parseMsg(result.returnObj)
    }
  })
}

export function encrypt(msg, key, iv) {
  let keyHex = CryptoJS.enc.Utf8.parse(key)
  let ivHex = CryptoJS.enc.Utf8.parse(iv)

  // DES 加密
  let encrypted = CryptoJS.DES.encrypt(msg, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  // 转换为字符串
  encrypted = encrypted.toString()
  return encrypted
}

export function encryptByDES(message, key) {
  let keyHex = CryptoJS.enc.Utf8.parse(key)
  let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
