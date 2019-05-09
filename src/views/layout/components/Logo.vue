<template>
  <div>
    <img
      class="logo"
      style="cursor: pointer;"
      src="~@/assets/telogo.png"
      @click="home()">
    <span class="logo_title">天翼U盾运营平台</span>
  </div>

</template>

<script>
  export default {
    name: "Logo",
    methods: {
      home() {
        this.$router.push({ path: "/" })
      }
    }

  }
</script>

<style type="text/scss" scoped>

  .logo{
    vertical-align: middle;
    font-size: 24px;
  }
  /*vertical-align:middle  是依赖div内子元素最高的行高来实现对某元素居中的，而我们只需要建立一个新元素，给他加上inline-block属性 再把他高度设置为100%就行了,在下面的<img>设置vertical-align就生效了*/
  .logo_title{
    color: #fff;
    font-size: 20px;
    padding-left: 10px;
    vertical-align: middle;
  }

</style>
