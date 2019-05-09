# 基础数据
- 分类
  - 基础数据(不变更, 如性别)
  - 基础业务数据(动态数据, 可能需要动态调整参数, 如角色、系统等)
  - 级联数据(如地市、日期)
  
- 区分
  - 筛选框和编辑框互不影响
  - 新增和修改
    - 状态、性别等信息新增时可默认，不需要查询
- 级联
  - onchange事件
  - 获取 parentData[0]

## 伪代码
- 获取请求URL和基本参数
```
  function baseData(){
    let url = {
        type: "",
        status: ""
      }
      
    let baseData = {
      sex: {
        url: url.type,
        data: {
          moduleId: "10"
        }
      },
      userStatus: {
         url: url.status,
         data: {
           moduleId: "20"
         }
      }
    }
    
    return baseData
  }

```

- 请求数据
```
    
  function requestBaseData(dataName, callback){
    // 获取URL和基本参数
    let data = baseData[dataName].data || {}
    let url = baseData[dataName].url
  
    // 通用接口请求数据
    request({
      data: data,
      url: url,
      method: "post"
    }).then((res) => {
      console.log("base data: " + res)
      callback(res)
    })
  }
  
  // 调用
  requestBaseData("city", function (result) {
    // 回调请求基础数据
    data.baseData[parTypeList] = result.returnObj
    // 地市级联查询
    // 应该在初始化的时候配置级联项
    if (parType === "province") {
      loadBaseData("city", data)
    } else if (parType === "city") {
      loadBaseData("county", data)
    } else if (moduleName === "order/import" && parType === "system") {
      loadBaseData("product", data)
    } else if (parType === "ca") {
      let algorithmType = "algorithmType"
      // if (orderList) {
      //   algorithmType = "s_" + algorithmType
      // }
      loadBaseData(algorithmType, data)
    }
  }
  
```

- 添加级联数据的查询条件
```
  /*
   * @param dataName 请求的基础数据名, city
   * @param prop 查询条件, 上级数据绑定 vmodel, 如 provinceId
   * @param label 上级数据对应的基础数据列表名, 如 province
   * @param self 当前vue实例
   */
  function setBaseDataParams(dataName, prop label, self){
    if (isNull(self)) {
      return
    }
  
    let data = {}
    // 如果本条数据没有所属上级, 取上级数据列表中的第一条数据为默认值
    if (isNull(self[prop])) {
      let propList = self[label + "List"]
      if (isNotNull(propList) && propList.length > 0) {
        let upData = self[label + "List"] // 上级数据
        if (isNotNull(upData)) {
          // 上级数据
          data = upData[0][prop]
        } else {
          // 上级数据不存在应该不要条件, 查询全部
        }
      }
    } else {
      data = self[prop]
    }
    baseData[dataName].data[prop] = data
  }
```

## 基础数据统一封装为 {value: "", label: ""}
- 如 {value:"01", label: "北京"}

## 初始化加载基础数据示例
- html
```
<el-form-item>
  <el-select v-model="sysId" placeholder="请选择系统" value="">
    <template >
      <el-option
        v-for="(item, index) in baseData['systemList']"
        :key="index"
        :label="item.label"
        :value="item.prop"></el-option>
    </template>
  </el-select>
</el-form-item>

```
- data
```
data(){
  return {
    fields: {
      sysId: ""
    },
    baseData: {
      systemList: []
    }
  }
}
```

- methods
```
init() {
  // 初始化记载基础数据
  loadBaseData("system", this) // 加载基础数据
}
```

## 级联数据示例
- html
```
<el-form-item>
  <el-select v-model="sysId" placeholder="请选择系统" value="" @change="getParRelationData('product')">
    <template >
      <el-option
        v-for="(item, index) in baseData['systemList']"
        :key="index"
        :label="item.label"
        :value="item.prop"></el-option>
    </template>
  </el-select>
</el-form-item>
<el-form-item>
  <el-select v-model="productId" placeholder="请选择产品" value="">
    <template >
      <el-option
        v-for="(item, index) in baseData['productList']"
        :key="index"
        :label="item.label"
        :value="item.prop"></el-option>
    </template>
  </el-select>
</el-form-item>
```
- data
```
data(){
  return {
    fields: {
      sysId: "",
      productId: ""
    },
    baseData: {
      systemList: [],
      productList: []
    }
  }
}
```

- methods
```
init() {
  // 初始化记载基础数据
  loadBaseData("system", this) // 加载基础数据
},
getParRelationData: function (dataName) {
  // 级联数据查询
  let self = this
  console.log(dataName)
  loadBaseData("product", self) // 加载基础数据
},
```