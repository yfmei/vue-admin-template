<template>
  <div class="setting">
    <el-dropdown class="pr10" placement="bottom">
      <i class="iconfont icon-settings"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="setting">修改密码</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <i class="iconfont icon-peoplefill pr10"></i>
    <span  class="pr10">admin</span>
    <i class="iconfont icon-exit pr10"></i>
    <span @click="exit" class="logout pr10">退出</span>
  </div>
</template>

<script>
  import { logout } from "@/api/login"
  export default {
    name: "Setting",
    methods: {
      exit() {
        let self = this
        logout(self)
      },
      setting() {
        console.log("设置")
        this.$router.push({ path: "/setting" })
      }
    }
  }
</script>

<style type="text/scss" scoped>
  .setting {
    position: relative;
    z-index: 2;
    height: 72px;
    padding: 0 10px;
    line-height: 72px;
  }

  .pr10{
      padding-right: 3px;
  }
  .logout{
    cursor: pointer;
  }
  .iconfont{
    font-size: 14px !important;
  }
  span {
    font-size: 13px !important;
  }
</style>
