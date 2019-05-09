<template>
  <div class="block page-info">
    <el-pagination
      background
      :current-page="pageNo"
      :page-count="pageCount"
      :page-sizes="pageSizeList"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper, ->, slot"
      @size-change="handleSizeChange"
      @current-change="jump"
      @pre-click="jump"
      @next-click="jump">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      pageSizeList: {
        type: Array,
        default: () => {
          return [10, 30, 50, 100, 1000]
        }
      },
      pageSize: {
        type: Number,
        default: 10
      },

      total: {
        type: Number,
        default: 10
      },

      pageCount: {
        type: Number,
        default: 1
      },

      pageNo: {
        type: Number,
        default: 1
      }

    },
    data() {
      return {
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.$emit("size-change", val)
      },
      jump(val) {
        console.log(`当前页: ${val}`)
        this.$emit("jump-event", val)
      }
    }
  }
</script>

<style type="text/scss" scoped>
  .page-info{
    margin-top: 20px;
    text-align: center;
  }

</style>
