<template>
  <VerifyEmail/>
</template>

<script>
  import VerifyEmail from "../../../components/Auth/VerifyEmail";

  export default {
    name: "index",
    layout: 'auth',
    components: {VerifyEmail}
  }
</script>

<style>
  html {
    font-family: "Poppins",sans-serif;
  }
</style>
