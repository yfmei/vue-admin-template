<template>
    <div>
        <ul>
            <li>
                <div :class="{bold: isFolder}"
                     @dblclick="changeType">
                <span v-if="isFolder" @click="toggle">
                    <i class="iconfont icon-minus-square-l-o" v-show="open"></i>
                    <i class="iconfont icon-plus-square-l-o" v-show="!open"></i>
                </span>
                    <el-checkbox name="type" v-if="check" @change="checked(model)" v-model="model.isAssign"></el-checkbox>
                    <span @click="onClick(model)">{{ model.funcName }}</span>
                </div>
                <ul v-show="open" v-if="isFolder">
                    <Menu
                        class="item"
                        v-for="(menu, index) in model.children"
                        :key="index"
                        :model="menu"
                        :check="check"
                        @click-event="onClick"/>
                    <!--<li class="add" @click="addChild">+</li>-->
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "Menu",
    props: {
      model: Object,
      check: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        open: false,
        checkAll: false,
        checkedMenus: [],
        allMenus: [],
        isIndeterminate: true
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children &&
          this.model.children.length
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      changeType: function () {
        if (!this.isFolder) {
          Vue.set(this.model, "children", [])
          this.addChild()
          this.open = true
        }
      },
      addChild: function () {
        this.model.children.push({
          name: "new stuff"
        })
      },
      onClick: function (data) {
        console.log("click menu")
        let self = this
        self.$emit("click-event", data)
      },
      checked: function (data) {
        console.log("checked menu")
        let self = this
        self.$emit("checked-event", data)
        if (data.isAssign) {
          self.checkedMenus.push(data.funcId)
        }
        data.isAssign = !data.isAssign

        // 子节点全选
        if (data.children !== undefined && data.children.length > 0) {
          let childMenu = data.children
          for (let i = 0; i < childMenu.length; i++) {
            if (childMenu[i].isAssign) {
              self.checkedMenus.push(childMenu[i].funcId)
            }
            childMenu[i].isAssign = !childMenu[i].isAssign
          }
        }
      }
    }
  }
</script>

<style scoped>
    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: none;
    }
</style>
