<template>
  <ChangePassword title="Set New Password"/>
</template>

<script>
  import ChangePassword from "../../../../components/Auth/ChangePassword";

  export default {
    name: "index",
    layout: 'auth',
    components: {ChangePassword},
    methods: {
      getToken() {

      }
    }
  }
</script>

<style scoped>

</style>
