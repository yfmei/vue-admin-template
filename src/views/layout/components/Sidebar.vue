<template>
  <el-menu
          :default-openeds="['1', '3']"
          mode="vertical"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF">
    <div class="menu-wrapper" style="vertical-align: middle;">
      <el-submenu v-for="sub_menu in sub_menus"
                  :index="sub_menu.name"
                  :key="sub_menu.name">
        <template slot="title" :menu_url="sub_menu.url">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ sub_menu.name }}</span>
        </template>

        <template v-for="child_menu in sub_menu.childMenuInfos">
          <router-link :to="child_menu.url" :key="child_menu.name">
            <el-menu-item :index="child_menu.url" @click="changeMenu($event)">
              <span slot="title">{{ child_menu.name }}</span>
            </el-menu-item>
          </router-link>
        </template>

      </el-submenu>
    </div>
  </el-menu>
</template>

<script>

  import request from "@/utils/request"

  export default {
    name: "Sidebar",
    data() {
      return {
        sub_menus: []
      }
    },
    created: function () {
      this.getMenu()
    },
    methods: {
      getMenu: function () {
        let self = this
        request({
          url: "/permission/menuInfo/queryLowerFolderAndFunctionMenu",
          method: "post",
          data: { upperMenuId: "ROOT" }
        }).then(function (response) {
          console.log(response)

          if (response.data.statusCode === 200) {
            let result = response.data
            console.log("getListCallback response result: " + response.data)
            self.sub_menus = result.returnObj
          } else {
            // parseMsg(result.returnObj)
          }
        })
      },
      changeMenu: function () {
        console.log("change menu")
      }
    }
  }
</script>

<style type="text/scss" scoped>

  span {
    padding-right: 90%;
  }
</style>
