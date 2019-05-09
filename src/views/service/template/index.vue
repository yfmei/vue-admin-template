<template>
  <div>
    <FilterForm
            ref="FilterForm"
            :form="filter"
            @click-event="eventDispatch"/>
    <DynamicDialog
            ref="DynamicDialog"
            :dialog-form-visible="dialogFormVisible"
            :form="form"
            @submit-event="submit"
            @cancel-event="cancel"
            @click-event="eventDispatch"/>
    <div v-if="table.title">
      <DynamicTable
              ref="DynamicTable"
              :data="table.data" :title="table.title" :operate="table.operate" :keys="keys" :select="table.select" :height="table.height"
              @click-event="eventDispatch"/>
      <Pagination
                  :page-no="pageNo"
                  :page-count="pageCount"
                  :page-size="pageSize"
                  :total="total"
                  @jump-event="jump"
                  :current-page.sync = "pageNo"
                  @size-change="changeSize"></Pagination>
    </div>
  </div>
</template>

<script>
  import FilterForm from "@/views/service/template/filter/FilterForm"
  import DynamicTable from "@/views/service/template/table/DynamicTable"
  import Pagination from "@/components/common/pagination/Pagination"

  import configGenerator from "@/utils/configGenerator"
  import DynamicDialog from "@/views/service/template/dialog/DynamicDialog"
  import loadBaseData from "@/api/common/basedata/baseData"
  export default {
    name: "ServiceTemplate",
    components: {
      DynamicDialog,
      FilterForm,
      DynamicTable,
      Pagination
    },
    props: {
      config: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      // 只有第一次需要转换, 之后就不需要
      let self = this
      let config = self.config.loaded ? self.config : configGenerator(self.config)
      console.log("data config loaded: " + config.loaded)
      return {
        dialogFormVisible: false,
        pageCount: 1,
        pageNo: 1,
        pageSize: 10,
        total: 10,
        downloadUrl: config.downloadUrl,
        getListUrl: config.getListUrl,
        getInfoUrl: config.getInfoUrl,
        addUrl: config.addUrl,
        editUrl: config.editUrl,
        delUrl: config.delUrl,
        filter: config.filter,
        keys: config.form.keys,
        table: config.table,
        form: config.form
      }
    },
    computed: {
      displayDialog() {
        return !this.dialogFormVisible
      }
    },
    methods: {
      eventDispatch(eventName, data) {
        data = data || {}
        this[eventName](data)
      },
      init() {
        let self = this
        let baseData = self.form.meta
        for (let index in baseData) {
          let item = baseData[index]
          if (item.load === false) {
            if (self.form.type === "add") {
              // 新增不查询 级联数据子数据, 跳过
              continue
            } else {
              // 修改查询 级联数据子数据
            }
          }

          loadBaseData(item.name, self) // 加载基础数据
        }
      },
      cancel() {
        let self = this
        console.log("取消--------->")
        self.dialogFormVisible = self.displayDialog
      },
      download(data) {
        console.log("下载--------->data " + data)
        let self = this
        data.url = self.downloadUrl
        self.clickEvent("download", data)
      },
      resetPin(data) {
        console.log("重置pin--------->data " + data)
        let self = this
        self.clickEvent("reset", data)
      },
      certCancel(data) {
        console.log("注销正常--------->data " + data)
        let self = this
        self.clickEvent("cert-cancel", data)
      },
      batchReset() {
        this.clickEvent("batch-reset", this.$refs.FilterForm.search)
      },
      showDialog(data) {
        let self = this
        let type = data.type
        self.dialogFormVisible = self.displayDialog
        self.form.type = type

        if (type === "add") {
          console.log("新增---------add>" + this.dialogFormVisible)
          // 清空表单
          this.$nextTick(() => {
            self.$refs.DynamicDialog.$refs.DynamicForm.resetFields()
          })
          self.init() // 请求基本数据
        } else {
          console.log("编辑--------->data " + data)
          data.url = self.getInfoUrl
          self.clickEvent("getInfoById", data)
        // getInfoCallback 后再执行 self.init()
        }
      },
      del(data) {
        console.log("删除--------->data: " + data)
        let self = this
        data.url = self.delUrl
        self.clickEvent("del", data)
      },
      check(data) {
        console.log("选中表格--------->data " + data)
        let self = this
        self.clickEvent("check", data)
      },
      approval() {
        this.clickEvent("approval", this.$refs.FilterForm.search)
      },
      exportInfo(data) {
        this.clickEvent("export", data)
      },
      search(data) {
        let self = this
        if (data === undefined) {
          data = {}
        }
        // 添加翻页信息
        data.pageNo = self.pageNo
        data.pageSize = self.pageSize
        data.url = self.getListUrl
        this.clickEvent("getList", data)
      },
      submit(data) {
        console.log("提交--------->data: ")
        console.log(data)
        let self = this
        let url = ""
        if (self.form.type === "add") {
          url = self.addUrl
          self.dialogFormVisible = self.displayDialog
        } else if (self.form.type === "edit") {
          url = self.editUrl
          self.dialogFormVisible = self.displayDialog
        } else if (self.form.type === "filter") {
          url = self.addUrl
        }
        let _data = self.createData(data.fields)
        _data.url = url
        self.clickEvent("submit", _data)
      },
      getListCallback(response, callback) {
        // callback 是自定义方法, 用来处理列表数据的
        console.log("template getListCallback response response: " + response)
        let self = this
        let returnObj = response.data.returnObj
        // 是否需要处理列表数据
        if (callback !== undefined) {
          self.table.data = callback(returnObj.result)
        } else {
          self.table.data = returnObj.result
        }

        self.pageNo = returnObj.pageNo
        self.pageSize = returnObj.pageSize
        self.prePage = returnObj.prePage
        self.nextPage = returnObj.nextPage
        self.pageCount = returnObj.totalPages
        self.total = returnObj.totalCount
        self.hasPre = returnObj.hasPre
        self.hasNext = returnObj.hasNext
      },
      getInfoCallback(res) {
        console.log("getInfoCallback response result: " + res)
        let self = this
        for (let item in res) {
          if (res.hasOwnProperty(item)) {
            // 覆盖数据
            self.form.fields[item] = res[item]
          }
        }
        // 初始化基础数据
        self.init()
      },
      jump(pageNo) {
        let self = this
        self.pageNo = pageNo || 1
        let data = self.$refs.FilterForm.formatParams()
        data.pageNo = self.pageNo
        data.pageSize = self.pageSize
        data.url = self.getListUrl

        self.clickEvent("search", data)
      },
      grant(roleId) {

      },
      changeSize(size) {
        this.pageSize = size
        this.$refs.FilterForm.search()
      },
      clickEvent(eventName, data) {
        let params = {
          data: data,
          url: data.url,
          method: "post"
        }
        delete data.url
        this.$emit("click-event", eventName, params)
      },
      createData(data) {
        // 防止修改 fields, 重新构造data项
        let _data = {}
        for (let item in data) {
          _data[item] = data[item]
        }
        return _data
      }
    }
  }
</script>

<style type="text/scss" scoped>

</style>
