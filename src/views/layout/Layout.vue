<template>

  <el-container>

    <el-header height="72px" class="app-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="6">
          <div class="fl">
            <Logo/>
          </div>
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="fr">
            <Setting/>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="app-container">
      <el-aside>
        <Sidebar class="app-side"/>
      </el-aside>

      <el-main>
        <AppMain class="app-main"></AppMain>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>

  import { Logo, Setting, Sidebar, AppMain } from "./components"
  export default {
    name: "Layout",
    components: {
      Logo,
      Setting,
      Sidebar,
      AppMain
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .app-header{
      width: 100%;
      height: 72px;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      color: #fff;
      background: #152c7c;
  }

  .app-container {
      position: fixed;
      top: 72px;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }

  .app-side{
      width: 14%;
      position: fixed;
      top: 72px;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-y: scroll;/*显示y轴滚动条*/
      overflow-x: hidden;/*隐藏x轴滚动条*/
  }

  .app-main{
      width: 85%;
      position:fixed;
      top: 72px;
      right: 0;
      bottom: 0;
      overflow-y: scroll;/*显示y轴滚动条*/
      overflow-x: hidden;/*隐藏x轴滚动条*/
  }

</style>
