<template>
  <v-card flat color="white">
    <v-row>
      <v-col>
        <v-card-title>Notification</v-card-title>
      </v-col>


      <v-col align="right">
        <v-btn-toggle
          rounded
          dense
          class="mt-5 mr-2"
          borderless
        >
          <v-btn rounded x-small active-class="active2 white--text" class="px-5" @click="changeState('week')" style="border-radius: 25px; margin-right : -10px">
            Weekly
          </v-btn>
          <v-btn rounded x-small class="px-5" @click="changeState('month')" :text="weekly_btn" active-class="active2 white--text"
                 style="border-radius: 25px; "  >
            Monthly
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
  import {mapGetters} from "vuex";

  export default {
    name: "UserNotificationCharts",
    props: {
      chartOptions: {
        required: false
      },
      propertyID: {
        required: false,
        type: String
      }
    },
    data() {
      return {
        weekly_btn : true,
        userWeeklyNotificationChartOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {

            left: 'right',
          },
          color: [
            '#6D7079','#7D85A1','#2C3040'
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          series: [
            {
              name: 'News',
              type: 'bar',
              stack: 'total',
              barMaxWidth: 15,
              label: {
                show: false
              },
              emphasis: {
                focus: 'series'
              },
              data: [90, 200, 120, 125, 450, 221, 350]
            },
            {
              name: 'Event',
              type: 'bar',
              stack: 'total',
              barMaxWidth: 15,
              label: {
                show: false
              },
              emphasis: {
                focus: 'series'
              },
              data: [200, 258, 101, 134, 152, 120, 210]
            },
            {
              name: 'Article',
              type: 'bar',
              stack: 'total',
              barMaxWidth: 15,
              label: {
                show: false
              },
              emphasis: {
                focus: 'series'
              },
              data: [220, 200, 191, 257, 290, 152, 450]
            },

          ]
        },
        userMonthlyNotificationChartOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {

            left: 'right',
          },
          color: [
            '#6D7079','#7D85A1','#2C3040'
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'value'
          },
          xAxis: {
            type: 'category',
            data: ['10 OCT', '10 OCT', '13 OCT', '15 OCT', '17 OCT', '19 OCT', '21 OCT']
          },
          series: [
            {
              name: 'News',
              type: 'bar',
              stack: 'total',
              barMaxWidth: 15,
              label: {
                show: false
              },
              emphasis: {
                focus: 'series'
              },
              data: [100, 400, 301, 334, 390, 330, 320]
            },
            {
              name: 'Event',
              type: 'bar',
              stack: 'total',
              barMaxWidth: 15,
              label: {
                show: false
              },
              emphasis: {
                focus: 'series'
              },
              data: [200, 300, 101, 134, 90, 230, 210]
            },
            {
              name: 'Article',
              type: 'bar',
              stack: 'total',
              barMaxWidth: 15,
              label: {
                show: false
              },
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },

          ]
        },
      }
    },
    mounted() {
      // if (this.chartOptions) {
      //
      // }
      this.initCharts()
    },
    computed: {
      ...mapGetters({
        weeklyNotificationSeriesData: 'dashboard/getWeeklyUserNotificationSeries',
        monthlyNotificationSeriesData: 'dashboard/getMonthlyUserNotificationSeries',
        monthlyNotificationDate: 'dashboard/getMonthlyUserNotificationDate',
        weeklyNotificationDate: 'dashboard/getWeeklyUserNotificationDate',
      })
    },
    // watch: {
    //   weeklyNotificationSeriesData: {
    //     handler(nv, ov) {
    //       if (this.weeklyNotificationDate && this.weeklyNotificationDate.length) {
    //         this.userWeeklyNotificationChartOption.xAxis.data = JSON.parse(JSON.stringify(this.weeklyNotificationDate))
    //         this.userWeeklyNotificationChartOption.series = JSON.parse(JSON.stringify(this.weeklyNotificationDate))
    //       }
    //     },
    //     immediate: true,
    //     deep: true
    //   },
    //   monthlyNotificationDate: {
    //     handler(nv, ov) {
    //       if (this.monthlyNotificationDate && this.monthlyNotificationDate.length) {
    //         this.userMonthlyNotificationChartOption.xAxis.data = JSON.parse(JSON.stringify(this.weeklyNotificationDate))
    //         this.userMonthlyNotificationChartOption.series = JSON.parse(JSON.stringify(this.weeklyNotificationDate))
    //       }
    //     },
    //     immediate: true,
    //     deep: true
    //   },
    // },
    methods: {
      initCharts() {
        let myChart = this.$echarts.init(document.getElementById(this.propertyID))
        // Start rendering
        myChart.setOption(this.userWeeklyNotificationChartOption)
      },
      setButtonOverlap()
      {
        this.weekly_btn = !this.weekly_btn
      },
      changeState(data) {
        let myChart = this.$echarts.init(document.getElementById(this.propertyID))
        if (data === 'week'){
          myChart.setOption(this.userWeeklyNotificationChartOption)
        } else {
          myChart.setOption(this.userMonthlyNotificationChartOption)
        }
      }
    }
  }
</script>

<style scoped>
  #myChart2 {
    width: 350px;
    height: 200px;
  }
  .charts {
    width: 350px;
    height: 200px;
  }

</style>
