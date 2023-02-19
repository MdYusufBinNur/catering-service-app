<template>
  <v-card flat color="white" class="radius">
    <v-row class="pt-0">
      <v-col class="pt-4 pa-10 pl-7">
        <span class="ppns_title_3">Location</span>
      </v-col>

      <v-col align="right" class="pt-1">
        <v-btn depressed right x-small rounded class="mt-5 mr-2">
          Last 30 day
        </v-btn>
      </v-col>
    </v-row>
    <div :id="propertyID" class="charts px-2"></div>
    <v-card-text class="caption">
      N.B: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id.
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "DashboardUserLocationChart",
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
    height: 145px;
  }

  .radius{
    border-radius: 7px;
  }
</style>
