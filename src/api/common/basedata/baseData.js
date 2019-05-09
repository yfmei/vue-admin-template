/**
 * @author yfmei
 * @date 2018/7/25
 */
import request from "@/utils/request"
import baseData from "./config"
import { getCookie } from "@/utils/cookie"

function relationDataParams(dataName, data) {
  // 设置级联数据的查询条件
  // 1、地市需要省份id
  // 2、区县需要省份id和地市id
  // 3、算法标识需要caId
  // 4、产品需要sysId
  if (dataName === "city") {
    // 省份id
    setBaseDataParams(dataName, "provinceId", "province", data)
  } else if (dataName === "county") {
    // 省份id
    setBaseDataParams(dataName, "provinceId", "province", data)
    // 获取地市id
    setBaseDataParams(dataName, "areaCode", "city", data)
    setBaseDataParams(dataName, "cityId", "city", data)
  } else if (dataName === "algorithmType") {
    // 编辑框基础数据列表
    setBaseDataParams(dataName, "caId", "ca", data)
  } else if (dataName === "product") {
    // 系统id
    setBaseDataParams(dataName, "sysId", "system", data)
  }
}

function uniformDataType(result, data, baseDataList) {
  // 全局基础数据 键
  let key = ["value", "label"]
  let newData = []
  for (let index in result) {
    let item = result[index]
    let data = {}
    let valArr = []

    let count = 0
    for (let i in item) {
      if (i === "sequenceId") {
        continue
      } else {
        if (count > 1) break
        console.log("格式化数据后删除")
      }
      valArr.push(item[i])
      count++
    }

    for (let i in valArr) {
      let val = valArr[i]
      // todo 基础数据返回顺序不统一, 有的id在前, 有的name在前, 暂时按数据类型判断, 格式化数据后删除
      let test = true
      if (test && baseDataList !== "allAlgorithmTypeList" && baseDataList !== "algorithmTypeList") {
        if (!isNaN(val)) {
          data[key[0]] = val
        } else {
          data[key[1]] = val
        }
      } else {
        data[key[i]] = val
      }
    }

    newData.push(data)
  }
  // 兼容
  if (data.form !== undefined) {
    data.form.baseData[baseDataList] = newData
  } else {
    data.baseData[baseDataList] = newData
  }
}

/**
 * 获取基础数据
 * 1、新增、列表页, 数据如已存在, 则不再请求, 除了级联数据, 级联数据可以过滤一下, 每次都重新请求
 * 2、修改, 每次都重新获取数据
 * @param dataName 基础数据
 * @param data vue实例的数据项
 */
function loadBaseData(dataName, data) {
  let parTypeList = dataName + "List" // 根据parType, 获取vm实例的基础数据对象名

  if (typeof data === "undefined") {
    return
  }
  relationDataParams(dataName, data)

  // 根据数据类型获取url请求数据
  requestBaseData(dataName, data, function (result) {
    // 回调请求基础数据

    // 统一基础数据格式为 {prop: "", label: ""}
    uniformDataType(result, data, parTypeList)
  })
}

/**
 * 基础数据请求接口
 * @param dataName 请求的基础数据
 * @param data vue 实例
 * @param callback
 */
function requestBaseData(dataName, data, callback) {
  // 获取URL和基本参数
  let _data = baseData[dataName].data || {}

  let url = baseData[dataName].url
  let adminType = data.$store.state.adminType
  // 网页刷新 store中的值就没了，从cookie中读
  if (adminType === "" || adminType === undefined) {
    adminType = getCookie("adminType")
  }
  if (dataName === "system" && adminType === "sys") {
    adminType = "area"
  }
  url = url.indexOf("$") > 0 ? url.replace(/\$/, adminType) : url
  // todo 管理员和用户模块都有userType 但是查询参数不同。现在只能通过判断没有adminId字段就是用户模块
  if (data.form !== undefined && data.form.fields.adminId === undefined && dataName === "userType") {
    _data["moduleId"] = "150"
  }
  if (dataName === "product") {
    _data["tarSysId"] = _data["sysId"] || ""
  }
  if (dataName === "groupRelation") {
    _data["groupId"] = data["groupId"] || ""
    if (_data["groupId"] === "") {
      return
    }
  }
  // 通用接口请求数据
  request({
    data: _data,
    url: "" + url,
    method: "post"
  }).then(function (response) {
    console.log("requestBaseData response result: " + response)
    callback(response.data.returnObj)
  })
}

/**
 * 设置级联数据的查询条件
 * @param dataName 请求的基础数据名
 * @param attr 查询条件, 上级数据
 * @param upDataName 上级数据列表名
 * @param self vue实例
 * @returns {*}
 */
function setBaseDataParams(dataName, attr, upDataName, self) {
  if (isNull(self)) {
    return
  }
  let data = {}
  if (self.fields === undefined) {
    self = self.form
  }
  if (isNull(self.fields[attr])) {
    // 上级数据为空，取列表的第一条数据做查询条件
    let upDataList = self.baseData[upDataName + "List"] // 上级数据列表
    if (isNotNull(upDataList) && upDataList.length > 0) {
      // 上级数据
      data = upDataList[0]["prop"] // 上级数据列表的第一条数据
    } else {
      // 上级数据不存在, 应该是查询全部数据
      // todo 编辑时的下拉框绑定的 v-model 如不查询显示为id
    }
  } else {
    data = self.fields[attr]
  }
  baseData[dataName].data[attr] = data
}

function isNull(el) {
  return !isNotNull(el)
}

/**
 * 判断元素存在
 * @param el
 * @returns
 */
function isNotNull(el) {
  return el !== null && el !== "" && typeof el !== "undefined"
}

export default loadBaseData
