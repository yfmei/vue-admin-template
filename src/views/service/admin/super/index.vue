<template>
  <ServiceTemplate
    ref="ServiceTemplate"
    :config="config"
    @search-event="getList"
    @edit-event="getInfoById"
    @submit-event="submit"
    @del-event="del"
    @click-event="clickEvent"/>
</template>

<script>
  import ServiceTemplate from "@/views/service/template"
  import { getList, getInfoById } from "@/api/admin/admin"
  import config from "./config"
  import request from "utils/request"
  import { validateIdCard } from "@/utils/validate"

  export default {
    name: "AreaAdmin",
    components: { ServiceTemplate },
    data() {
      return {
        config: config
      }
    },
    methods: {
      hideSysIds(jobId) {
        // 区域管理员和观察者才有授权系统
        // return jobId !== "81" && jobId !== "83"
        return jobId !== "110002" && jobId !== "110023"
      },
      getList(data, url) {
        getList(data, url, this)
      },
      getInfoById(key, url) {
        getInfoById(key, url, this)
      },
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
        let userPassword = data["userPassword"]
        if (userPassword !== null && userPassword.length > 0 && userPassword.length < 8) {
          self.error("密码最少数字加字母不少于8位")
          return
        }
        let idType = data["idType"]
        let idCode = data["idNumber"]
        if (idType === "10") {
          if (!validateIdCard(idCode)) {
            self.error("请检查证件合法性")
            return
          }
        }
        // 区域管理员和观察者才需要授权系统
        let mask = !self.hideSysIds(data["jobId"])
        if (mask && data["sysIds"].length === 0) {
          self.error("请选择授权系统")
          return
        } else if (mask && data["sysIds"].length > 0) {
          data["sysIds"] = data["sysIds"].join("_")
        }
        data["tarSysId"] = data["sysId"]

        return request({
          data: data,
          url: url,
          method: "post"
        }).then(function (response) {
          console.log("submit response result: " + response)
          // vm.$refs.ServiceTemplate.submit(response)
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
      getInfoCallback(res) {
        let self = this
        let fields = {}
        for (let prop in res) {
          let val = res[prop]
          if (prop === "sysIds") {
            fields["sysIds"] = []
            for (let _i = 0; _i < val.length; _i++) {
              fields["sysIds"].push(val[_i].sysId)
            }
          } else {
            fields[prop] = val
          }
        }
        self.$nextTick(() => {
          self.$refs.ServiceTemplate.getInfoCallback(fields)
          // 修改时移除密码校验
          let form = self.$refs.ServiceTemplate.$refs.DynamicDialog.$refs.DynamicForm.form
          form.rules["userPassword"] = []
          // 是否展示授权系统模块
          self.showSys(self.$refs.ServiceTemplate.form)
        })
      },
      clickEvent(vm) {
        // 事件分发
        let self = this
        self.showSys(vm.form)
      },
      showSys(form) {
        let self = this
        self.$refs.ServiceTemplate.$refs.DynamicDialog.$refs.DynamicForm.throughForm(form, this.showSysCallback)
      },
      showSysCallback(row, col, fields) {
        let jobId = fields["jobId"]
        console.log("show sys")
        // 是否展示授权系统模块
        let mask = col.prop === "sysIds" && this.hideSysIds(jobId)
        row.className = mask ? "hide" : ""
      }
    }
  }
</script>

<style type="text/scss">
    .hide{
        display: none;
    }
</style>
