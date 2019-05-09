/**
 * @author yfmei
 * 2018/7/12
 */
import request from "@/utils/request"

function plot(chartData, callback) {
  request({
    url: chartData.url,
    method: "post",
    data: {}
  }).then(function (response) {
    if (response.data.statusCode === 200) {
      let result = response.data
      console.log("response result: " + result)
      // callback(chartData, result)
      let _data = transform(result.returnObj)
      callback(_data)
    } else {
      // parseMsg(result.returnObj)
    }
  })
}

/**
 * 提取报表的标题和数据
 * @param originData
 * @returns {{title: Array, data: Array}}
 */
function extractedData(originData) {
  let name = []
  let value = []

  for (let i = 0; i < originData.length; i++) {
    let _data = originData[i]
    name.push(_data.name)
    value.push(_data.value)
  }
  return {
    "name": name,
    "value": value
  }
}
/**
 * 提取报表数据格式为name: value
 * @param data
 */
function transform(data) {
  let _data = []
  for (let i = 0; i < data.length; i++) {
    let obj = data[i]
    let item = {}
    item["name"] = obj["dataId"]
    item["value"] = obj["dataCount"]
    _data.push(item)
  }
  return _data
}

export default {
  plot,
  extractedData
}
