/**
 * @author yfmei
 * @date 2018/8/21
 */


/**
 * 计算移动距离
 */
function migrationLength(e) {
    
}

/**
 * 移动目标元素
 * @param e
 * @param pos
 */
function move(e, pos) {
    e.style.left = pos.x + "px"
    e.style.top = pos.y + "px"
}

module.exports = {
    migrationLength,
    move
}