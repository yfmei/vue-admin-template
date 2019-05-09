## 数据保存在 localStorage中
- 浏览器打开期间 sessionStorage,关闭时 localStorage
- 容量判断

## 前端框架
- 动态布局 - 动态表单、动态列表、动态筛选框
- 开发业务页面只需要关注 config.json(数据), index.vue(事件)
- 屏蔽了基础数据的获取和绑定, 数据项绑定, 翻页
- 内置常用按钮, 默认为编辑和删除按钮, 可自行替换, 只需要在 config.json 中指定即可

### 数据层
#### config.json
- filter
  - fields      对象, 筛选框数据项
  - meta        对象, 关联基础数据和数据项, key 是数据项
  - operate     数组, 操作按钮

- form
  - header      
  - footer      
  - meta        对象, 关联基础数据和数据项, key 是数据项
  - rows        数组, 表单数据项网格布局

- rows 
  - className
  - cols        数组
    - prop      数据项
    - label     数据项 label 
    - type      控件类型, input, select, chebox ...
    - className
    - rules     数组
    - key       boolean

- table
  - prop        数组, 列表对应数据项
  - label       数组, 列表名
  - operate     数组, 操作按钮
  
#### 最终格式
- filter
  - fields
  - meta        对象, 关联基础数据和数据项, key 是数据项
  - initData    数组, 需要初始化就加载的基础数据, 级联数据的子数据不需要主动加载
  - baseData    基础数据列表
  - rows
  - operate     操作按钮

- form
  - fields      表单所有数据项
  - rules       数据项校验规则
  - keys        表单主键
  - meta        对象, 关联基础数据和数据项, key 是数据项
  - initData    数组, 需要初始化就加载的基础数据, 级联数据的子数据不需要主动加载
  - baseData    基础数据列表
  - rows        表单布局

- rows 
  - className
  - cols        数组
    - prop      数据项
    - label     数据项 label 
    - type      控件类型, input, select, chebox ...
    - className
    - rules     数组
    - key       boolean

- table
  - data        列表数据
  - keys        主键
  - operate     操作按钮
  - title       列表头
  
- 备注
  - meta -> initData baseData
  - fields -> rows
  - rows -> fields
## 备注
- config.json
  - 为什么 filter 和 form 最终格式大体一致, 但声明格式却不一致?
    - filter 的布局基本上不会改变, 要改变通过 maxCol 即可
    - form 的布局经常会发生改变, 很难通过代码控制布局, 所以在声明时指定比较方便
    
## todo
- 用户订单新增不展示产品信息, 修改时展示, 但不可修改
- 日志只能查看不能修改
- 全局请求 URL 前缀
- input 对应的 label 字体调整
- 参数校验
- 增删改接口调用
- 权限模块
- 表单长度限制
- 应用查询接口 caName 改为 caId
- 证书
- 添加系统 产品多选
- 订单导入和查询 没有系统ID 不查询产品
- config.json table增加url和参数配置

## 已解决
- 修改时级联数据, 子数据未拉取, 页面只显示数据id, 没有数据列表
  - 部分场景不需要获取上级数据的第一条数据作为参数, 查询子数据导致
- 表单清空没有清空基础数据
- checkbox 全选
  - v-model 为空导致
- 蒙层遮挡表单
- config.json 数据覆盖导致 table.title 丢失

## 组件接口封装
- filter
  - showDialog("add")
- dynamicForm
  - showDialog("edit")

```
showDialog(type){
  let self = this
  self.dialogFormVisible = self.displayDialog
  self.form.type = type

  if (type === "add") {
    self.init() // 请求基本数据
  } else {
    self.$emit("edit-event", data, this.getInfoUrl)
    // getInfoCallback 后再执行 self.init()
  }
}
```
- add del edit search
- submit del getInfoById getList

## 事件分发
- 当前模式对外接口过多
- 所有事件通过事件名，参数的形式调用
