/**
 * @author yfmei
 * @date 2019/1/7
 */

/**
 * 获取元素样式指定值
 * @param e
 * @param prop
 * @returns {string}
 */
function getStyleVal(e, prop) {
  // getComputedStyle、currentStyle 返回CSS样式声明对象([object CSSStyleDeclaration]) 只读
  // getComputedStyle 支持IE9+以上及正常浏览器
  // currentStyle 兼容IE8及IE8以下获取目标元素style样式

  let cssStyle = window.getComputedStyle(e, null) // 返回实时更新的style对象
  // ie8只能使用currentStyle
  return cssStyle ? cssStyle.getPropertyValue(prop) : e.currentStyle[prop]
}

module.exports = {
  getStyleVal
}
