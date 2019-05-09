<template>

  <div class="login-container">
    <div class="login-inner">
      <div class="login-title text-center">
        <Logo></Logo>
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="pt-4" status-icon>

        <el-row :gutter="10" type="flex">
          <el-col :span="22" :offset="1">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.userName" type="text" auto-complete="on" prefix-icon="iconfont icon-people" placeholder="用户名" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" type="flex">
          <el-col :span="22" :offset="1">
            <el-form-item prop="userPassword">
              <el-input v-model="loginForm.userPassword" type="password" auto-complete="on" prefix-icon="iconfont icon-lock" placeholder="密码" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" type="flex">
          <el-col :span="15" :offset="1">
            <el-form-item prop="captcha">
              <el-input v-model="loginForm.captcha" type="text" auto-complete="on" prefix-icon="iconfont icon-pic" placeholder="验证码" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <img :src="captcha" class="captcha" alt="验证码" @click="changeImage($event)">
          </el-col>
        </el-row>

        <el-row type="flex" align="center" justify="center">
          <el-col :span="22">
            <el-form-item>
              <el-button class="btn-login" @click="handleLogin()">登&nbsp;&nbsp;录
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>

  </div>

</template>

<script type="text/javascript">
  import { loginPass, captcha } from "@/api/login"
  import Logo from "@/views/layout/components/Logo"

  export default {
    name: "Login",
    components: {
      Logo
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error("请输入正确的用户名"))
        } else {
          callback()
        }
      }

      const validatePassword = (rule, value, callback) => {
        if (value.length < 8) {
          callback(new Error("密码不能少于8位"))
        } else {
          callback()
        }
      }
      const validateCaptcha = (rule, value, callback) => {
        if (value.length < 4) {
          callback(new Error("请填写验证码"))
        } else {
          callback()
        }
      }

      return {
        captcha: captcha(this),
        loginForm: {
          userName: "",
          userPassword: "",
          captcha: ""
        },
        loginRules: {
          userName: [{ required: true, trigger: "blur", validator: validateUsername }],
          userPassword: [{ required: true, trigger: "blur", validator: validatePassword }],
          captcha: [{ required: true, trigger: "blur", validator: validateCaptcha }]
        },
        passwordType: "password",
        loading: false,
        showDialog: false
      }
    },
    methods: {
      handleLogin() {
        let self = this
        self.$refs.loginForm.validate(valid => {
          if (valid) {
            self.loading = true
            loginPass(self).then(() => {
              self.loading = false
            }).catch(() => {
              console.log("登录异常")
              this.loading = false
            })
          } else {
            console.log("登录失败")
            return false
          }
        })
      },
      changeImage(event) {
        event.src = captcha(this, new Date().getTime())
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  /*@import "~@assets/loginbg.png";*/

  .login-container {
    /*display: -ms-flexbox;*/
    /*display: -webkit-box;*/
    /*display: flex;*/
    /*-ms-flex-align: center;*/
    /*-ms-flex-pack: center;*/
    /*-webkit-box-align: center;*/
    /*align-items: center;*/
    /*-webkit-box-pack: center;*/
    /*justify-content: center;*/

    display: -webkit-box;
    align-items: center;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-image: url(../../assets/loginbg.png);
  }

  .login-title {
    background: #123877;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 10px 0;
  }

  form {
    background: #fff;
    padding-top: 20px;
  }

  .login-inner input {
    -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, .075);
    box-shadow: inset 0 0 0 rgba(0, 0, 0, .075);
  }

  .login-inner {
    margin: 0 auto;
    width: 350px;
  }

  .login-inner .form-group {
    margin: 0 0 10px 0;
  }

  .login-inner .form-control {
    border: none;
    font-size: 14px;
    height: 40px;
  }

  .btn-login {
    background-color: #132877;
    color: #fff;
    width: 100%;
    font-size: 20px;
  }

  button:hover{
      background-color: #132877!important;
      color: #fff!important;
  }

  .input-icon {
    position: absolute;
    display: block;
    top: 2px;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    z-index: 2;
  }

  input {
    padding-left: 35px !important;
    border-bottom: 1px solid #e2e2e2 !important;
  }

  .captcha {
    width: 98px;
    height: 40px;
  }

  .el-form-item {
    margin-bottom: 20px !important;
  }
</style>
