<template>
  <el-table :data="data" border style="width: 100%;" @selection-change="handleSelectionChange" >
    <el-table-column type="selection" width="55" v-if="select">
    </el-table-column>
    <el-table-column v-for="{prop, label, width} in title" :key="prop" :prop="prop" :label="label"  align="center" :width="width">
    </el-table-column>
    <el-table-column v-if="operate.button.length !== 0" align="center" label="操作" :width="operate.width">
        <template slot-scope="scope">
            <!-- 动态展示按钮-->
            <el-button v-if="isShow('edit')" type="primary" icon="el-icon-edit" size="small" @click="edit(scope.$index)" title="编辑"></el-button>
            <el-button v-if="isShow('del')" type="danger" icon="el-icon-delete" size="small" @click="confirm(scope.$index)" title="删除"></el-button>

            <el-button v-show="isDownload('download', scope.$index)" type="primary" icon="el-icon-download" size="small" @click="download(scope.$index)" title="下载"></el-button>
            <el-button v-if="isShow('view')" type="primary" icon="el-icon-view" size="small" @click="edit(scope.$index)" title="查看"></el-button>
            <el-button v-if="isReset('reset', scope.$index)" type="danger" class="iconfont icon-refresh" size="small" @click="reset(scope.$index)" title="重置"></el-button>
            <el-button v-if="isShow('certCancel')" type="danger" class="icon iconfont icon-icon_logout" size="small" @click="certCancel(scope.$index)" title="注销"></el-button>
            <el-button v-if="isShow('grant')" type="primary" size="small" @click="grant(scope.$index)" title="菜单配置">菜单配置</el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { EventBus } from "@/event/event"
  export default {
    name: "DynamicTable",
    props: {
      title: {
        type: Array,
        default: () => {
          return []
        }
      },
      operate: {
        type: Object,
        default: () => {
          return {
            button: [],
            width: ""
          }
        }
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      keys: {
        type: Array,
        default: () => {
          return []
        }
      },
      select: {
        type: Boolean,
        default: false
      },
      height: {
        type: Number,
        default: 0
      }
    },
    methods: {
      handleSelectionChange(data) {
        console.log("===== handleSelectionChange ====")
        this.clickEvent("check", data)
      },
      isShow(type) {
        return !(this.operate.button.indexOf(type) < 0)
      },
      getKeys: function (index) {
        // 获取主键
        let self = this
        let keys = self.keys
        let row = self.data[index]
        let data = {}
        Object.keys(keys).forEach(function (index) {
          let key = keys[index]
          data[key] = row[key]
        })
        return data
      },
      isDownload: function (type, index) {
        let self = this
        let row = self.data[index]
        return this.operate.button.indexOf(type) > -1 && row.total !== row.successTotal
      },
      isReset: function (type, index) {
        let self = this
        let row = self.data[index]
        // nfc 才能重置证书, 30 nfc 31 蓝牙卡
        return this.operate.button.indexOf(type) > -1 && row.cardType === "30"
      },
      download: function (index) {
        let self = this
        self.clickEvent("download", self.getKeys(index))
      },
      reset: function (index) {
        let self = this
        self.clickEvent("reset", self.data[index])
      },
      certCancel: function (index) {
        let self = this
        self.$emit("cert-cancel-event", self.data[index])
      },
      grant: function (index) {
        let self = this
        this.$router.push({ name: "GrantMenu", params: self.getKeys(index) })
      },
      edit: function (index) {
        let self = this
        let data = self.getKeys(index)
        data.type = "edit"
        self.clickEvent("showDialog", self.getKeys(index))
      },
      del: function (index) {
        let self = this
        self.clickEvent("del", self.getKeys(index))
        self.data.splice(index, 1)
      },
      clickEvent(eventName, data) {
        this.$emit("click-event", eventName, data)
      },
      confirm(index) {
        let self = this
        self.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          self.del(index)
        }).catch(() => {
          self.$message({
            type: "info",
            message: "已取消" + "删除"
          })
        })
      }
    }
  }
</script>

<style type="text/scss" scoped>
  .iconfont{
    font-size: 12px;
  }
</style>
