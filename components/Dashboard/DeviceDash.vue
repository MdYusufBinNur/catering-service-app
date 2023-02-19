<template>
  <div>
    <v-row no-gutters align="center">
      <v-col>
        <v-card
          class="transparent"
          flat

          tile
        >
          <span class="ppns_title_3"> {{ $t('Device')}} </span>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="pa-2 py-4">
      <v-col cols="12" md="9" sm="12" lg="9" :class="bp.mdAndUp ?'pr-2' : ''"
             :style="bp.mdAndUp ? 'height: 400px' : ''">
        <v-layout row wrap :class="bp.mdAndUp ? 'pb-1' :''">
          <v-flex xs12 sm6 md4 lg4 class="px-1">
            <v-card flat class="mb-1 transparent radius">
              <v-skeleton-loader
                type="list-item-avatar-two-line"
                v-if="loading"
              ></v-skeleton-loader>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-action class="mr-3">
                    <v-btn fab depressed class="accentlight" small>
                      <v-img :src="active_device" class="rounded" contain aspect-ratio="3"/>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item class="px-0">
                      <h3 class="">
                        {{ activeDevice }}
                      </h3>

                      <v-spacer/>
                      <v-list-item-action class="text-center">
                        <span class="caption text-center"
                              :style="this.compareDeviceData.more  ? 'color: #16e03a' : 'color: #e04d29'">
                          <v-icon small class="pa-0" :color="this.compareDeviceData.more  ? 'success' : 'error'">
                            {{ this.compareDeviceData.more ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
                          </v-icon>
                          {{ this.compareDeviceData.numberInPct }}
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                    <span class="" style="margin-top: -8px; font-size: 10px">
                      {{ $t('Active devices in this period')}}
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md4 lg4 class="px-1">
            <v-card flat class="mb-1 transparent radius">
              <v-skeleton-loader
                type="list-item-avatar-two-line"
                v-if="loading"
              ></v-skeleton-loader>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-action class="mr-3">
                    <v-btn fab depressed class="accentlight" small>
                      <v-img :src="defected_device" class="rounded" contain aspect-ratio="3"/>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item class="px-0">
                      <h3 class="">
                        {{ defectDevice }}
                      </h3>

                      <v-spacer/>
                      <v-list-item-action class="text-center">
                        <span class="caption text-center"
                              :style="this.compareDefectDeviceData.more  ? 'color: #16e03a' : 'color: #e04d29'">
                          <v-icon small class="pa-0" :color="this.compareDefectDeviceData.more  ? 'success' : 'error'">
                            {{ this.compareDefectDeviceData.more ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
                          </v-icon>
                          {{ this.compareDefectDeviceData.numberInPct }}
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                    <span class="" style="margin-top: -8px; font-size: 10px">
                      {{ $t('Defect devices in this period')}}
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md4 lg4 class="px-1">
            <v-card flat class="mb-1 transparent radius">
              <v-skeleton-loader
                type="list-item-avatar-two-line"
                v-if="loading"
              ></v-skeleton-loader>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-action class="mr-3">
                    <v-btn fab depressed class="accentlight" small>
                      <v-img :src="clock" class="rounded" contain aspect-ratio="3"/>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item class="px-0">
                      <h3 class="">
                        {{ avgRuntime }}
                        <sub>
                            <span class="caption">
                          hr/day
                        </span>
                        </sub>
                      </h3>

                      <v-spacer/>
                      <v-list-item-action class="text-center">
                        <span class="caption text-center"
                              :style="this.compareAvgRunTimeData.more  ? 'color: #16e03a' : 'color: #e04d29'">
                          <v-icon small class="pa-0" :color="this.compareAvgRunTimeData.more  ? 'success' : 'error'">
                            {{ this.compareAvgRunTimeData.more ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
                          </v-icon>
                          {{ this.compareAvgRunTimeData.numberInPct }}
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                    <span style="margin-top: -8px; font-size: 11px">
                     {{ $t('Avg. runtime in this period')}}
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg4 class="mt-3 px-1">
            <v-skeleton-loader
              class="pa-5 px-2 py-3"
              type="card"
              v-if="showLoader"
            ></v-skeleton-loader>
            <DeviceLogChart v-else :propertyID='"myChart401"' :chart-options="deviceStatusChartOption"/>
          </v-flex>
          <v-flex xs12 sm6 md8 lg8 class="px-1">
            <v-card flat class="mb-2 transparent radius">
              <v-skeleton-loader
                class="pa-5 px-2 py-6"
                type="card"
                :title="false"
                v-if="showLoader"
              ></v-skeleton-loader>
              <UserStatusLineChart v-if="!showLoader" v-show="bp.mdAndUp && !showLoader" :propertyID='"myChart621"'
                                   :chart-options="userStatusLineChartOptLg"/>
              <UserStatusLineChart v-show="bp.smAndDown && !showLoader" :propertyID='"myChart622"'
                                   :chart-options="userStatusLineChartOpt"/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col cols="12" md="3" sm="12" lg="3" :class="bp.mdAndUp ? 'pl-5' : 'mt-9'"
             :style="bp.mdAndUp ? 'height: 400px; margin-top: 12px' : ''">
        <v-layout row wrap>
          <v-flex>
            <v-card height="400px" flat class=" radius justify-center py-0">
              <v-row class="pt-0">
                <v-col cols="12" md="12" sm="12" class="pt-0">
                  <v-btn depressed right x-small rounded class="mt-5 px-5 ml-2">
                    Last 30 day
                  </v-btn>
                </v-col>
              </v-row>
              <v-container bg text-xs-center text-lg-center text-md-center class="mt-5">
                <v-card-title class="justify-center text-center">
                        <span class="text-h1 text-xs-center">
                          {{ newDevice }}
                        </span>
                </v-card-title>

                <v-card-subtitle class="text-center justify-center pp-body-reg-1" align="center">
                  {{ $t('New device has been added')}}
                </v-card-subtitle>
                <v-card-subtitle class="text-center justify-center pp-body-reg-1" align="center">
                  {{ moreOrLess }}
                </v-card-subtitle>
                <v-spacer/>
                <v-card-actions class="justify-center align-self-end mt-2">

                  <v-btn rounded class="pa-2 mt-8 btn_color text-capitalize white--text" :to="localePath('/report')">
                    <v-list-item>
                          <span class="white--text px-0">
                            check device report
                          </span>
                      <v-list-item-action class="pa-0 mx-0 pl-3">
                        <v-avatar size="18">
                          <v-img :src="arrowIcon" class="rounded "/>
                        </v-avatar>

                      </v-list-item-action>
                    </v-list-item>
                  </v-btn>
                </v-card-actions>
              </v-container>

            </v-card>
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>
    <v-divider v-show="bp.mdAndUp" :class="bp.mdAndUp ? 'mt-5' : ''"/>
  </div>
</template>

<script>
  import date_icon from "../../static/icons/date.png";
  import group_account from "../../static/icons/ac-group.png";
  import account from "../../static/icons/account.png";
  import notification from "../../static/icons/notification.png";
  import defected_device from "../../static/icons/defected-device.png";
  import active_device from "../../static/icons/ac-device.png";
  import clock from "../../static/icons/clock.png";
  import UserLocationChart from "../Charts/DashboardUserLocationChart";
  import UserStatusLineChart from "../Charts/UserStatusLineChart";
  import DeviceLogChart from "../Charts/DashboardDeviceLogChart";
  import arrowIcon from "../../static/icons/arrow-circle.png";
  import {mapGetters} from "vuex";

  export default {
    name: "DeviceDash",
    data() {
      return {
        loading: false,
        showLoader: true,
        date_icon,
        group_account,
        account,
        arrowIcon,
        notification,
        defected_device,
        active_device,
        clock,
        menu: false,
        date: [],
        userStatusLineChartOptLg: {
          title: {
            text: 'Device Log'
          },
          color: [
            '#2C3040', '#6D7693'
          ],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Active', 'Inactive']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: []
        },
        userStatusLineChartOpt: {
          title: {
            text: 'Device Log'
          },
          color: [
            '#2C3040', '#6D7693'
          ],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Active', 'Inactive']
          },
          grid: {
            left: '3%',
            right: '60%',
            bottom: '3%',
            containLabel: true
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: []
        },
        deviceStatusChartOption: {
          tooltip: {
            trigger: 'item'
          },
          textStyle: {
            fontSize: '8px'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top: '5%'
          },
          color: [
            '#7D85A1', '#C6C6C8', '#6D7079'
          ],
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
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: []
            }
          ]
        },
        compareDeviceData: {
          more: false,
          numberInPct: ''
        },
        compareDefectDeviceData: {
          more: false,
          numberInPct: ''
        },
        compareAvgRunTimeData: {
          more: false,
          numberInPct: ''
        },
        activeDevice: 0,
        defectDevice: 0,
        avgRuntime: 0,
        newDevice: 0,
        moreOrLess: '',
      }
    },
    computed: {
      dateRangeText() {
        return this.date.join(' ~ ')
      },
      ...mapGetters({
        dashboardDeviceStatus: 'dashboard/getDashboardDeviceStatus',
        dashboardDeviceLogChartDate: 'dashboard/getDashboardDeviceLogChartDate',
        dashboardDeviceLogChartSeries: 'dashboard/getDashboardDeviceLogChartSeries',
        deviceMoreOrLess: 'dashboard/getDeviceMoreOrLess',
        deviceAvgRuntimeData: 'dashboard/getDeviceAvgRuntime',
        newDeviceData: 'dashboard/getNewDevice',
        activeDeviceData: 'dashboard/getActiveDevice',
        defectDeviceData: 'dashboard/getDefectDevice',
        compareDeviceAvgRuntime: 'dashboard/getCompareDeviceAvgRuntime',
        compareDevice: 'dashboard/getCompareDevice',
        compareDefectDevice: 'dashboard/getCompareDefectDevice',
        filteredData: 'dashboard/getFilteredDashboardData',
      })
    },
    watch: {
      dashboardDeviceLogChartDate: {
        handler(nv, ov) {
          if (this.dashboardDeviceLogChartDate && this.dashboardDeviceLogChartDate.length) {
            this.deviceStatusChartOption.series[0].data = JSON.parse(JSON.stringify(this.dashboardDeviceStatus))
            this.userStatusLineChartOptLg.xAxis.data = JSON.parse(JSON.stringify(this.dashboardDeviceLogChartDate))
            this.userStatusLineChartOptLg.series = JSON.parse(JSON.stringify(this.dashboardDeviceLogChartSeries))
            this.userStatusLineChartOpt.xAxis.data = JSON.parse(JSON.stringify(this.dashboardDeviceLogChartDate))
            this.userStatusLineChartOpt.series = JSON.parse(JSON.stringify(this.dashboardDeviceLogChartSeries))
            this.moreOrLess = JSON.parse(JSON.stringify(this.deviceMoreOrLess))
            this.avgRuntime = JSON.parse(JSON.stringify(this.deviceAvgRuntimeData))
            this.newDevice = JSON.parse(JSON.stringify(this.newDeviceData))
            this.activeDevice = JSON.parse(JSON.stringify(this.activeDeviceData))
            this.defectDevice = JSON.parse(JSON.stringify(this.defectDeviceData))
            this.compareAvgRunTimeData = Object.assign({}, JSON.parse(JSON.stringify(this.compareDeviceAvgRuntime)))
            this.compareDeviceData = Object.assign({}, JSON.parse(JSON.stringify(this.compareDevice)))
            this.compareDefectDeviceData = Object.assign({}, JSON.parse(JSON.stringify(this.compareDefectDevice)))
            this.showLoader = false
          } else {
            this.initData()
          }
        }
        , deep: true, immediate: true
      },
      // activeDeviceData: {
      //   handler(nv, ov) {
      //     if (nv !== ov) {
      //       this.activeDevice = JSON.parse(JSON.stringify(this.activeDeviceData))
      //       this.avgRuntime = JSON.parse(JSON.stringify(this.deviceAvgRuntimeData))
      //       this.defectDevice = JSON.parse(JSON.stringify(this.defectDeviceData))
      //       this.compareAvgRunTimeData = Object.assign({}, JSON.parse(JSON.stringify(this.compareDeviceAvgRuntime)))
      //       this.compareDeviceData = Object.assign({}, JSON.parse(JSON.stringify(this.compareDevice)))
      //       this.compareDefectDeviceData = Object.assign({}, JSON.parse(JSON.stringify(this.compareDefectDevice)))
      //     }
      //   },
      //   deep: true,
      //   immediate: true
      // },
      filteredData: {
        handler(nv, ov) {
          if (this.filteredData) {

          }
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      close() {
        this.menu = false;
      },
      initData() {
        this.$store.commit('dashboard/setFilteredDashboardData', [])
        this.$store.dispatch('dashboard/initDashboardDeviceReport')
      },

      setDeviceData(data) {
        this.loading = true;
        this.activeDevice = data.activeDevice
        this.defectDevice = data.defectedDevice
        this.avgRuntime = data.avgRunTime
        this.compareAvgRunTimeData = Object.assign({}, data.compareAvgRunTime)
        this.compareDeviceData = Object.assign({}, data.compareDevice)
        this.compareDefectDeviceData = Object.assign({}, data.compareDefectDevice)
        this.$nextTick(() => {
          this.loading = false
        })
      }
    },
    created() {
      this.$nuxt.$on('filterModeOn', () => {
        this.setDeviceData(JSON.parse(JSON.stringify(this.filteredData)))
      })
    },
    components: {
      DeviceLogChart,
      UserLocationChart,
      UserStatusLineChart
    }
  }
</script>

<style scoped>

  .radius {
    border-radius: 7px;
  }
</style>
