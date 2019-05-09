<template>
  <ServiceTemplate
    ref="ServiceTemplate"
    :config="config"
    @search-event="getList"
    @edit-event="getInfoById"
    @submit-event="submit"
    @del-event="del"
    @export-event="exportInfo"/>
</template>

<script>
  import ServiceTemplate from "@/views/service/template"
  import request from "@/utils/request"
  import config from "./config"
  import { validateIdCard } from "@/utils/validate"

  export default {
    name: "AreaUser",
    components: { ServiceTemplate },
    data() {
      return {
        config: config
      }
    },
    methods: {
      error(msg) {
        let self = this
        self.Message({
          message: msg,
          type: "error",
          duration: 3 * 1000
        })
        let ref = self.$refs.ServiceTemplate
        ref.dialogFormVisible = ref.displayDialog
      },
      submit(data, url) {
        let self = this
        let idType = data["idType"]
        let idCode = data["idCode"]
        if (idType === "10") {
          if (!validateIdCard(idCode)) {
            self.error("请检查证件合法性")
            return
          }
        }
        request({
          data: data,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("submit response result: " + response)
          // self.$refs.ServiceTemplate.submit(response)
        })
      },
      getList(data, url) {
        let self = this
        data["tarSysId"] = data["sysId"]
        request({
          data: data,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("getListCallback response result: " + response)
          self.$refs.ServiceTemplate.getListCallback(response)
        })
      },
      getInfoById(key, url) {
        let self = this
        request({
          data: key,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("getInfoCallback response result: " + response)
          let res = response.data.returnObj
          self.getInfoCallback(res)
        })
      },
      getInfoCallback(res) {
        let self = this
        self.$refs.ServiceTemplate.getInfoCallback(res)
      },
      exportInfo(data) {
        // 导出
        let url = "userBase/area/exportExcel"
        console.log("======== " + data.userName)

        let userName = data.userName
        let phoneNumber = data.phoneNumber
        let statusId = data.statusId
        let sysId = data.sysId
        let param = ""

        if (userName !== undefined) {
          param += "userName=" + userName + "&"
        }
        if (phoneNumber !== undefined) {
          param += "phoneNumber=" + phoneNumber + "&"
        }
        if (statusId !== undefined) {
          param += "statusId=" + statusId + "&"
        }
        if (sysId !== undefined) {
          param += "tarSysId=" + sysId + "&"
        }

        window.location.href = this.GLOBAL.BASE_URL + url + "?" + param
      },
      del(data, url) {
        request({
          data: data,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("submit response result: " + response)
          // self.$refs.ServiceTemplate.submit(response)
        })
      }
    }
  }
</script>

<style type="text/scss" scoped>

</style>
