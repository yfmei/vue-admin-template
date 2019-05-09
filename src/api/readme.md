# api 两种使用方式
- 导出单个函数
```
export function getList(data, url) {
  return request({
    data: data,
    url: url,
    method: "post"
  }).then(function (response) {
    console.log("getList response result: " + response)
  })
}
```
- 使用
```
import {getList} from "./admin" // admin.js
getList(data, url)
```

- 导出整个文件，并指定导出的函数
```
function login(){
  ...
}
export default{
  login
}
```
- 使用
```
import admin from "./admin" // admin.js
admin.getList(data, url)
```