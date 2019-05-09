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
    name: "System",
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
        let idCode = data["idNumber"]
        if (idType === "10") {
          if (!validateIdCard(idCode)) {
            self.error("请检查证件合法性")
            return
          }
        }
        data["tarSysId"] = data["sysId"]
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
        key["tarSysId"] = key["sysId"]
        let self = this
        request({
          data: key,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("getInfoCallback response result: " + response)
          let res = response.data.returnObj
          console.log(res)
          self.getInfoCallback(res)
        })
      },
      getInfoCallback(res) {
        let self = this
        let fields = {}
        for (let prop in res) {
          let val = res[prop]

          if (prop === "productRelationInfo") {
            fields["productIds"] = []
            for (let _i = 0; _i < val.length; _i++) {
              fields["productIds"].push(val[_i].productId)
            }
          } else {
            fields[prop] = val
          }
        }
        self.$refs.ServiceTemplate.getInfoCallback(fields)
      },
      checkAllProducts: function () {
        let self = this
        if (self.selectAllProducts) {
          let productList = self.baseData.productList
          let _arr = []
          for (let _i = 0; _i < productList.length; _i++) {
            _arr.push(productList[_i].productId)
          }
          self.productIds = _arr
        } else {
          self.productIds = []
        }
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
