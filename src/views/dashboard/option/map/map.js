/**
 * @author yfmei
 * 2018/7/3
 */
let mapType = "china"
let mapOption = function (data) {
  let categoryData = []
  let barData = []
  let sum = 0
  let count = data.length
  for (let i = 0; i < data.length; i++) {
    categoryData.push(data[i].name)
    barData.push(data[i].value)
    sum += data[i].value
  }
  console.log(categoryData)
  console.log(sum + "   " + count)

  return {
    title: [{
      left: "center",
      textStyle: {
        color: "#fff"
      }
    }, {
      id: "statistic",
      text: count ? "平均: " + parseInt((sum / count).toFixed(4)) : "",
      right: 120,
      top: 40,
      width: 100,
      textStyle: {
        color: "#fff",
        fontSize: 16
      }
    }],
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: "#fff"
        },
        emphasis: {
          borderColor: "#b1e4ff"
        }
      },
      feature: {
        dataZoom: {},
        brush: {
          type: ["rect", "polygon", "clear"]
        },
        saveAsImage: {
          show: true
        }
      }
    },
    tooltip: {
      trigger: "item"
    },
    grid: {
      right: 40,
      top: 100,
      bottom: 40,
      width: "30%"
    },
    xAxis: {
      type: "value",
      scale: true,
      position: "top",
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 2,
        textStyle: {
          color: "#aaa"
        }
      }
    },
    yAxis: {
      type: "category",
      //  name: 'TOP 20',
      nameGap: 16,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ddd"
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#ddd"
        }
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: "#ddd"
        }
      },
      data: categoryData
    },
    // 数据范围
    dataRange: {
      min: 0,
      max: 200000,
      color: ["#4ba4f5", "#e0f7ff"],
      itemWidth: 15, // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
      itemHeight: 100,
      text: ["单位：人", ""], // 文本，默认为数值文本
      calculable: true

    },
    series: [{
      id: "bar",
      zlevel: 1,
      type: "bar",
      symbol: "none",
      itemStyle: {
        normal: {
          color: "#ddb926"
        }
      },

      data: data
    }, {
      layoutCenter: ["50%", "50%"],
      layoutSize: 500,
      center: [125, 36], // 通过经纬度定位视角中心
      name: "用户数",
      type: "map",
      mapType: mapType,
      selectedMode: "single",
      itemStyle: {
        normal: {
          areaColor: "#4ba4f5",
          borderWidth: 1,
          borderColor: "#8585aa",
          label: { show: true }
        },
        emphasis: {
          areaColor: "#e0f7ff",
          label: { show: true }
        }
      },
      lineStyle: {
        normal: {
          color: "black",
          type: "dashed"
        }
      },
      data: data
    }]
  }
}

export default {
  mapOption
}
