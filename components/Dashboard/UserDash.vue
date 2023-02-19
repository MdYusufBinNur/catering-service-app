<template>
  <v-container fluid fill-height class="px-0 py-0 pt-2">
    <v-row no-gutters align="center">
      <v-col>
        <v-card
          class="transparent"
          flat

          tile
        >
          <span class="ppns_title_3"> {{ $t('User')}} </span>
        </v-card>
      </v-col>
      <v-col md="auto" align="right" class="px-1">
        <v-card
          class="py-2 transparent"
          flat
          tile
        >
          <v-chip color="active2 white--text" small dark class="px-7" @click="refreshDashboard">
            <span class="caption">Last 30 day</span>
          </v-chip>
        </v-card>
      </v-col>
      <v-col md="auto" align="right">
        <v-card
          class="transparent py-2"
          flat
          tile
        >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip small color="tab_active2" v-bind="attrs" v-on="on" class="px-2">
                <v-icon small class="px-3">
                  mdi-calendar
                </v-icon>
                <span class="caption">{{ dateRangeText ? dateRangeText : $t('Select date from calender')}}</span>
              </v-chip>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              range
              scrollable
            >
              <v-spacer/>
              <v-btn
                text
                color="primary"
                @click="close"
              >
                {{ $t('Cancel')}}
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="initWithDate"
              >
                {{ $t('OK')}}
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="pa-2 pt-3 pb-0">
      <v-col cols="12" md="9" sm="12" lg="9" class="pr-2" :style="bp.mdAndUp ? 'height: 400px' : ''">
        <v-layout row wrap class="pb-1">
          <v-flex xs12 sm6 md4 lg4 class="px-1">
            <v-card flat class=" mb-1 transparent radius">
              <v-skeleton-loader
                type="list-item-avatar-two-line"
                v-if="loadUserData"
              ></v-skeleton-loader>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-action class="mr-3">
                    <v-btn fab depressed class="accentlight" small>
                      <v-img :src="group_account" class="rounded" contain aspect-ratio="3"/>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item class="px-0">
                      <h3 class="">
                        {{activeUser}}
                      </h3>

                      <v-spacer/>
                      <v-list-item-action class="text-center">
                        <span class="caption text-center"
                              :style="this.compareUserData.more  ? 'color: #16e03a' : 'color: #e04d29'">
                          <v-icon small class="pa-0" :color="this.compareUserData.more  ? 'success' : 'error'">
                            {{ this.compareUserData.more ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
                          </v-icon>
                          {{ this.compareUserData.numberInPct }}
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                    <span class="" style="margin-top: -8px; font-size: 10px">
                      {{ $t('Active users in this period')}}
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
                v-if="loadUserData"
              ></v-skeleton-loader>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-action class="mr-3">
                    <v-btn fab depressed class="accentlight" small>
                      <v-img :src="account" class="rounded" contain aspect-ratio="3"/>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item class="px-0">
                      <h3 class="">
                        {{ inActiveUser }}
                      </h3>

                      <v-spacer/>
                      <v-list-item-action class="text-center">
                        <span class="caption text-center"
                              :style="this.compareInactiveUserData.more  ? 'color: #16e03a' : 'color: #e04d29'">
                          <v-icon small class="pa-0" :color="this.compareInactiveUserData.more  ? 'success' : 'error'">
                            {{ this.compareInactiveUserData.more ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
                          </v-icon>
                          {{ this.compareInactiveUserData.numberInPct }}
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                    <span class="" style="margin-top: -8px; font-size: 10px">
                      {{ $t('Inactive user in this period')}}
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
                v-if="loadUserData"
              ></v-skeleton-loader>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-action class="mr-3">
                    <v-btn fab depressed class="accentlight" small>
                      <v-img :src="notification" class="rounded" contain aspect-ratio="3"/>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item class="px-0">
                      <h3 class="">
                        {{ readNotifications }}
                      </h3>

                      <v-spacer/>
                      <v-list-item-action class="text-center">
                        <span class="caption text-center"
                              :style="this.compareReadNotificationData.more  ? 'color: #16e03a' : 'color: #e04d29'">
                          <v-icon small class="pa-0"
                                  :color="this.compareReadNotificationData.more  ? 'success' : 'error'">
                            {{ this.compareReadNotificationData.more ? 'mdi-arrow-up' : 'mdi-arrow-down'}}
                          </v-icon>
                          {{ this.compareReadNotificationData.numberInPct }}
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                    <span style="margin-top: -8px; font-size: 10px">
                     {{ $t('User read notification in this period')}}
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg4 class="rounded mt-3 px-1">
            <v-skeleton-loader
              class="pa-5 px-2 py-3"
              type="card"
              v-if="!userLocationShow"
            ></v-skeleton-loader>

            <UserLocationChart v-else :propertyID='"myChart301"' :chart-options="userLocationChartOpt" class=""/>
          </v-flex>
          <v-flex xs12 sm6 md8 lg8 class="px-1">
            <v-card flat class="mb-2 transparent radius">
              <v-skeleton-loader
                class="pa-5 px-2 py-6"
                type="card"
                :title="false"
                v-if="!userLocationShow"
              ></v-skeleton-loader>

              <UserStatusLineChart v-if="userLocationShow" v-show="bp.mdAndUp && userLocationShow"
                                   :propertyID='"myChart121"'
                                   :chart-options="userStatusLineChartOptLg"/>
              <UserStatusLineChart v-show="bp.smAndDown && userLocationShow" :propertyID='"myChart2122"'
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
                          {{ userReport.newUser }}
                        </span>
                </v-card-title>

                <v-card-subtitle class="text-center justify-center pp-body-reg-1" align="center">
                  New users has been added
                </v-card-subtitle>
                <v-card-subtitle class="text-center justify-center pp-body-reg-1" align="center">
                  {{ userReport.moreUserText }}
                </v-card-subtitle>
                <v-spacer/>
                <v-card-actions class="justify-center align-self-end mt-2">

                  <v-btn rounded class="pa-2 mt-8 btn_color text-capitalize white--text" :to="localePath('/report')">
                    <v-list-item>
                          <span class="white--text px-0">
                            check user report
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

  </v-container>
</template>

<script>
  import date_icon from "../../static/icons/date.png";
  import arrowIcon from "../../static/icons/arrow-circle.png";
  import group_account from "../../static/icons/ac-group.png";
  import account from "../../static/icons/account.png";
  import notification from "../../static/icons/notification.png";
  import defected_device from "../../static/icons/defected-device.png";
  import active_device from "../../static/icons/ac-device.png";
  import clock from "../../static/icons/clock.png";
  import UserLocationChart from "../Charts/DashboardUserLocationChart";
  import UserStatusLineChart from "../Charts/UserStatusLineChart";
  import {mapGetters} from "vuex";
  import globallMixin from "../../mixins/globallMixin";

  export default {
    name: "UserDash",
    data() {
      return {
        loading: false,
        loadUserData: true,
        userLocationShow: false,
        date_icon,
        group_account,
        arrowIcon,
        account,
        notification,
        defected_device,
        active_device,
        clock,
        menu: false,
        date: [],
        convertToDate: {
          startDate: '',
          endDate: '',
        },
        userReport: {
          newUser: 0,
          moreUser: false,
          moreUserText: ''
        },
        deviceReport: {
          newDevice: 0,
          moreDevice: false,
          moreDeviceText: ''
        },
        activeUser: 0,
        readNotifications: 0,
        inActiveUser: 0,
        userLocationChartOpt: {
          tooltip: {
            // trigger: 'item'
            label: {
              show: false
            },
          },
          textStyle: {
            fontSize: '8px'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            top: '10%'
          },
          color: [
            '#2C3040', '#8C8E9B', '#C6C6C8', '#575A6A', '#6D7693'
          ],
          series: [
            {
              type: 'pie',
              radius: '70%',
              left: '10%',
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
            }
          ],
        },
        userStatusLineChartOpt: {
          title: {
            text: 'Status'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: [
            '#6D7693', '#C6C6C8',
          ],
          legend: {
            data: ['Active', 'Inactive']
          },
          grid: {
            left: '3%',
            right: '50%',
            bottom: '5%',
            top: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Aug3', 'Aug4', 'Aug5', 'Aug6', 'Aug7', 'Aug8', 'Aug9']
          },
          yAxis: {
            type: 'value'
          },

          series: [
            {
              name: 'Active',
              type: 'line',
              stack: '',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            },
            {
              name: 'Inactive',
              type: 'line',
              stack: '',
              data: [520, 1032, 420, 580, 680, 1000, 1720]
            },
          ]
        },
        userStatusLineChartOptLg: {
          title: {
            text: 'Status'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Active', 'Inactive']
          },
          color: [
            '#6D7693', '#C6C6C8',
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },

          series: [
            // {
            //   name: 'Active',
            //   type: 'line',
            //   stack: '',
            //   data: [820, 932, 901, 934, 1290, 1330, 1320]
            // },
            // {
            //   name: 'Inactive',
            //   type: 'line',
            //   stack: '',
            //   data: [520, 1032, 420, 580, 680, 1000, 1720]
            // },
          ]
        },
        compareUserData: {
          more: false,
          numberInPct: ''
        },
        compareReadNotificationData: {
          more: false,
          numberInPct: ''
        },
        compareInactiveUserData: {
          more: false,
          numberInPct: ''
        },
      }
    },
    mixins: [globallMixin],
    computed: {
      dateRangeText() {
        return this.date.join(' ~ ')
      },
      ...mapGetters({
        dashboardUserLocation: 'dashboard/getDashboardUserLocation',
        dashboardUserStatusChartDate: 'dashboard/getDashboardUserStatusChartDate',
        dashboardUserStatusChartSeries: 'dashboard/getDashboardUserStatusChartSeries',
        userMoreOrLess: 'dashboard/getUserMoreOrLess',
        readNotificationData: 'dashboard/getReadNotification',
        newUserData: 'dashboard/getNewUser',
        inActiveUserData: 'dashboard/getInActiveUser',
        activeUserData: 'dashboard/getActiveUser',
        compareNotification: 'dashboard/getCompareNotification',
        compareUser: 'dashboard/getCompareUser',
        compareInActiveUser: 'dashboard/getCompareInActiveUser',
        filteredData: 'dashboard/getFilteredDashboardData',
      }),
    },
    watch: {
      dashboardUserStatusChartDate: {
        handler(nv, ov) {
          if (this.dashboardUserStatusChartDate && this.dashboardUserStatusChartDate.length > 0) {
            this.userLocationChartOpt.series[0].data = JSON.parse(JSON.stringify(this.dashboardUserLocation))
            this.activeUser = this.activeUserData
            this.inActiveUser = this.inActiveUserData
            this.userReport.moreUserText = this.userMoreOrLess
            this.userReport.newUser = this.newUserData
            this.readNotifications = this.readNotificationData
            this.userStatusLineChartOptLg.xAxis.data = JSON.parse(JSON.stringify(this.dashboardUserStatusChartDate))
            this.userStatusLineChartOptLg.series = JSON.parse(JSON.stringify(this.dashboardUserStatusChartSeries))
            this.compareUserData = Object.assign({}, JSON.parse(JSON.stringify(this.compareUser)));
            this.compareInactiveUserData = Object.assign({}, JSON.parse(JSON.stringify(this.compareInActiveUser)))
            this.compareReadNotificationData = Object.assign({}, JSON.parse(JSON.stringify(this.compareNotification)))
            this.userLocationShow = true
            this.loadUserData = false
          } else {
            this.initChart()
          }
        },
        immediate: true,
        deep: true
      },
      // activeUserData: {
      //   handler(nv, ov) {
      //     if (nv !== ov) {
      //       this.loadUserData = true
      //       this.activeUser = this.activeUserData;
      //       this.inActiveUser = this.inActiveUserData
      //       this.readNotifications = this.readNotificationData
      //       this.compareUserData = Object.assign({}, JSON.parse(JSON.stringify(this.compareUser)));
      //       this.compareInactiveUserData = Object.assign({},JSON.parse(JSON.stringify(this.compareInActiveUser)))
      //       this.compareReadNotificationData = Object.assign({}, JSON.parse(JSON.stringify(this.compareNotification)))
      //     }
      //     this.loadUserData = false
      //   },
      //   immediate: true,
      //   deep: true
      // },
      filteredData: {
        handler(nv, ov) {
          if (this.filteredData && this.dashboardFilterMode) {
            this.setUserData(JSON.parse(JSON.stringify(this.filteredData)))
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
      initChart() {
        // this.$axios.get('portal-user-report')
        //   .then((response) => {
        //     this.userLocationChartOpt.series[0].data = JSON.parse(JSON.stringify(response.data.data.userLocationInfo))
        //     this.userLocationShow = true
        //
        //     this.activeUser = response.data.data.activeUser
        //     this.inActiveUser = response.data.data.inActiveUser
        //     this.userReport.moreUserText = response.data.data.userMoreOrLess
        //     this.deviceReport.moreDeviceText = response.data.data.deviceMoreOrLess
        //     this.userReport.newUser = response.data.data.newUser
        //     this.deviceReport.newDevice = response.data.data.newDevice
        //
        //     this.userStatusLineChartOptLg.xAxis.data = response.data.data.activeUserDateInfo
        //     this.userStatusLineChartOptLg.series = response.data.data.series
        //
        //   })
        //   .catch((error) => {
        //
        //   }).finally(() => {
        //
        // })
        this.loadUserData = true
        this.$store.dispatch('dashboard/initDashboardReport')
      },
      initWithDate() {
        this.dashboardFilterMode = true
        this.$refs.menu.save(this.date)
        if (this.date.length !== 2) {
          this.$toast.warning('Please select date range')
          return
        }
        this.$nextTick(() => {
          this.convertToDate.startDate = this.date[0];
          this.convertToDate.endDate = this.date[1];
          this.loadUserData = true
          this.$store.dispatch('dashboard/initFilteredData', this.convertToDate)
            .then((response) => {
              this.$nuxt.$emit('filterModeOn')
            })
            .finally(() => {
              this.loadUserData = false
            })
        })
      },
      refreshDashboard() {
        this.initChart()
        this.$store.dispatch('dashboard/initDashboardDeviceReport')
        this.date = []
      },
      setUserData(data) {
        this.loadUserData = true
        this.activeUser = data.activeUser;
        this.inActiveUser = data.inActiveUser
        this.readNotifications = data.readNotification
        this.compareUserData = Object.assign({}, data.compareUser);
        this.compareInactiveUserData = Object.assign({}, data.compareInActiveUser)
        this.compareReadNotificationData = Object.assign({}, data.compareNotification)

        this.$nextTick(() => {
          this.loadUserData = false
        })
      }
    },
    components: {
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
