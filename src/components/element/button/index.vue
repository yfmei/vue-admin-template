<template>
  <div>
    <el-table>
      <el-row>plain 是否朴素按钮 boolean false</el-row>
      <el-row>circle 是否圆形按钮 boolean false</el-row>
      <el-row>loading 是否加载中状态 boolean false</el-row>
      <el-row>disabled 是否禁用 boolean false</el-row>
    </el-table>
    <Buttons/>
    <Text/>
    <Icon/>
    <Group/>
    <Loading/>
  </div>

</template>

<script>
  import Buttons from "./Buttons"
  import Text from "./Text"
  import Icon from "../icon/index"
  import Group from "./Group"
  import Loading from "./Loading"

  export default {
    name: "Button",
    components: {
      Buttons,
      Text,
      Icon,
      Group,
      Loading
    }
  }
</script>

<style type="text/scss" scoped>

</style>
