/**
 * @author yfmei
 * @date 2018/7/29
 */
import request from "@/utils/request"

export function getList(data, url, vm) {
  return request({
    data: data,
    url: url,
    method: "post"
  }).then(function (response) {
    console.log("getList response result: " + response)
    vm.$refs.ServiceTemplate.getListCallback(response)
  })
}

export function getInfoById(data, url, vm) {
  return request({
    data: data,
    url: url,
    method: "post"
  }).then(function (response) {
    console.log("getInfoCallback response result: " + response)
    let res = response.returnObj
    vm.getInfoCallback(res)
  })
}

export function submit(data, url, vm) {
  return request({
    data: data,
    url: url,
    method: "post"
  }).then(function (response) {
    console.log("submit response result: " + response)
    vm.$refs.ServiceTemplate.submit(response)
  })
}
