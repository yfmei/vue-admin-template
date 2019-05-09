/**
 * @author yfmei
 * 2018/7/3
 */

let monthAddUser = function (data) {
  return {

    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["新增用户"]
    },
    // toolbox: {
    //     show: true,
    //     feature: {
    //         dataView: {show: true, readOnly: false},
    //         magicType: {show: true, type: ['line', 'bar']},
    //         restore: {show: true},
    //         saveAsImage: {show: true}
    //     }
    // },
    calculable: true,
    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
    xAxis: [
      {
        type: "category",
        data: data.name
      }
    ],
    // 声明一个 Y 轴，数值轴。
    yAxis: [
      {
        type: "value"
      }
    ],
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
    series: [
      {
        name: "新增用户",
        type: "bar",
        data: data.value,
        markPoint: {
          data: [
            { type: "max", name: "最大值" },
            { type: "min", name: "最小值" }
          ]
        },
        markLine: {
          data: [
            { type: "average", name: "平均值" }
          ]
        }
      },
      {
        name: "留存用户",
        type: "bar",
        data: data.data1,
        markPoint: {
          data: [
            { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
            { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
          ]
        },
        markLine: {
          data: [
            { type: "average", name: "平均值" }
          ]
        }
      }
    ]
  }
}

let topCity = function (data) {
  return {

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },

    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: "category",
      data: data.name
    },
    series: [
      {
        type: "bar",
        data: data.value
      }
    ]
  }
}

export default {
  monthAddUser,
  topCity
}
