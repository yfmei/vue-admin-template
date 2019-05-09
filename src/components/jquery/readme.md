# 
- webpack.base.conf.js
```javascript

// 必定事先声明webpack，不然下面会不识别webpack
const webpack = require('webpack')

module.exports = {
    resolve: {
        alias: {
          'jquery': 'jquery' 
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          jquery: "jquery",
          "windows.jQuery": "jquery"
        })
    ],
    ...
}
```

- main.js 引入
```javascript
import $ from "jquery"
```
