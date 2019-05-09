<template>
  <section>
    <transition name="slide">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>

  export default {
    name: "AppMain",
    components: {},
    data() {
      return {
        component: "AppMain"
      }
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    },

    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
