<template>
    <el-row>
        <el-col :span="6">
            <el-tree :data="treeData"
                 :props="defaultProps"
                 show-checkbox
                 node-key="funcId"
                 ref="tree"
                 :default-expand-all="isExpand"
                 @node-click="handleNodeClick"
                 @check-change="handleCheckChange"
                 ></el-tree>
        </el-col>
        <el-col :span="8">
            <el-form label-width="50px" class="btn-group">
                <el-form-item>
                    <el-button type="primary" @click="collapse">全部收起</el-button>
                    <el-button type="primary" @click="expand">全部展开</el-button>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button type="primary" @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

</template>

<script>
  // demo data
  import request from "@/utils/request"
  import Menu from "@/components/common/Menu"
  import tree from "@/utils/tree"

  export default {
    name: "GrantMenu",
    components: { Menu },
    data() {
      return {
        defaultProps: {
          children: "children",
          label: "funcName"
        },
        jobId: this.$route.params.jobId,
        treeData: [],
        selectMenus: "",
        isExpand: true,
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
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys())
        return this.$refs.tree.getCheckedKeys()
      },
      setCheckedKeys(defaultSelectMenus) {
        this.$refs.tree.setCheckedKeys(defaultSelectMenus, true)
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate)
      },
      handleNodeClick(data, node, tree) {
        console.log(data, node, tree)
        // 修复点击展开\收起按钮，更改expanded之后，点击item无法展开的问题
        tree.expanded = !tree.expanded
      },
      init() {
        let self = this
        request({
          data: { "jobId": self.jobId },
          url: "/permission/aiJobFunc/queryByJob",
          method: "post"
        }).then(function (response) {
          console.log("init response result: " + response)
          let result = response.data
          let defaultSelectMenu = []
          console.log("getListCallback response result: " + response.data)
          self.treeData = tree.transformToTree(self.setting, result.returnObj)
          for (let i = 0; i < result.returnObj.length; i++) {
            let menu = result.returnObj[i]
            if (menu.isAssign) {
              if (menu.children !== undefined && menu.children.length > 0) {
                // 父节点如果被选中，则所有的子节点都将被选中，所以这里判断如果有子节点就跳过
                continue
              }
              defaultSelectMenu.push(menu.funcId)
            }
          }

          self.setCheckedKeys(defaultSelectMenu)
        })
      },
      submit() {
        let self = this
        let selectMenus = self.getCheckedKeys()
        let menus = selectMenus.join(",")
        request({
          data: { "funcIds": menus, "jobId": self.jobId },
          url: "/permission/aiJobFunc/saveAiFuncs",
          method: "post"
        }).then(function (response) {
          console.log("init response result: " + response)
        })
      },
      back() {
        this.$router.go(-1)
      },
      collapse() {
        const tree = this.$refs.tree
        tree.$children.forEach(item => {
          item.expanded = false
        })
        this.isExpand = false
      },
      expand() {
        const tree = this.$refs.tree
        tree.$children.forEach(item => {
          item.expanded = true
        })
        this.isExpand = true
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

  .btn-group{
      position:fixed;
      bottom:0;
  }
</style>
