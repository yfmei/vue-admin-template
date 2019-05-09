<template>
  <ServiceTemplate
    ref="ServiceTemplate"
    :config="config"
    @search-event="getList"
    @edit-event="getInfoById"/>
</template>

<script>
  import ServiceTemplate from "@/views/service/template"
  import request from "@/utils/request"
  import config from "./config"

  export default {
    name: "Log",
    components: { ServiceTemplate },
    data() {
      return {
        config: config
      }
    },
    methods: {
      getList(data, url) {
        let self = this
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
