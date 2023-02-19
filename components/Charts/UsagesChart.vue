<template>
  <v-card flat color="white" >
    <v-row>
      <v-col>
        <v-card-title>Usages</v-card-title>
      </v-col>
      <v-col align="right">
        <v-btn-toggle
          rounded
          dense
          class="mt-5 mr-2"
          borderless
        >
          <v-btn rounded x-small active-class="active2 white--text" class="px-5" @click="changeState('daily')"
                 style="border-radius: 25px; margin-right : -10px">
            Daily
          </v-btn>
          <v-btn rounded x-small class="px-5" @click="changeState('week')" :text="weekly_btn"
                 active-class="active2 white--text"
                 style="border-radius: 25px; ">
            Weekly
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <div :id="propertyID" class="charts"></div>
    <v-card-text class="caption">
      N.B: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id.
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "UsagesChart",
    props: {
      chartOptionsDaily: {
        required: true
      },
      propertyID: {
        required: true,
        type: String
      },
      chartOptionsWeekly: {
        required: true
      },
    },
    data() {
      return {
        weekly_btn: true,
        loading: true,
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
        myChart.setOption(this.chartOptionsDaily)
      },
      changeState(data) {
        let myChart = this.$echarts.init(document.getElementById(this.propertyID))
        if (data === 'week') {
          myChart.setOption(this.chartOptionsWeekly)
        } else {
          myChart.setOption(this.chartOptionsDaily)
        }
      }
    }
  }
</script>

<style scoped>
  #myChart4 {
    width: 350px;
    height: 200px;
  }

  .charts {
    width: 600px;
    height: 200px;
  }

</style>
