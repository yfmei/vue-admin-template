<template>
    <el-row class="menu-form">
        <el-col :span="6">
            <el-tree :data="treeData"
                     :props="defaultProps"
                     node-key="funcId"
                     ref="tree"
                     @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="8">
            <el-form label-width="80px" ref="menuForm" :model="menuInfo" :rules="menuRules" >
                <el-form-item prop="menuName" label="菜单名称">
                    <el-input v-model="menuInfo.menuName" type="text" auto-complete="on" placeholder="菜单名称" />
                </el-form-item>
                <el-form-item prop="menuUrl" label="菜单URL">
                    <el-input v-model="menuInfo.menuUrl" type="text" auto-complete="on" placeholder="菜单URL" />
                </el-form-item>
                <el-form-item prop="remark" label="备注信息">
                    <el-input v-model="menuInfo.remark" type="text" auto-complete="on" placeholder="备注信息" />
                </el-form-item>
                <div v-if="isAdd">
                    <el-form-item prop="parentId" label="上级菜单">
                        <el-input v-model="menuInfo.parentName" type="text" auto-complete="on" placeholder="上级菜单" disabled="disabled"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">保存</el-button>
                        <el-button type="primary" @click="changeType">返回</el-button>
                    </el-form-item>
                </div>
                <div v-else>
                    <el-form-item>
                        <el-button type="primary" @click="changeType">新增</el-button>
                        <el-button type="primary" @click="update">修改</el-button>
                        <el-button type="primary" @click="del">删除</el-button>
                        <el-button type="primary" icon="el-icon-close" @click="reset">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
    </el-row>

</template>

<script>
  // demo data
  import request from "@/utils/request"
  import Menu from "@/components/common/Menu"
  import tree from "@/utils/tree"
  import { Message, MessageBox } from "element-ui"
  export default {
    name: "GrantMenu",
    components: {Menu},
    data() {
      const validateMenuName = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error("请输入菜单名称"))
        } else {
          callback()
        }
      }

      const validateMenuUrl = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error("请输入菜单地址"))
        } else {
          callback()
        }
      }
      // const validateRemark = (rule, value, callback) => {
      //   if (value.length === 0) {
      //     callback(new Error("请输入备注信息"))
      //   } else {
      //     callback()
      //   }
      // }

      return {
        isAdd: false,
        defaultProps: {
          children: "children",
          label: "funcName"
        },
        jobId: this.$route.params.jobId,
        treeData: [],
        menuInfo: {
          menuName: "",
          menuUrl: "",
          remark: ""
        },
        menuRules: {
          menuName: [{ required: true, trigger: "blur", validator: validateMenuName }],
          menuUrl: [{ required: true, trigger: "blur", validator: validateMenuUrl }]
          // remark: [{ required: true, trigger: "blur", validator: validateRemark }]
        },
        setting: {
          data: {
            simpleData: { // 不需要用户转换数据，指定键值就可以
              enable: true,
              idKey: "funcId", // 当前元素id名
              name: "funcName", // 当前元素名称
              pIdKey: "parentId", // 父元素id名
              rootPId: "0" // 当前根节点
            },
            key: {
              children: "children",
              checked: "checked",
              isParent: "isParent",
              isHidden: "isHidden",
              name: "funcName"
            }
          }
        }
      }
    },
    created() {
      this.init()
    },
    methods: {

      handleNodeClick(data) {
        console.log(data)
        let self = this
        this.isAdd = false
        let menuInfo = self.menuInfo
        menuInfo.menuName = data.funcName
        menuInfo.menuUrl = data.menuUrl
        menuInfo.remark = data.remark
        menuInfo.menuType = data.menuType
        menuInfo.menuId = data.funcId
        menuInfo.parentId = data.parentId
      },
      init() {
        let self = this
        request({
          url: "/permission/aiMenu/queryAiMenuList",
          method: "post"
        }).then(function (response) {
          console.log("init response result: " + response)
          let result = response.data
          console.log("getListCallback response result: " + response.data)
          self.treeData = tree.transformToTree(self.setting, result.returnObj)
        })
      },
      changeType() {
        this.isAdd = !this.isAdd
        if (this.isAdd) {
          let self = this
          let menuInfo = self.menuInfo
          menuInfo.parentName = menuInfo.menuName // 保留父菜单
          menuInfo.parentId = menuInfo.menuId // 保留父菜单
          // 初始化表单
          menuInfo.menuName = ""
          menuInfo.menuUrl = ""
          menuInfo.remark = ""
        }
      },
      submit() {
        let self = this
        self.$refs.menuForm.validate(valid => {
          if (valid) {
            console.log("新增")
            request({
              data: {
                parentId: self.menuInfo.parentId,
                menuUrl: self.menuInfo.menuUrl,
                funcName: self.menuInfo.menuName,
                remark: self.menuInfo.remark
              },
              url: "/permission/aiMenu/insertAiMenu",
              method: "post"
            }).then(function (response) {
              Message({
                message: response.data.returnObj,
                type: "success",
                duration: 3 * 1000
              })
              console.log("getListCallback response result: " + response)
            })
          } else {
            console.log("新增失败")
            return false
          }
        })
      },
      update() {
        let self = this
        request({
          data: {
            funcId: self.menuInfo.menuId,
            menuUrl: self.menuInfo.menuUrl,
            funcName: self.menuInfo.menuName,
            remark: self.menuInfo.remark
          },
          url: "/permission/aiMenu/updateAiMenu",
          method: "post"
        }).then(function (response) {
          Message({
            message: response.data.returnObj,
            type: "success",
            duration: 3 * 1000
          })
          console.log("getListCallback response result: " + response)
        })
      },
      del() {
        let self = this
        request({
          data: {
            funcId: self.menuInfo.menuId
          },
          url: "/permission/aiMenu/deleteAiMenu",
          method: "post"
        }).then(function (response) {
          Message({
            message: response.data.returnObj,
            type: "success",
            duration: 3 * 1000
          })
          console.log("getListCallback response result: " + response)
        })
      },
      reset() {
        let self = this
        let menuInfo = self.menuInfo
        menuInfo.parentName = menuInfo.menuName // 保留父菜单
        menuInfo.parentId = menuInfo.menuId // 保留父菜单
        // 初始化表单
        menuInfo.menuName = ""
        menuInfo.menuUrl = ""
        menuInfo.remark = ""
      }
    }
  }
</script>

<style type="text/scss" scoped>

  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: none;
  }

  .menu-form{
      margin-top: 20px;
  }
</style>
