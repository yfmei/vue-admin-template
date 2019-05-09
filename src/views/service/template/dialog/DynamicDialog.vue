<template>
  <div style="border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s; margin-bottom: 10px;">
    <el-dialog :title="form.header" :visible.sync="dialogFormVisible" :before-close="cancel" :modal-append-to-body="false">
      <DynamicForm ref="DynamicForm" :form="form" @click-event="eventDispatch"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button v-if="isShow('submit')" type="primary" @click="submit()">确 定</el-button>
      </div>

    </el-dialog>
  </div>

</template>

<script>

  import DynamicForm from "@/views/service/template/form/DynamicForm.vue"
  import { EventBus } from "@/event/event"

  console.log("==== dynamic ======")
  export default {
    name: "DynamicDialog",
    components: {
      DynamicForm
    },
    props: {
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      isShow(type) {
        if (!this.form.operate) return // 证书模块不能修改，所以没有form对象
        return !(this.form.operate.indexOf(type) < 0)
      },
      eventDispatch(eventName, data) {
        // 控件对应的点击事件
        // this.$emit("click-event", eventName + "event", data)
        this.clickEvent(eventName, this)
      },
      cancel: function () {
        let self = this

        self.$refs.DynamicForm.resetFields()
        console.log("cancel")
        self.clickEvent("cancel")
      },
      submit: function () {
        console.log("submit")
        let self = this
        self.$refs.DynamicForm.$refs.fields.validate((valid) => {
          if (valid) {
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

</style>
