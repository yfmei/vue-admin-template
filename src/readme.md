# vue 工程
## 前端框架
   - 动态布局 - 动态表单、动态列表、动态筛选框
   - 开发业务模块只需要关注 config.json(数据), index.vue(事件)和路由即可
   - 屏蔽了基础数据的获取和绑定, 数据项绑定, 翻页
   - 内置常用按钮, 默认为编辑和删除按钮, 可自行替换, 只需要在 config.json 中指定即可

## 目录结构
- api
    - 业务接口
    - 基础数据接口
    - 报表接口
    - 通用接口
- assets
    - 图标、logo等资源
- components
    - 通用组件：分页、滚动条等
- router
    - 路由分发
- store
    - vuex 状态管理模式
- style
    - 全局样式
- utils
    - 解析config.js, 封装请求类、cookie操作工具等
- views
    - 页面
    - dashboard 报表
    - layout 页面基础布局
    - service 业务模块
        - template 模板
## 
- vue组件化 = 自定义html标签（样式和事件）
- export 的用法
- 全局变量
- 父子组件通信
    - props
    - emmit
    - refs

## 问题汇总
- [跨域问题](https://www.jianshu.com/p/3dd667e42395)
- 打包后显示空白
    - 控制台资源加载404，路径问题：assetsPublicPath: "/" -> "./"
    - router history 模式导致，需要后台配置支持或者使用默认的hash模式

