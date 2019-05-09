<template>
  <div class="container">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" v-model="form.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="form.newPwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="确认新密码" prop="confirmPwd">
            <el-input type="password" v-model="form.confirmPwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import request from "@/util/request"
  import { encryptByDES, getToken } from "@/util/encrypt"

  export default {
    data() {
      let validateOldPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.form.confirmPwd !== "") {
            this.$refs.form.validateField("confirmPwd")
          }
          callback()
        }
      }

      let validateNewPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.form.confirmPwd !== "") {
            this.$refs.form.validateField("confirmPwd")
          }
          callback()
        }
      }
      let validateConfirmPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"))
        } else if (value !== this.form.newPwd) {
          callback(new Error("两次输入密码不一致!"))
        } else {
          callback()
        }
      }
      return {
        form: {
          oldPwd: "",
          newPwd: "",
          confirmPwd: ""
        },
        rules: {
          oldPwd: [
            { validator: validateOldPwd, trigger: "blur" }
          ],
          newPwd: [
            { validator: validateNewPwd, trigger: "blur" }
          ],
          confirmPwd: [
            { validator: validateConfirmPwd, trigger: "blur" }
          ]
        }
      }
    },
    methods: {
      updatePwd(self, keyStr) {
        // 加密
        let oldPwd = encryptByDES(self.form.oldPwd, keyStr)
        let newPwd = encryptByDES(self.form.newPwd, keyStr)
        let confirmPwd = encryptByDES(self.form.confirmPwd, keyStr)

        return request({
          url: "/setting/updatePwd",
          method: "POST",
          data: {
            oldPwd: oldPwd,
            newPwd: newPwd,
            confirmPwd: confirmPwd
          }
        }).then(function (response) {
          console.log("submit response result: " + response)
          let result = response.data
          console.log(response)
          if (result.statusCode === 200) {
            console.log("api login success")
          } else {
            // parseMsg(result.returnObj)
          }
        })
      },
      submitForm() {
        let self = this
        self.$refs.form.validate((valid) => {
          if (valid) {
            getToken(self, self.updatePwd)
          } else {
            console.log("表单校验失败")
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .container{
    padding: 20px 10px 0 10px;
  }
</style>
