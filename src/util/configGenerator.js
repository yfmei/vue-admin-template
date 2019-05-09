
function extractedFilter(rawFilter) {
  let filter = {}
  if (rawFilter === undefined) {
    return filter
  }

  filter.fields = {} // 表单域字段
  filter.defaultFields = {} // 表单域字段
  filter.rows = []

  filter.baseData = {} // 表单涉及的基础数据
  filter.meta = rawFilter.meta || {}

  // baseData 独立于 col
  initBaseData(filter)

  let cols = [] // 暂存每行数据
  let maxCol = rawFilter.maxCol || 3 // 一行cols列, 默认3列一行
  let span = 24 / maxCol

  // 过滤框字段
  let fields = rawFilter.fields
  for (let index in fields) {
    if (!fields.hasOwnProperty(index)) break
    let item = fields[index]
    initFields(filter, item)
    // 添加一列
    let col = {
      "prop": item.prop,
      "label": item.label,
      "type": item.type,
      "span": span
    }

    cols.push(col)

    // 添加一行. 最后一列和最后一个记为一行结束
    let mask = (Number(index) + 1) % maxCol === 0 || (Number(index) === fields.length - 1)
    if (mask) {
      filter.rows.push({ "cols": cols })
      cols = []
    }
  }
  let operate = rawFilter.operate || ["search", "close", "edit"] // 如不指定按钮, 默认显示查询、重置、新增按钮
  let position = rawFilter.position || "center" // 如不指定按钮, 默认 center
  let width = rawFilter.width || "80px" // 如不指定按钮, 默认80px
  let orientation = rawFilter.orientation || "level" // 表单方向 默认水平方向
  filter["operate"] = operate
  filter["position"] = position
  filter["width"] = width
  filter["orientation"] = orientation

  console.log("config filter ========== " + rawFilter)
  return filter
}

function extractedForm(rawForm) {
  let form = {}
  if (rawForm === undefined) {
    return form
  }

  form.fields = {} // 表单域字段
  form.rules = {} // 表单校验规则
  form.defaultRules = {} // 表单校验规则
  form.keys = [] // 表单主键

  form.rows = rawForm.rows || []

  form.baseData = {} // 表单涉及的基础数据
  form.meta = rawForm.meta || {}

  // baseData 独立于 col
  initBaseData(form)

  let rows = form.rows
  for (let row of rows) {
    if (row.cols === undefined || row.cols === "") {
      break
    }
    let span = 24 / row.cols.length
    for (let col of row.cols) {
      col.span = span
      form.rules[col.prop] = col.rules
      form.defaultRules[col.prop] = col.rules
      // 根据控件类型进行初始化
      initFields(form, col)

      // col.rules不为空则添加必填样式
      if (col.rules !== undefined) {
        col.className += " required"
      }
      if (col.key) {
        form.keys.push(col.prop)
        // 默认主键都是新增不展示, 禁止修改的
        col.add = false
        col.disabled = true
      }
      col.add = col.add === undefined ? true : col.add // 新增是否展示, 默认展示
      col.edit = col.edit === undefined ? true : col.edit // 修改是否展示, 默认展示
      col.disabled = col.disabled === undefined ? false : col.disabled // 是否可以修改, 默认不禁止
    }
  }
  let operate = rawForm.operate || ["submit"] // 如不指定按钮, 默认显示确定按钮
  let position = rawForm.position || "left" // 如不指定按钮, 默认 left
  let width = rawForm.width || "80px" // 如不指定按钮, 默认80px
  form["operate"] = operate
  form["position"] = position
  form["width"] = width

  return form
}

function extractedTable(rawTable) {
  let table = {} // 表格列名

  if (rawTable === undefined) {
    return table
  }

  let title = []
  // 没有指定width, 默认为空
  let operate = rawTable.operate || { "button": ["edit", "del"], "width": "" } // 如不指定按钮, 默认显示编辑和删除按钮
  let height = rawTable.height || 400 // 如不指定按钮, 默认表格高度为400
  let data = []

  if (rawTable.prop !== undefined) {
    rawTable.width = rawTable.width || new Array(rawTable.prop.length) // 没有指定width, 默认为空

    for (let i = 0; i < rawTable.prop.length; i++) {
      let item = {
        "prop": rawTable.prop[i],
        "label": rawTable.label[i],
        "width": rawTable.width[i]
      }
      title.push(item)
    }
  }
  table["select"] = false
  table["title"] = title
  table["operate"] = operate
  table["height"] = height
  table["data"] = data
  if (rawTable.select === "true") {
    table["select"] = true
  }
  console.log(table)
  return table
}

/**
 * 初始化数据项
 * @param form
 * @param item
 */
function initFields(form, item) {
  let val
  if (item.type === "select") {
    val = item.default || []
  } else if (item.type === "checkbox") {
    val = item.default || []
    // checkbox 增加全选按钮对应的 model  和 未全选样式属性
    item.checkAll = item.prop + "CheckAll" // 全选按钮对应 model
    item.isIndeterminate = item.prop + "IsIndeterminate" // 未全选样式
    // 初始化
    form.fields[item.checkAll] = false
    form.fields[item.isIndeterminate] = true
  } else if (item.type === "radio") {
    val = item.default || []
  } else if (item.type === "switch") {
    val = item.default || ""
    // 开关为true, 只保留on的规则，为false，只保留off的规则
    let hideProps = val ? item.event.off : item.event.on
    Object.keys(hideProps).forEach((item) => {
      form.rules[item.prop] = []
    })
  } else {
    val = item.default || ""
  }
  form.fields[item.prop] = val
  if (typeof form.defaultFields !== "undefined") {
    form.defaultFields[item.prop] = val
  }
}

/**
 * 初始化基础数据
 * @param form
 */
function initBaseData(form) {
  let meta = form.meta

  for (let data in meta) {
    if (!meta.hasOwnProperty(data)) continue
    let item = meta[data]
    // 初始化
    form.baseData[item.name + "List"] = []
  }
}

/**
 * 表单生成器
 * @author yfmei
 * 2018/7/14
 */

function configGenerator(config) {
  config.filter = extractedFilter(config.filter)
  config.form = extractedForm(config.form)
  config.table = extractedTable(config.table)
  config.loaded = true
  return config
}

export default configGenerator
