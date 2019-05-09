/**
 * @author yfmei
 * @date 2018/7/25
 */
/**
 * 判断元素不存在
 * @param el
 * @returns
 */
function isNull(el) {
  return !isNotNull(el)
}

/**
 * 判断元素存在
 * @param el
 * @returns
 */
function isNotNull(el) {
  return el !== null && el !== "" && typeof el !== "undefined"
}

function log(msg) {
  console.log(msg)
}

function trim(str) {
  return typeof str === "string" ? str.replace(/^\s+|\s+$/g, "") : str
}

function forEach(obj, callback) {
  Object.keys(obj).forEach(callback)
}

/**
 * 过滤前后空格，修改数组对象
 * @param arr
 */
export function trimObject(arr) {
  if (isNull(arr)) {
    return
  }
  Object.keys(arr).forEach((key) => {
    let item = arr[key]
    if (isNotNull(item)) {
      console.log(`${key}: ${item}`)
      arr[key] = trim(item)
    }
  })
}

// log(typeof undefined === "undefined")

// let data = {
//   a: "1",
//   b: undefined,
//   c: " undefined",
//   d: "1 ",
//   e: " ",
//   f: null,
//   h:  2
// }
// trimArr(data)
// Object.keys(data).forEach((key) => {
//   let item = data[key]
//   console.log(`${key}: ${item}`)
// })

/**
 * @author yfmei
 * @date 2018/9/19
 */
export function isArray(arr) {
  return Object.prototype.toString.apply(arr) === "[object Array]"
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}"
  let date
  if (typeof time === "object") {
    date = time
  } else {
    if (("" + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === "a") return ["一", "二", "三", "四", "五", "六", "日"][value - 1]
    if (result.length > 0 && value < 10) {
      value = "0" + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return "刚刚"
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + "分钟前"
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前"
  } else if (diff < 3600 * 24 * 2) {
    return "1天前"
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() + "分"
  }
}
