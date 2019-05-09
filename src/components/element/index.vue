<template>
  <div id="app">
    <Layout v-if="component === 'Layout'"/>
    <Container v-else-if="component === 'Container'"/>
    <Icon v-else-if="component === 'Icon'"/>
    <Button v-else-if="component === 'Button'"/>
    <Form v-else-if="component === 'Form'"/>
  </div>
</template>

<script>
  import Layout from "./layout"
  import Container from "./container"
  import Icon from "./icon"
  import Button from "./button"
  import Form from "./form"

  export default {
    name: "ElementComponent",
    components: {
      Layout,
      Container,
      Icon,
      Button,
      Form
    },
    data() {
      return {
        component: "Form"
      }
    }
  }
</script>

<style>

</style>
