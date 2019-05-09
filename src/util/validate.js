/**
 * Created by yfmei on 16/11/18.
 */

export function isValidUserName(str) {
  const validMap = ["admin", "editor"]
  return validMap.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validateURL(textval) {
  const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlRegex.test(textval)
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 我国公民的身份证号码特点如下
 * 1.长度18位
 * 2.第1-17号只能为数字
 * 3.第18位只能是数字或者x
 * 4.第7-14位表示特有人的年月日信息
 */
export function validateIdCard(str) {
  let noValidate = typeof str === "undefined" || str.length !== 18
  return !noValidate
  // const reg = /^[1-9]{2}[0-9]{4}(19|20)[0-9]{2}((0[1-9]{1})|(1[1-2]{1}))((0[1-9]{1})|([1-2]{1}[0-9]{1}|(3[0-1]{1})))[0-9]{3}[0-9xX]{1}/i
  // return reg.test(str)
}

export function validateMobile(str) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(str)
}
