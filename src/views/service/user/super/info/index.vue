<template>
  <ServiceTemplate
    ref="ServiceTemplate"
    :config="config"
    @search-event="getList"
    @edit-event="getInfoById"
    @del-event="del"
    @submit-event="submit"/>
</template>

<script>
  import ServiceTemplate from "@/views/service/template"
  import request from "@/utils/request"
  import config from "./config"
  import { validateIdCard } from "@/utils/validate"

  export default {
    name: "User",
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
      del(data, url) {
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
      }
    }
  }
</script>

<style type="text/scss" scoped>

</style>
