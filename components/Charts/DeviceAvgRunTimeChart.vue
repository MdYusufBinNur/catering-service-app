<template>
    <v-card flat color="white">
        <v-row>
            <v-col>
                <v-card-title class="title">Device & Tempo</v-card-title>
            </v-col>
            <v-col align="right">
                <v-btn-toggle
                        rounded
                        dense
                        class="mt-5 mr-2"
                        borderless
                >
                    <v-btn rounded x-small active-class="active2 white--text" class="px-5"
                           @click="changeOption('daily')"
                           style="border-radius: 25px; margin-right : -10px">
                        Daily
                    </v-btn>
                    <v-btn rounded x-small class="px-5" :text="weekly_btn" active-class="active2 white--text"
                           @click="changeOption('week')"
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
    import {mapGetters} from "vuex";

    export default {
        name: "DeviceAvgRunTimeChart",
        props: {
            chartOptions: {
                required: true
            },
            propertyID: {
                required: true,
                type: String
            },
        },
        data() {
            return {
                weekly_btn: true,
                deviceWeeklyTempoChartOption: {
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
                        '#6D7079', '#7D85A1', '#2C3040'
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
                        data: []
                    },
                    series: []
                },
                deviceAvgRunTimeChartOption: {
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
                        '#6D7079', '#7D85A1', '#2C3040'
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
                        data: []
                    },
                    series: []
                },
            }
        },

        computed: {
            ...mapGetters({
                deviceDailyTempoDate: 'dashboard/getDeviceDailyTempoDate',
                deviceWeeklyTempoDate: 'dashboard/getDeviceWeeklyTempoDate',
                deviceDailyTempoSeries: 'dashboard/getDeviceDailyTempoSeries',
                deviceWeeklyTempoSeries: 'dashboard/getDeviceWeeklyTempoSeries',
            })
        },
        watch: {
            deviceWeeklyTempoDate: {
                handler(nv, ov) {
                    if (this.deviceDailyTempoDate && this.deviceDailyTempoDate.length) {
                        this.deviceWeeklyTempoChartOption.xAxis.data = JSON.parse(JSON.stringify(this.deviceWeeklyTempoDate))
                        this.deviceWeeklyTempoChartOption.series = JSON.parse(JSON.stringify(this.deviceWeeklyTempoSeries))
                    }
                },
                immediate: true,
                deep: true
            },
            deviceDailyTempoDate: {
                handler(nv, ov) {
                    this.deviceAvgRunTimeChartOption.xAxis.data = JSON.parse(JSON.stringify(this.deviceDailyTempoDate))
                    this.deviceAvgRunTimeChartOption.series = JSON.parse(JSON.stringify(this.deviceDailyTempoSeries))
                },
                immediate: true,
                deep: true
            }
        },

        mounted() {
            this.initCharts()
        },
        methods: {
            initCharts() {
                let myChart = this.$echarts.init(document.getElementById(this.propertyID))
                // Start rendering
                myChart.setOption(this.deviceAvgRunTimeChartOption)
            },
            changeOption(btn) {
              let myChart = this.$echarts.init(document.getElementById(this.propertyID))
              if (btn === 'week') {
                myChart.setOption(this.deviceWeeklyTempoChartOption)
              } else {
                myChart.setOption(this.deviceAvgRunTimeChartOption)
              }
            }

        }
    }
</script>

<style scoped>
    #myChart6 {
        width: 350px;
        height: 200px;
    }

    .charts {
        width: 350px;
        height: 200px;
    }

  .active {
    background-color: #7D85A1;
  }
</style>

