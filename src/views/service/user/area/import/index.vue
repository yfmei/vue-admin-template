<template>
  <el-form :inline="true" class="form">
    <el-form-item>
      <el-select v-model="fields.sysId" placeholder="请选择系统" value="" @change="relationData('product')">
        <template >
          <el-option
            v-for="(item, index) in baseData['systemList']"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </template>
      </el-select>
    </el-form-item>

    <el-form-item>
      <a href="javascript:void(0)" class="el-button el-button--primary" @click="downloadSample">样例下载</a>
      <input id="upfile" class="hide" type="file" @change="handleFile($event)"/>
      <label for="upfile" class="el-button el-button--primary">选择文件</label>
      <el-button type="success" @click="upload">上传到服务器</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import request from "@/utils/fileUpload"
  import loadBaseData from "@/api/common/basedata/baseData"
  export default {
    name: "OrderImport",
    data() {
      return {
        fields: {
          sysId: "",
          productId: ""
        },
        baseData: {
          systemList: [],
          productList: []
        },
        uploadUrl: "/userBase/area/batch/addUser",
        file: ""
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        loadBaseData("system", this) // 加载基础数据
      },
      relationData: function (dataName) {
        // 级联数据查询
        let self = this
        console.log(dataName)
        self.fields["productId"] = ""
        loadBaseData(dataName, self) // 加载基础数据
      },
      handleFile(event) {
        // 获取当前选中的文件
        this.file = event.target.files[0]
      },
      downloadSample() {
        window.location.href = this.GLOBAL.BASE_URL + "util/getDocumentInfo?fileId=2ea5f33a50b56e268de40e6338363197"
      },
      upload() {
        let self = this
        let formData = new FormData()
        formData.append("upfile", self.file)
        formData.append("tarSysId", self.fields.sysId)
        console.log("formData=" + formData)

        if (self.checkData()) {
          request({
            data: formData,
            url: self.uploadUrl,
            method: "post"
          }).then(function (response) {
            console.log("upload response result: " + response)
            let result = response.data
            let type = "error"
            if (result.statusCode === 200) {
              type = "success"
            }
            self.$message({ type: type, message: result.returnObj })
          })
        }
      },
      checkData() {
        let self = this
        let file = document.getElementById("upfile").value
        // JS校验form表单信息
        let suffix = file.substr(file.lastIndexOf("."))

        if (self.sysId === "") {
          alert("请选择系统名称！")
          return false
        }
        if (self.productId === "") {
          alert("请选择产品类型！")
          return false
        }

        if (suffix !== ".xls" && suffix !== ".xlsx") {
          alert("选择Excel格式的文件导入！")
          return false
        }
        return true
      }
    }
  }
</script>

<style type="text/scss" scoped>
  .form {
    padding: 10% 0;
  }
  .hide{
    display: none
  }
  a {
      margin-right: 10px;
  }
</style>
