<template>
  <v-card flat color="white">
    <v-row>
      <v-col>
        <v-card-title>Location</v-card-title>
      </v-col>
      <v-col align="right">
        <v-btn depressed right x-small rounded class="mt-5 mr-2">
          Last 30 day
        </v-btn>
      </v-col>
    </v-row>
    <div :id="propertyID" class="charts pl-3"></div>
    <v-card-text class="caption">
      N.B: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id.
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "UserLocationChart",
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
      // if (this.chartOptions){
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
  #myChartDemo {
    width: 400px;
    height: 200px;
  }

  .charts {
    width: 350px;
    height: 200px;
  }

</style>
