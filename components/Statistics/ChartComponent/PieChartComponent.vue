<template>
  <v-card flat color="white">
    <v-row>
      <v-col cols="9">
        <v-card-title>{{ $t(chartTitle) }}</v-card-title>
      </v-col>
      <v-col cols="3" align="right">
        <v-btn depressed right x-small rounded class="mt-5 mr-5">
          {{ $t(chartSubTitle) }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" no-gutters class="d-flex justify-center">
      <div :id="propertyId" :class="className"></div>
      <v-card-text class="caption">
        {{ $t(chartDesc) }}
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'PieChartComponent',
  props: {
    chartTitle: {
      required: true,
      type: String,
    },
    chartSubTitle: {
      required: true,
      type: String,
    },
    chartDesc: {
      required: true,
      type: String,
    },
    chartData: {
      required: true,
      type: Array,
    },
    propertyId: {
      required: true,
      type: String,
    },
    className: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      chartOptions: {
        tooltip: {
          // trigger: 'item'
          label: {
            show: false,
          },
        },
        textStyle: {
          fontSize: '12px',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '10%',
        },
        color: ['#2C3040', '#8C8E9B', '#C6C6C8', '#575A6A', '#6D7693'],
        series: [
          {
            type: 'pie',
            left: '10%',
            radius: '60%', // ['40%', '85%'], for donut chart
            data: [], // send value and name object for donut chart
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
          },
        ],
      },
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      const myChart = this.$echarts.init(
        document.getElementById(this.propertyId)
      )
      this.chartOptions.series[0].data = this.chartData
      myChart.setOption(this.chartOptions)
    },
  },
}
</script>

<style scoped>
.coupleCharts {
  width: 500px;
  height: 250px;
}
.weddingCharts {
  width: 500px;
  height: 250px;
}
.dashboardWeddingChart {
  width: 400px;
  height: 250px;
}
.guestCharts {
  width: 500px;
  height: 250px;
}
</style>
