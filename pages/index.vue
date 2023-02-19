<template>
  <Dashboard />
</template>

<script>
import Dashboard from "../components/Dashboard/Dashboard";

export default {
  name: "index",
  components: {
    Dashboard,
  },
  // created() {
  //   console.log(this.$auth.strategy.token.get())
  // }
  mounted() {
    // const channel = 'notification'
    // this.$echo.channel(channel)
    //   .on('NotificationInfoEvent', (event) => {
    //     console.log(event)
    //   })
    //   .error((e) => {
    //     console.log(e)
    //   })
  },

}
</script>

<style scoped>

</style>
