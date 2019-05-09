<template>
  <div>
    <div :class="formClass">
      <DynamicForm ref="DynamicForm" :form="form"/>
    </div>
    <div :class="btnClass">
      <el-button v-if="isShow('search')" type="primary" icon="el-icon-search" @click="search">查询</el-button>
      <el-button v-if="isShow('close')" type="primary" icon="el-icon-close" @click="reset">清空</el-button>
      <el-button v-if="isShow('reset')" type="primary" icon="el-icon-close" @click="batchResetUkey">重置</el-button>
      <el-button v-if="isShow('edit')" type="primary" icon="el-icon-edit" @click="add">新增</el-button>
      <el-button v-if="isShow('approval')" type="primary" icon="el-icon-edit" @click="approval">审批</el-button>
      <el-button v-if="isShow('export')" type="primary" @click="exportInfo">导出</el-button>
      <el-button v-if="isShow('submit')" type="primary" @click="submit()">确 定</el-button>
    </div>
  </div>

</template>

<script>
  import loadBaseData from "@/api/common/basedata/baseData"
  import DynamicForm from "@/views/service/template/form/DynamicForm.vue"
  import { EventBus } from "@/event/event"

  export default {
    name: "FilterForm",
    components: {
      DynamicForm
    },
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        "containerClass": "",
        "formClass": "",
        "btnClass": ""
      }
    },
    created: function () {
      let self = this
      self.clickEvent("search", {})
      self.form.type = "filter"
      self.init()
    },
    methods: {
      setClass() {
        if (this.form.orientation === "level") {
          this.formClass = "filter-form"
          this.btnClass = "filter-btn"
        } else {
          this.formClass = "form-form"
          this.btnClass = "form-btn"
        }
      },
      init() {
        let self = this
        self.resetFields() // 清空表单
        self.setClass()
        let baseData = self.form.meta
        for (let index in baseData) {
          let item = baseData[index]

          if (item.load === "false") {
            if (self.form.type === "add") {
              // 新增不查询 级联数据子数据, 跳过
              continue
            } else {
              // 修改查询 级联数据子数据
            }
          }
          loadBaseData(baseData[index].name, self) // 加载基础数据
        }
      },
      isShow(type) {
        return !(this.form.operate.indexOf(type) < 0)
      },
      relationData(relationData) {
        if (relationData.child === undefined) return
        // 级联数据查询
        let self = this
        console.log(relationData.child.name)
        // 上级数据变更需要清空级联数据项
        self.form.fields[relationData.child.field] = ""

        loadBaseData(relationData.child.name, self) // 加载基础数据
      },
      add: function () {
        let data = { type: "add" }
        this.clickEvent("showDialog", data)
      },
      approval: function () {
        console.log("审批")
        this.clickEvent("approval")
      },
      exportInfo: function () {
        console.log("导出")
        this.clickEvent("export", this.form.fields)
      },
      reset: function () {
        console.log("重置")
        this.resetFields()
        this.search()
      },
      batchResetUkey: function () {
        console.log("重置蓝牙卡")
        this.$emit("batch-reset-event")
      },
      resetFields: function () {
        let self = this
        let form = self.form
        Object.keys(form.defaultFields).forEach(function (prop) {
          form.fields[prop] = form.defaultFields[prop]
        })
      },
      search() {
        console.log("search!")

        this.clickEvent("search", this.formatParams())
      },
      formatParams() {
        let fields = this.form.fields
        // 防止修改 fields, 重新构造data项
        let data = {}
        for (let field in fields) {
          data[field] = fields[field]
        }
        return data
      },
      submit: function () {
        console.log("submit")
        let self = this

        self.$refs.DynamicForm.$refs.fields.validate((valid) => {
          if (valid) {
            // self.$message({
            //   type: "info",
            //   message: "提交成功"
            // })
            self.clickEvent("submit", self.form)
          } else {
            self.$message({
              type: "info",
              message: "校验不通过, 请检查"
            })
            return false
          }
        })
      },
      clickEvent(eventName, data) {
        this.$emit("click-event", eventName, data)
      }
    }
  }
</script>

<style type="text/scss" scoped>
  .filter-form{
      float: left;
      width:70%;
      padding: 20px 10px 20px 10px;
  }
  .filter-btn{
      float: right;
      width:30%;
      padding: 20px 10px 20px 10px;
  }
  .form-form{
      padding: 20px 10px 10px 10px;
  }
  .form-btn{
      padding: 0 10px 20px 10px;
      text-align: center;
  }

  label { font-size: 80%; }
</style>
