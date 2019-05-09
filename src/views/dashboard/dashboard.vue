<template>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-inner">
                <el-row>
                    <el-col :span="12">
                        <div class="panel panel-default ui-progress-panel">
                            <div class="panel-heading">日新增用户数</div>
                            <div class="panel-body">
                                <div class="chartbox-sm">
                                    <EChart :chart-data="option.dailyAddUser"/>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="panel panel-default ui-progress-panel">
                            <div class="panel-heading">证书使用情况</div>
                            <div class="panel-body">
                                <div class="chartbox-sm">
                                    <EChart :chart-data="option.certUse"/>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="panel panel-default ui-progress-panel">
                            <div class="panel-heading">各地市用户分布</div>
                            <div class="panel-body">
                                <div class="chartbox-sm">
                                    <EChart :chart-data="option.areaUserProfile"></EChart>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="panel panel-default ui-progress-panel">
                            <div class="panel-heading">月用户新增报表</div>
                            <div class="panel-body">
                                <div class="chartbox-sm">
                                    <EChart :chart-data="option.monthAddUser"/>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="panel panel-default ui-progress-panel">
                            <div class="panel-heading">行业用户分布</div>
                            <div class="panel-body">
                                <div class="chartbox-sm">
                                    <EChart :chart-data="option.industryUserProfile"></EChart>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="panel panel-default ui-progress-panel">
                            <div class="panel-heading">城市活跃用户TOP 10</div>
                            <div class="panel-body">
                                <div class="chartbox-sm">
                                    <EChart :chart-data="option.topCity"></EChart>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>

  import EChart from "./echart/Echart"
  import dashboardData from "./echart/config"

  export default {
    name: "Dashboard",
    components: {
      EChart
    },
    data() {
      return {
        option: dashboardData.option
      }
    }
  }
</script>

<style type="text/scss" scoped>
  .chart{
      /*padding: 20px;*/
      /*background-color: #e3ebf7;*/
  }

  .page-content-wrapper {
       float: left;
       width: 100%;
   }
  .page-content-wrapper .page-content {
      margin-top: 0;
      background-color: #e3ebf7;
  }
  .el-row{
      margin-right: -15px;
      margin-left: -15px;
  }
  .el-col{
      padding-right: 15px;
      padding-left: 15px;
  }
  .page-content-inner {
      padding: 20px 30px;
  }

  .panel.panel-default {
      border-color: #dae2ee;
  }
  .panel-default {
      /* border-color: #ddd; */
  }
  .panel {
      margin-bottom: 20px;
      background-color: #fff;
      border: 1px solid transparent;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
      box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  }

  .panel.panel-default .panel-heading {
      background: #fff;
  }
  .panel .panel-heading {
      padding: 10px 15px;
      min-height: 40px;
      border-bottom: 1px solid #dae2ee;
      font-size: 16px;
  }
  .panel-default > .panel-heading {
      color: #333;
      background-color: #f5f5f5;
      border-color: #ddd;
  }
  .panel-heading {
      padding: 10px 15px;
      border-bottom: 1px solid transparent;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
  }
  .panel-body {
      padding: 15px;
      background: #fff;
  }
</style>
