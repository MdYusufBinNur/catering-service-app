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
  name: 'DonutChartComponent',
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
          trigger: 'item',
        },
        textStyle: {
          fontSize: '12px',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '5%',
        },
        color: ['#575A6A', '#7D85A1', '#C6C6C8', '#6D7079'],
        series: [
          {
            left: '10%',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              borderRadius: 5,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
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
      //  same as pie chart data
      myChart.setOption(this.chartOptions)
    },
  },
}
</script>

<style scoped>
.default {
  width: 500px;
  height: 250px;
}
</style>
