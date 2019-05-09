/**
 * 利用 Module 生成vue数据项
 * @author yfmei
 * 2018/7/15
 */
function getLabels(moduleName, columns, attrs, valData) {
  // 获取模态框的数据
  let _titles = {
    columns: columns,
    attrs: attrs
  }

  let _labels = [],
      _i

  for (_i = 0; _i < _titles.columns.length; _i++) {
    let _col = _titles.columns[_i],
        _attr = _titles.attrs[_i],
        _data = {
          id: _attr,
          name: _col,
          module: moduleName, // 用模块区分相同字段
          val: "",
          desc: ""
        }
    if (isNotNull(valData)) {
      // 绑定参数校验信息
      _data["validate"] = valData.rules[_attr]
      _data["messages"] = valData.messages[_attr]
      _data["debug"] = valData.debug // debug模式校验成功也不提交表单
    }

    _labels.push(_data)
  }
  return _labels
}

/**
 * 构造vue的数据项
 * @param module
 * @returns
 */
function getModuleData(module) {
  let _moduleName = module.name,
      _modalTitle = module.modalTitle, //
      _displayColumns = module.displayColumns, // 列表页展示的字段
      _displayAttrs = module.displayAttrs, // 列表页展示的字段
      _columns = [], // 修改页涉及的字段
      _attrs = [], // 修改页涉及的字段
      _searchCondition = [], // 搜索框涉及的字段
      _valData = module.valData, // 需要校验的字段
      _parData = module.parData, // 模块涉及的基础数据
      _initData = [], // 需要初始化的数据
      _needInitData = module.needInitData // 模块涉及的基础数据

  // 没有需要初始化的数据就初始化为[]
  if (isNull(module.initData)) {
    module.initData = []
  }
  // 需要初始化的数据
  _initData = addArr(module.parData, module.initData)

  // 没有公用属性就初始化为[]
  if (isNull(module.commonColumns)) {
    module.commonColumns = []
    module.commonAttrs = []
  }

  // 没有表单属性就初始化为[]
  if (isNull(module.formColumns)) {
    module.formColumns = []
    module.formAttr = []
  }

  // 没有列表属性就初始化为[]
  if (isNull(module.displayColumns)) {
    module.displayColumns = []
    module.displayAttrs = []
  }

  // 没有搜索框属性就初始化为[]
  if (isNull(module.searchColumns)) {
    module.displayColumns = []
    module.searchAttr = []
  }

  // 没有模态框标题就初始化
  if (isNull(module.modalTitle)) {
    module.modalTitle = "模态框"
  }

  // 完整业务对象
  _columns = addArr(module.formColumns, module.commonColumns)
  _attrs = addArr(module.formAttr, module.commonAttrs)

  // 设置搜索条件
  for (var _i = 0; _i < module.searchColumns.length; _i++) {
    let _condition = {}
    _condition.id = module.searchAttr[_i]
    _condition.name = module.searchColumns[_i]
    _condition.val = ""
    _searchCondition.push(_condition)
  }

  // 构造vue的数据项
  // 参数校验
  let _labels = getLabels(_moduleName, _columns, _attrs, _valData)

  let _data =
    {
      moduleName: _moduleName,
      formName: "", // 模态框显示内容
      modalTitle: _modalTitle,
      labels: _labels, // 模态框需要展示的数据
      isAdd: true, // 新增还是修改
      pageNo: 1,
      pageSize: 10,
      totalPages: "",
      totalCount: "",
      showItems: 5, // 中间展示几页
      // prePage: "", // 这里不初始化, 页面也可以取到值
      // nextPage: "",
      hasPre: "",
      hasNext: "",
      addUrl: "/" + _moduleName + "/super/add",
      editUrl: "/" + _moduleName + "/super/update",
      getInfoUrl: "/" + _moduleName + "/super/getInfoById",
      getInfoData: {},
      getListUrl: "/" + _moduleName + "/super/getList",
      getListData: {},
      displayColumns: _displayColumns, // 列表页列名
      displayAttrs: _displayAttrs,

      loadParDataType: "list", // 加载基础数据的方式: list、reset、add、edit
      baseData: {}, // 当前模块涉及的基础数据
      parData: _parData, // 当前模块需要初始化并加载的基础数据
      columns: _columns, // 完整列名
      attrs: _attrs, // 完整属性名
      searchCondition: _searchCondition, // 搜索条件
      result: [], // 分页数据
      needInitData: _needInitData
    }

  // 初始化基础数据
  if (_initData.length > 0) {
    // 加载基础数据
    for (var _i = 0; _i < _initData.length; _i++) {
      let _baseData = _initData[_i]
      console.log(_baseData)
      _data.baseData[_baseData + "List"] = [] // 初始化当前模块涉及的基础数据为空
    }
  }

  // 把业务数据对象字段添加到vue的data中
  for (var _i in _attrs) {
    if (_attrs.hasOwnProperty(_i)) {
      let _attr = _attrs[_i]
      if (_attr === "sysIds") {
        _data[_attr] = []
      } else if (_moduleName === "ca" && _attr === "algorithmType") {
        _data[_attr] = []
      } else {
        _data[_attr] = ""
      }
    }
  }

  return _data
}
