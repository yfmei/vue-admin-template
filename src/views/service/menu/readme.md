# 菜单树

## 场景
- 分配菜单
    - 单节点
    - 复选框选中对象，全选对象
    - 提交、展开、收起
- 修改菜单信息
    - 展示全部节点
    - 增删改

## 需求
- 开关配置分配菜单还是修改菜单信息
- 最少支持两级菜单
- 单击事件
- 自定义结点key值
- 双击事件
- 新增
- 结点全选（可选）
- 自定义样式
- 结点图标

## 配置项
```
let setting = {
    data: {
        simpleData: { // 不需要用户转换数据，指定键值就可以
            enable: true,
            idKey: "funcId", // 当前元素id名
            name: "funcName", // 当前元素名称
            pidKey: "parentId", // 父元素id名
            root: "" // 当前根节点
        },
        key: {
            children: "children",
            checked: "checked",
            isParent: "isParent",
            isHidden: "isHidden"
        }
    }
}

let treeData = {}


```

## 数据项
```
let treeNode = {
    id: "",
    name: "",
    open: true
    children: [
    {   
        id: "",
        name: ""
    },
    {
        id: "",
        name: ""
    }
    ]
}
```