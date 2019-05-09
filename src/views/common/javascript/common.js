/**
 * 判断元素不存在
 * @param el
 * @returns
 */
function isNull(el) {
  return !isNotNull(el)
}

function addArr(displayArr, columns) {
  let arr = displayArr.concat()
  for (let i = 0; i < columns.length; i++) {
    arr.push(columns[i])
  }
  return arr
}

/**
 * 判断元素存在
 * @param el
 * @returns
 */
function isNotNull(el) {
  return el !== null && el !== "" && typeof el !== "undefined"
}

/**
 * form表单校验
 * @param self vue实例
 * @param item
 * @returns
 */
function validate(self, item) {
  if (isNull(item) || isNull(item.validate)) {
    // 参数非法或者没有校验属性就不需要校验
    return "ok"
  }

  // 校验
  let _validate = item.validate,
      _messages = item.messages,
      _itemVal = self[item.id] // vue实例绑定的值

  // 分别判断新增、修改是否需要校验
  if (isNotNull(_validate.module) && (_validate.isAdd && !_validate.module.add || !_validate.isAdd && !_validate.module.edit)) {
    return "ok"
  }

  if ((_itemVal === "" || _itemVal.length === 0) && _validate.required) {
    return _messages.required
  }

  if (isNotNull(_validate.min) && _itemVal.length < _validate.min) {
    return _messages.min
  }

  if (isNotNull(_validate.max) && _itemVal.length > _validate.max) {
    return _messages.max
  }

  // 格式校验
  if (isNotNull(_validate.pattern) && !_validate.pattern.exec(_itemVal)) {
    return _messages.formError
  }

  // 与指定元素比较是否相等
  if (isNotNull(_validate.equalTo) && !self[_validate.equalTo] === _itemVal) {
    return _messages.equalTo
  }

  return "ok"
}

/**
 * 遍历
 * @param obj
 * @param callback 遍历的回调函数, 可接受两个参数 (val, key), 如不需要key, 可以只接受一个参数: (val)
 * @param type 遍历方式 1: Object.keys; 2: for in
 */
function each(obj, callback, type = 1) {
  console.log(`obj type: ${typeof obj}`)

  if ((typeof obj) === "object" && obj !== null) {
    console.log("through the object")
  }

  // 下面两种方法的 key 视具体情况表现形式不同
  // type obj === object: key = item
  // type obj === other: key = index
  // 总结: 遍历对象无 key, js 提供默认索引为 key; 遍历对象是 kv 格式, 对象的 k 覆盖key

  switch (type) {
    case 1:
      Object.keys(obj).forEach(function (key) {
        console.log(`${key}: ${obj[key]}`)
        callback(obj[key], key)
      })
      break
    case 2:
      for (let key in obj) {
        console.log(`${key}: ${obj[key]}`)
        // callback(key, obj[key])
      }
      break
  }
}
