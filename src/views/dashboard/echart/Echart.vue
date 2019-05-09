<template>
  <div :id="chartData.id" :style="chartData.style"></div>
</template>

<script>

  import echarts from "echarts"
  import dashboard from "@/api/dashboard/dashboard"

  import "echarts/map/js/china"

  export default {
    name: "EChart",
    props: {
      chartData: {
        type: Object,
        default() {}
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        this.plot()
      })
    },
    methods: {
      plot: function () {
        dashboard.plot(this.chartData, this.fetchData)
      },
      fetchData: function (data) {
        // fetchData: function (chartData, data) {
        console.log("draw echarts")
        let myChart = echarts.init(document.getElementById(this.chartData.id))

        if (this.chartData.sort) {
          data.sort(function (a, b) {
            return a.value - b.value
          })
        }
        if (this.chartData.extract) {
          data = dashboard.extractedData(data)
        }

        myChart.setOption(this.chartData.option(data))
      }
    }
  }
</script>

<style type="text/scss" scoped>

</style>
