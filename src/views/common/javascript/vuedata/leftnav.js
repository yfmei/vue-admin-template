// var root = "hi";
// var sub_menu = [{name: "权限", childMenuInfos: [{name: "zi", url: "wwwww"}]}];
let root = "hi",
    sub_menu = [],
    preMenu = null,
    currentMenu = null,
    adminType = $("#adminType").val(),
    sideData = {
      root: root,
      sub_menus: sub_menu,
      preMenu: preMenu,
      currentMenu: currentMenu
    }
// 左边栏页面，需要jquery.load()的路径集合
let routerPath = [
  "/admin/manage/menu/queryAllMenus",
  "/admin/manage/role/addRolePage",
  "/admin/manage/role/getRoleList",
  "/area/userinfo/list",
  "/area/userinfo/task",
  "/area/userinfo/import",
  "/area/systemadmin/list",
  "/area/usercert/list",
  "/area/order/list",
  "area/order/import",
  "area/product/list",
  "/sys/userinfo/list",
  "/sys/userinfo/task",
  "/sys/userinfo/import",
  "/sys/systemadmin/list",
  "/sys/usercert/list",
  "/sys/order/list",
  "sys/order/import",
  "/super/index"
]

/**
 * 初始化数据项、创建实例、加载数据
 * @param url
 */
function getVmInstance(url) {
  let _pageType = 1

  let _module_container = null
  $.each(menus, function (pageName, type) {
    let _index = url.indexOf(pageName)
    if (_index >= 0) {
      if (pageName === "order") {
        if (url.indexOf("order/import") < 0 && url.indexOf("order/task") < 0) {
          _pageType = type
          _module_container = "#" + pageName + "-container"
          return false
        } else {
          let s = url.indexOf("order/import") >= 0
          if (url.indexOf("order/import") >= 0) {
            pageName = "order-import-super"
            _pageType = 51
            _module_container = "#" + pageName + "-container"
            return false
          } else {
            pageName = "order-task-super"
            _pageType = 52
            _module_container = "#" + pageName + "-container"
            return false
          }
        }
      } else {
        _pageType = type
        _module_container = "#" + pageName + "-container"
        return false
      }
    }
  })

  // 初始化数据项
  let _initData = getInitData(_pageType)
  console.log("初始化数据项完成。。。")
  // 创建新实例
  let _vm = createVm(_module_container, _initData)
  console.log("实例创建完成。。。")
  // 加载数据
  forceUpdate(_vm, _initData)
  console.log("加载数据完成。。。")
  return _vm
}

let vue = new Vue({
  el: "#sidebar",
  data: sideData,
  created: function () {
    this.getMenu()
  },
  methods: {
    getUrl: function (url) {
      return url
    },
    getMenu: function () {
      let self = this
      let _data = {
        upperMenuId: "ROOT"
      }
      requestJson("/user/menu/queryLeftMenu", _data, function (result) {
        console.log(result)
        self.sub_menus = result.returnObj

        self.$nextTick(function () {
          console.log("菜单渲染已经完成, 开始绑定点击事件。。。")
          menuInit()
        })
      })
    },
    changeMenu: function (e) {
      let propertyName = "menu_url" // 绑定菜单url的属性名
      this.preMenu = this.currentMenu
      let preMenu = this.preMenu, // 前一个二级菜单
          self = $(e.target), // a标签
          childMenu = self.parent(), // li标签(三级菜单)
          menuUrl = childMenu.attr("menu_url") // 菜单url

      this.currentMenu = childMenu.parent() // ul标签(二级菜单)

      // 判断是否切换了主菜单
      let mask = preMenu !== null && preMenu.attr(propertyName) !== childMenu.attr(propertyName)
      if (mask) {
        // 切换主菜单就移除之前的子菜单焦点
        preMenu.children().removeClass("current")
      }
      switchPage(menuUrl)
      // 二级菜单点击事件
      childMenu.addClass("current").siblings("li").removeClass("current")
    }
  }
})

/**
 * 1、切换页面;
 * 2、页面加载完成, 初始化数据项、创建实例、加载数据
 * @param menuUrl
 */
function switchPage(menuUrl) {
  // 是否是权限分配页面或者系统、区域管理员
  let isPermissionUrl = menuUrl === "/admin/manage/menu/queryAllMenus" ||
    menuUrl === "/admin/manage/role/addRolePage" ||
    menuUrl === "/admin/manage/role/getRoleList" || $.inArray(menuUrl, routerPath) > 0
  let jspLoadPage = $("#main")

  // 直接请求页面append到页面的div中
  jspLoadPage.load(mainUrl + menuUrl, function () {
    if (!isPermissionUrl) {
      // 权限分配和系统、区域管理员暂时未用vue
      console.log("页面加载完成, 开始初始化数据项。。。")
      // 初始化数据项、创建实例、加载数据
      vm = getVmInstance(menuUrl) // todo new一个新的实例, 开销略大, 有时间处理下
      // todo 拆分页面组件, 防止元素id重名
      // formVm = getVmInstance(menuUrl);
      // listVm = getVmInstance(menuUrl);
      // editVm = getVmInstance(menuUrl);
    }
  })
}

function menuInit() {
  // 显示二级菜单
  let Accordion = function (el, multiple) {
    this.el = el || {}
    this.multiple = multiple || false

    // Variables privadas
    let links = this.el.find(".link")
    // Evento
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown)
  }

  Accordion.prototype.dropdown = function (e) {
    let $el = e.data.el
    $this = $(this)
    $next = $this.next()

    $next.slideToggle()
    $this.parent().toggleClass("open")

    if (!e.data.multiple) {
      // 隐藏菜单
      $el.find(".submenu").not($next).slideUp().parent().removeClass("open")
    }
  }

  new Accordion($("#sidebar"), false)
}
