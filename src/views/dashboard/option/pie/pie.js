/**
 * @author yfmei
 * 2018/7/3
 */
let industryUserProfile = function (data) {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: "行业分布",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
}

export default {
  industryUserProfile
}
