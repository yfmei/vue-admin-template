import { isArray } from "./common"

// 子节点
function transformToTree(setting, sNodes) {
  let i, l
  let childKey = setting.data.key.children,
      key = setting.data.simpleData.idKey,
      parentKey = setting.data.simpleData.pIdKey

  if (!key || key === "" || !sNodes) return []

  if (isArray(sNodes)) {
    let r = []
    let tmpMap = []
    for (i = 0, l = sNodes.length; i < l; i++) {
      tmpMap[sNodes[i][key]] = sNodes[i]
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] !== sNodes[i][parentKey]) {
        if (!tmpMap[sNodes[i][parentKey]][childKey]) { tmpMap[sNodes[i][parentKey]][childKey] = [] }
        tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i])
      } else {
        r.push(sNodes[i])
      }
    }
    return r
  } else {
    return [sNodes]
  }
}

function transformToArray(setting, nodes) {
  if (!nodes) return []
  let childKey = setting.data.key.children,
      r = []
  if (isArray(nodes)) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      r.push(nodes[i])
      if (nodes[i][childKey]) { r = r.concat(transformToArray(setting, nodes[i][childKey])) }
    }
  } else {
    r.push(nodes)
    if (nodes[childKey]) { r = r.concat(transformToArray(setting, nodes[childKey])) }
  }
  return r
}

export default {
  transformToArray,
  transformToTree
}
