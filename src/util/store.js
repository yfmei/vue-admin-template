/**
 * @author PC
 * @date 2019/1/6
 */
function store(key, val) {
  if (isSupport) {
    // todo 判断容量是否超过5M
    localStorage.setItem(key, val)
  }
}

function load(key) {
  if (isSupport) {
    localStorage.getItem(key)
  }
}

function isSupport() {
  return window.localStorage && window.localStorage.getItem
}

function example() {
// 获取文本输入框
  let field = document.getElementById("field")

// 检测是否存在 autosave 键值
// (这个会在页面偶然被刷新的情况下存在)
  if (sessionStorage.getItem("autosave")) {
    // 恢复文本输入框的内容
    field.value = sessionStorage.getItem("autosave")
  }

// 监听文本输入框的 change 事件
  field.addEventListener("change", function () {
    // 保存结果到 sessionStorage 对象中
    sessionStorage.setItem("autosave", field.value)
  })
}
