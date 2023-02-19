<template>
  <v-card flat color="#FAFAFA" :class="bp.mdAndUp ? 'mt-5 ml-3' : 'mt-5'" min-width="808px">
    <v-row class="pa-5 pb-0">
      <v-col class="pb-0">
        <span class="ppns_title_3">Usages time</span>
      </v-col>
      <v-col class="pb-0" align="">
        <v-btn-toggle
          rounded
          dense
          borderless
        >
          <v-btn rounded small active-class="active2 white--text " @click="changeDataset('week')" class="px-5 text-capitalize" style="border-radius: 25px; margin-right : -10px">
            weekly
          </v-btn>
          <v-btn rounded small class="px-5 text-capitalize" @click="changeDataset('month')" :text="weekly_btn" active-class="active2 white--text"
                 style="border-radius: 25px; "  >
            monthly
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <div :id="propertyID" class="charts pt-0 mt-0"></div>
  </v-card>
</template>

<script>
  export default {
    name: "DeviceStatusChart",
    props: {
      chartOptionsWeekly: {
        required: true
      },
      chartOptionsMonthly: {
        required: true
      },
      propertyID: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        weekly_btn: true
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
        myChart.setOption(this.chartOptionsWeekly)
      },
      changeDataset(data) {
        let myChart = this.$echarts.init(document.getElementById(this.propertyID))
        // Start rendering
        if (data === 'week') {
          myChart.setOption(this.chartOptionsWeekly)
        } else {
          myChart.setOption(this.chartOptionsMonthly)
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
    width: 800px;
    height: 450px;
  }

</style>
