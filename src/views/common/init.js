function forceUpdate(_vm, _getData) {
  if (typeof _vm !== "undefined") {
    // 强制刷新视图
    _vm.updateData(_getData)
    _vm.getList(getRequestData(_vm))
  }
}

function getRequestData(self) {
  // 构造请求参数
  let _data = {
        "pageNo": self.pageNo,
        "pageSize": self.pageSize
      },
      _i = 0
  // 添加搜索条件到请求头中
  for (_i; _i < self.searchCondition.length; _i++) {
    _data[self.searchCondition[_i].id] = self.searchCondition[_i].val
  }
  return _data
}

// 为数组添加remove方法
// 移除数组中的第二项
// array.remove(1);
// 移除数组中的倒数第二项
// array.remove(-2);
// 移除数组中的第二项和第三项（从第二项开始，删除2个元素）
// array.remove(1,2);
// 移除数组中的最后一项和倒数第二项（数组中的最后两项）
// array.remove(-2,-1);
Array.prototype.remove = function (from, to) {
  let rest = this.slice((to || from) + 1 || this.length)
  this.length = from < 0 ? this.length + from : from
  return this.push.apply(this, rest)
}

/**
 * 创建新实例
 * @param el
 * @param data
 * @returns {*}
 */
function createVm(el, data) {
  return new Vue({
    methods: {
      del: function (id, name) {
        console.log("del id: " + id)
        let self = this,
            _data = {}

        layer.confirm("确认删除【" + name + "】吗？",
                      {
                        btn: ["确定", "取消"]
                      }, function () {
                        // 按钮【确定】的回调
                        _data[self.attrs[0]] = id
                        request(delUrl, _data, delCallback)
                      }, function (index) {
                        // 按钮【取消】的回调
                        layer.close(index)
        })
      },
      submit: function (event) {
        console.log("submit id:")
        let self = this,
            _data = {},
            _ret = "ok"
        // 构造提交参数
        $.each(self.labels, function (index, item) {
          let attr = item.id

          // var _element = $("#" + attr);
          // 参数校验
          _ret = validate(self, item)
          if (_ret !== "ok") {
            layer.msg(_ret)

            // 校验不通过, 中断提交, 并在页面显示提示
            // _element.next().html(_ret);
            // _element.attr("title", _ret);
            // _element.tooltip({title: _ret});
            return false
          } else {
            // 校验通过清除提示
            // _element.next().html("");
            // 校验通过才提交数据
            let _val = self[attr]
            if (attr === "updateTime" || attr === "createTime") {
              _data[attr] = _val.replace("T", " ") // h5的时间控件需要用T分隔才能识别
            } else if (attr === "sysIds") {
              _data[attr] = _val.join("_")
            } else if (self.moduleName === "group" && attr === "appId") {
              _data[attr] = _val.join("_")
            } else if (self.moduleName === "ca" && attr === "algorithmType") {
              // 只有ca模块才是多选
              _data[attr] = _val.join(",")
            } else {
              _data[attr] = _val
            }
          }
        })

        if (_ret === "ok") {
          console.log(self.attrs)
          let _editUrl = ""
          if (self.isAdd) {
            _editUrl = self.addUrl
          } else {
            _editUrl = self.editUrl
          }
          requestJson(_editUrl, _data, function (result) {
            if (result.statusCode === 200) {
              layer.msg(self.formName + result.returnObj)
              // 关闭模态框
              $(modalElem).modal("hide")
            }
          })
        }
      },
      jump: function (pageNo) {
        let self = this
        self.pageNo = pageNo || 1
        self.getList(getRequestData(self))
      },
      getParRelationData: function (parType) {
        // 级联数据查询
        let self = this

        self.loadParDataType = "edit"
        console.log(parType)
        getParData(parType, self)
      },
      getProductInfo: function () {
        let self = this
        requestJson("/product/super/getInfoById", { "productId": self.productId }, function (result) {
          let _productInfo = result.returnObj
          self.productId = _productInfo.productId
          self.orderPrice = _productInfo.prodPrice
          self.dataSource = _productInfo.dataSource
          self.dataSourceName = _productInfo.dataSourceName
        })
      },
      checkAllSys: function () {
        let self = this
        if (self.selectAllSys) {
          let _systemList = self.baseData.systemList
          let _arr = []
          for (let _i = 0; _i < _systemList.length; _i++) {
            _arr.push(_systemList[_i].sysId)
          }
          self.sysIds = _arr
        } else {
          self.sysIds = []
        }
      },
      checkAllAlgorithm: function () {
        let self = this
        if (self.selectAllAlgorithm) {
          let _algorithmTypeList = self.baseData.algorithmTypeList
          let _arr = []
          for (let _i = 0; _i < _algorithmTypeList.length; _i++) {
            _arr.push(_algorithmTypeList[_i].typeId)
          }
          self.algorithmType = _arr
        } else {
          self.algorithmType = []
        }
      },
      checkAllApp: function () {
        let self = this
        if (self.selectAllApp) {
          let _appList = self.baseData.appList
          let _arr = []
          for (let _i = 0; _i < _appList.length; _i++) {
            _arr.push(_appList[_i].appId)
          }
          self.appId = _arr
        } else {
          self.appId = []
        }
      },
      downloadExcel: function (event) {
        let self = $(event.target) // a标签
        let taskId = self.attr("task-id")
        let taskType = self.attr("task-type")
        console.log("taskId=" + taskId + " taskType=" + taskType)
        window.location.href = APP_PATH + "/order/task/super/downloadTask?taskId=" + taskId + "&taskType=" + taskType
      },
      uploadExcel: function (event) {
        let sysId = $("select[name='sysId']").val()
        let productId = $("select[name='productId']").val()

        console.log("sysId=" + sysId + " productId=" + productId)

        let file = $("#upfile").prop("files")[0]
        let formData = new FormData()
        formData.append("sysId", sysId)
        formData.append("productId", productId)
        formData.append("upfile", file)

        console.log("formData=" + formData)
        if (checkData()) {
          $.ajax({
            url: APP_PATH + "/order/import/super/importExcel",
            type: "POST",
            async: false,
            data: formData,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            dataType: "json",
            beforeSend: function () {
              console.log("正在进行，请稍候")
            },
            success: function (result) {
              if (result.statusCode === 200) {
                layer.alert("导入成功")
              } else {
                layer.alert("导入失败")
              }
            }
          })
        }

        // JS校验form表单信息
        function checkData() {
          let upfile = $("#upfile").val()
          let suffix = upfile.substr(upfile.lastIndexOf("."))
          if (upfile == "") {
            layer.alert("选择需要导入的Excel文件！")
            return false
          }
          if (suffix != ".xls" && suffix != ".xlsx") {
            layer.alert("选择Excel格式的文件导入！")
            return false
          }
          return true
        }
      }
    }
  })
}
