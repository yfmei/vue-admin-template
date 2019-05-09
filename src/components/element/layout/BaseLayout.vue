<template>
  <div>
    <h1>基本布局</h1>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "BaseLayout"
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" scoped>

</style>
