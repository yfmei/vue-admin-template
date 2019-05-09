# vue-admin-template
- dynamic admin template by vue
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# 环境
- 本地先安装 [node](https://nodejs.org/en/download/current/)自带npm

# 通过 npm 安装第三方库
```
# 淘宝镜像永久加速
npm set registry https://registry.npm.taobao.org
# 安装依赖
npm install
# 升级vue-cli 3.0
npm install -g @vue/cli
# 启动vue可视化项目管理器
vue ui
```

# 开发流程
- 配置页面展示元素 config.js，参考 **src/service/template/config/template.json**
- 创建模块主页面
- 引用模板 <ServiceTemplate/>
  - utils/configGenerator.js读取配置文件 config.js
  - 加载api, 后台请求使用 封装axios实例的 /utils/request.js
- 配置路由 routes/moduleA.js
  - 一级路由
    - 指定 component => import "@/views/service/moduleA/index"
  - 嵌套路由
    - 指定 component => import "@/views/layout/Layout"
    - 指定子路由
  - routes/index.js 引入moduleA.js
  
