<template>
  <div>
    <div>
      <h1>单选框</h1>
      <el-radio v-model="radio" :label="1">备选项</el-radio>
      <el-radio v-model="radio" :label="2">备选项</el-radio>
    </div>

    <div>
      <h1>禁用</h1>
      <el-radio v-model="radio1" :label="1" disabled >备选项</el-radio>
      <el-radio v-model="radio1" :label="2" disabled>备选项</el-radio>
    </div>

    <div>
      <h1>单选框组, 适用于在多个互斥的选项中选择的场景</h1>
      <el-radio-group v-model="radio2">
        <el-radio :label="3">备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
    </div>

    <div>
      <h1>按钮样式</h1>
      <div>
        <el-radio-group v-model="radio3">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio4" size="medium">
          <el-radio-button label="上海" ></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio5" size="small">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京" disabled ></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio6" disabled size="mini">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div>
      <h1></h1>
      <div>
        <el-radio v-model="radio7" label="1" border>备选项1</el-radio>
        <el-radio v-model="radio7" label="2" border>备选项2</el-radio>
      </div>
      <div style="margin-top: 20px">
        <el-radio v-model="radio8" label="1" border size="medium">备选项1</el-radio>
        <el-radio v-model="radio8" label="2" border size="medium">备选项2</el-radio>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio9" size="small">
          <el-radio label="1" border>备选项1</el-radio>
          <el-radio label="2" border disabled>备选项2</el-radio>
        </el-radio-group>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="radio10" size="mini" disabled>
          <el-radio label="1" border>备选项1</el-radio>
          <el-radio label="2" border>备选项2</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Radio",
    data() {
      return {
        radio: 1,
        radio1: 2,
        radio2: 9,
        radio3: "上海",
        radio4: "上海",
        radio5: "上海",
        radio6: "上海",
        radio7: "1",
        radio8: "1",
        radio9: "1",
        radio10: "1"
      }
    }
  }
</script>

<style type="text/scss" scoped>

</style>
