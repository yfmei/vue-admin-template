/**
 * @author yfmei
 * 2018/7/15
 */
/**
 * 弹框
 * @param type
 */
function msg(type) {
  if (type === "add") {
    modalInit(addForm, addElem, addOkBtn, add)
  } else {
    modalInit(editForm, editElem, editOkBtn, edit)
  }
}

/**
 * 初始化弹窗
 * @param form
 * @param elem
 * @param btn
 * @param callback
 */
function modalInit(form, elem, btn, callback) {
  // 清除模态框的数据

  modalBtnBind(form, elem)

  modalOkBind(elem, btn, callback)

  // 删除对话框, 因为modal有个bug, shown.bs.modal打开n次, 第n次就会执行n次
  // $(elem).on("hidden.bs.modal", function() {
  //     $(this).remove(); // 删了就没对话框了
  // });
}

function modalBtnBind(form, elem) {
  reset_form(form)
  $(elem).modal({
    backdrop: "static"
  })
}

function modalOkBind(elem, btn, callback) {
  $(elem).on("shown.bs.modal", function () {
    // alert("加载完成");  // shown.bs.modal 打开n次, 第n次就会执行n次, 会导致重复提交, 下面处理下
    // 新增提交
    if (!isBind(btn, "click")) {
      // alert("绑定click");
      $(btn).on("click", callback)
    }
  })
}

/**
 * 判断元素是否绑定了指定事件
 * @param el
 * @param event
 */
function isBind(el, event) {
  //
  let _objEvt = $._data($(el)[0], "events"),
      _mask = _objEvt && _objEvt[event]
  // if (mask) {
  //     alert('bind click');
  //
  // } else {
  //     alert('Not bind click');
  // }
  return _mask
}

function unbind() {
  jQuery.noConflict()
}

function each(obj, callback) {
  $.each(obj, function (index, item) {

  })
}
