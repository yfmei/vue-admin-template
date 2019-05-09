/**
 * @author yfmei
 * @date 2019/1/7
 */
/**
 * 给元素绑定事件
 * @param elem
 * @param eventName
 * @param eventType
 */
function eventHandler(elem, eventName, eventType){
  // elem.attachEvent 兼容IE8及以下版本浏览器事件
  // addEventListener 支持Chrome、FireFox、Opera、Safari、IE9.0及其以上版本都支持该函数
  elem.addEventListener ? elem.addEventListener(eventType, eventName, false) : elem.attachEvent('on'+eventType, eventName);
}

module.exports={
  eventHandler
}