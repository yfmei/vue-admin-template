<template>
  <div>
    <h1>对齐方式</h1>
    <div>
      <h2>水平布局: justify</h2>
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row class="row-bg" type="flex" justify="center">
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row class="row-bg" type="flex" justify="end">
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row class="row-bg" type="flex" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row class="row-bg" type="flex" justify="space-around">
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>

    <div>
      <h2>垂直布局: align</h2>
      <el-row type="flex" class="row-bg" justify="center" align="top">
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center" align="bottom">
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Align"
  }
</script>

<style type="text/scss" scoped>

</style>
