<template>
  <ServiceTemplate
    ref="ServiceTemplate"
    :config="config"
    @search-event="getList"
    @edit-event="getInfoById"
    @approval-event="approval"
    @submit-event="submit"
    @check-event="handleSelectionChange"
  />
</template>

<script>
  import ServiceTemplate from "@/views/service/template"
  import request from "@/utils/request"
  import config from "./config"

  export default {
    name: "AreaUserApproval",
    components: { ServiceTemplate },
    data() {
      return {
        config: config,
        userIds: []
      }
    },
    methods: {
      submit(data, url) {
        let self = this
        request({
          data: data,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("submit response result: " + response)
          // self.$refs.ServiceTemplate.submit(response)
        })
      },
      handleSelectionChange(data) {
        let self = this
        let userIds = []
        for (let i = 0; i < data.length; i++) {
          let model = data[i]
          userIds.push(model.userId)
        }
        self.userIds = userIds
        console.log("=====handleSelectionChange====" + userIds)
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
      approval: function (callback) {
        // 审批
        let self = this
        if (self.userIds === "" || self.userIds.length === 0) {
          self.Message({
            message: "请选择用户进行审批",
            type: "error",
            duration: 3 * 1000
          })
          return
        }
        let url = "/userBase/area/batch/updateUserStutus"
        let data = {
          "userIds": self.userIds.join("_")
        }

        request({
          data: data,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("getInfoCallback response result: " + response)
          let res = response.data
          let type = "error"
          if (res.statusCode === 200) {
            callback()
            type = "success"
          }
          self.$message({ type: type, message: res.returnObj })
        })
      }
    }
  }
</script>

<style type="text/scss" scoped>

</style>
