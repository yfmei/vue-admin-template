/**
 * http://iconfont.cn/home/index
 * iconfont 在控制台执行后就可以自动添加购物车
 * @author yfmei
 * 2018/7/5
 */
let icons = document.querySelectorAll(".icon-gouwuche1")

var auto_click = function (i) {
  if (i < icons.length) {
    setTimeout(function () {
      icons.item(i).click()
      auto_click(i + 1)
    }, 600)
  }
}
auto_click(0)
