<template>
    <el-form ref="fields" :model="form.fields" :rules="form.rules" :label-position="form.position" :label-width="form.width">

        <el-row v-for="(row, row_index) in form.rows" :key="row_index" :class="row.className">
            <el-col v-for="(col, col_index) in row.cols" :span="col.span" :key="col_index">

                <el-form-item
                        v-if="showItem(col)"
                        :prop="col.prop"
                        :label="col.label"
                        :class="col.className"
                        :ref="col.prop">

                    <template v-if="col.type === 'input' ">
                        <el-input
                                v-model="form.fields[col.prop]"
                                :placeholder="col.label"
                                auto-complete="on"
                                :disabled="isDisabled(col.disabled)"></el-input>
                    </template>

                    <template v-else-if="col.type === 'button' ">
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </template>

                    <template v-else-if="col.type === 'switch' ">
                        <el-switch
                                v-model="form.fields[col.prop]"
                                :active-text="col.event.value[0]"
                                :inactive-text="col.event.value[1]"
                                @change="handleSwitchChange(col.prop, col.event)">
                        </el-switch>
                    </template>

                    <template v-else-if="col.type === 'checkbox' ">
                        <el-checkbox :indeterminate="form.fields[col.isIndeterminate]" v-model="form.fields[col.checkAll]" @change="handleCheckAllChange(col.prop, col.checkAll, col.isIndeterminate)">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>

                        <el-checkbox-group v-model="form.fields[col.prop]" @change="handleCheckedChange(col.prop, col.checkAll, col.isIndeterminate)">
                            <template v-for="(item, index) in form.baseData[form.meta[col.prop].name + 'List']">
                                <el-checkbox :key="index" :label="item.value">{{ item.label }}</el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </template>

                    <template v-else-if="col.type === 'date' ">
                        <el-date-picker
                                :placeholder="col.label"
                                v-model="form.fields[col.prop]"
                                type="date"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </template>

                    <template v-else-if="col.type === 'radio' ">
                        <el-radio-group v-model="form.fields[col.prop]">
                            <template v-for="(item, index) in col.items">
                                <el-radio :key="index" :label="item.name">{{ item.value }}</el-radio>
                            </template>
                        </el-radio-group>
                    </template>

                    <template v-else-if="col.type === 'textarea' ">
                        <el-input v-model="form.fields[col.prop]" type="textarea"></el-input>
                    </template>

                    <template v-else-if="col.type === 'time' ">
                        <el-time-picker
                                :placeholder="col.label"
                                v-model="form.fields[col.prop]"
                                type="fixed-time"
                                style="width: 100%;"></el-time-picker>
                    </template>

                    <template v-else-if="col.type === 'select' ">

                        <el-select v-model="form.fields[col.prop]" :placeholder="col.label" value="" @change="relationData(form.meta[col.prop])">
                            <el-option value="">全部</el-option>
                            <template >
                                <el-option
                                        v-for="(item, index) in form.baseData[form.meta[col.prop].name + 'List']"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"></el-option>
                            </template>
                        </el-select>
                    </template>

                    <template v-else-if="col.type === 'switch' ">
                        <el-switch v-model="form.fields[col.prop]"></el-switch>
                    </template>

                </el-form-item>

            </el-col>

        </el-row>
    </el-form>
</template>

<script>
  import loadBaseData from "@/api/common/basedata/baseData"
  export default {
    name: "DynamicForm",
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      throughForm(form, callback, callbackParam) {
        // 遍历表单对象
        let rows = form.rows
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i]
          let cols = row.cols
          for (let j = 0; j < cols.length; j++) {
            let col = cols[j]
            // 表单域和callback所需参数
            callback(row, col, form.fields, callbackParam)
          }
        }
      },
      removeRules(prop) {
        // 移除规则校验记得恢复
        let self = this
        self.form.rules[prop] = []
      },
      restoreRules() {
        let form = this.form
        Object.keys(form.defaultRules).forEach(function (prop) {
          form.rules[prop] = form.defaultRules[prop]
        })
      },
      handleSwitchChangeCallback(row, col, fields, hideProps) {
        // 判断是否隐藏开关控制的表单项
        let mask = this.isHideProp(col.prop, hideProps)
        if (mask) {
          row.className = "hide"
          // 页面隐藏但是校验不通过, 只能这里移除规则
          this.removeRules(col.prop)
        } else {
          row.className = ""
        }
      },
      handleSwitchChange(prop, event) {
        // 开关状态改变触发事件
        let self = this
        let value = self.form.fields[prop]
        let hideProps = value ? event.off : event.on
        if (hideProps !== undefined) {
          // 1.恢复校验规则
          // 2.遍历表单，处理需要移除校验规则的表单项
          this.restoreRules() // 恢复校验规则
          self.throughForm(self.form, this.handleSwitchChangeCallback, hideProps)
        }
      },
      defaultSwitchCallback(row, col) {
        if (col.type === "switch") {
          this.form.fields[col.prop] = col.default // 恢复开关默认值
          this.handleSwitchChange(col.prop, col.event) // 触发开关状态改变事件
        }
      },
      resetFields() {
        console.log("resetFields")
        let self = this
        let form = self.form
        self.throughForm(form, this.defaultSwitchCallback) // 恢复开关默认值
        self.$refs.fields.resetFields() // 清空表单填充数据
      },
      isDisabled(disabled) {
        // 修改时，禁止修改主键
        return disabled && this.isEdit()
      },
      showItem(col) {
        let self = this
        // 根据 formType 判断是否需要校验, formType: [add, edit, filter]，filter全都要展示
        let needHandle = col[self.form.type]
        return needHandle === undefined ? true : needHandle
      },
      isAdd() {
        return this.form.type === "add"
      },
      isEdit() {
        return this.form.type === "edit"
      },
      isHideProp(prop, hideProps) {
        // 判断是否隐藏表单项
        let res = false
        for (let i = 0; i < hideProps.length; i++) {
          res = prop === hideProps[i]
          if (res) {
            break
          }
        }
        return res
      },
      handleCheckAllChange(model, checkAll, isIndeterminate) {
        let self = this
        // 对应的基础数据列表
        let data = self.form.baseData[self.form.meta[model].name + "List"]
        // 对应的基础数据的所有值
        let baseDataVal = []
        for (let i = 0; i < data.length; i++) {
          baseDataVal.push(data[i].value)
        }
        // 全选就把基础数据的所有值都赋给对应的数据项
        self.form.fields[model] = self.form.fields[checkAll] ? baseDataVal : []
        self.form.fields[isIndeterminate] = false
      },
      handleCheckedChange(model, checkAll, isIndeterminate) {
        let self = this
        // 对应的基础数据列表
        let data = self.form.baseData[self.form.meta[model].name + "List"]
        // 选中数据项长度
        let checkedCount = self.form.fields[model].length

        self.form.fields[checkAll] = checkedCount === data.length
        self.form.fields[isIndeterminate] = checkedCount > 0 && checkedCount < data.length
      },
      relationData(relationData) {
        // change事件和级联事件
        if (relationData.child !== undefined) {
          // 级联数据查询
          let self = this
          console.log(relationData.child.name)
          // 上级数据变更需要清空级联数据项
          self.form.fields[relationData.child.field] = ""

          loadBaseData(relationData.child.name, self) // 加载基础数据
        }
        // 控件的事件分发
        this.click()
      },
      click: function () {
        // 控件对应的点击事件
        this.clickEvent("click", this)
      },
      clickEvent(eventName, data) {
        this.$emit("click-event", eventName, data)
      }
    }
  }
</script>

<style scoped>
    .el-select{
        width: 100%
    }
    .hide{
        display: none;
    }
</style>
