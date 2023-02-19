<template>
  <v-card flat color="white" class="pa-5 px-2 py-6">
    <div :id="propertyID" class="charts"></div>
  </v-card>
</template>

<script>
  export default {
    name: "UserStatusLineChart",
    props: {
      chartOptions: {
        required: true
      },
      propertyID: {
        required: true,
        type: String
      }
    },
    mounted() {
      // if (this.chartOptions) {
      //
      // }
      this.initCharts()
    },
    methods: {
      initCharts() {
        let myChart = this.$echarts.init(document.getElementById(this.propertyID))
        // Start rendering
        myChart.setOption(this.chartOptions)
      }
    }
  }
</script>

<style scoped>
  #myChart3 {
    width: 550px;
    height: 200px;
  }
  .charts {
    width: 520px;
    height: 250px;
  }

</style>
