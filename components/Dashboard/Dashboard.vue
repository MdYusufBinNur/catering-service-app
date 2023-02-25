<template>
  <v-container fluid fill-height class="pa-0">
    <v-row no-gutters align="center">
      <v-col cols="12" class="pb-2">
        <title-card title="dashboard" />
        <v-divider></v-divider
        >
      </v-col>

      <v-col>
        <v-card class="transparent" flat tile>
          <span class="ppns_title_3 pl-1">
            {{ $t('Statistics') }}
          </span>
        </v-card>
      </v-col>
      <v-col md="auto" align="right" class="px-1">
        <v-card class="py-2 transparent" flat tile>
          <v-chip color="active2 white--text" small dark class="px-7">
            <span class="caption"> {{ $t('last 30 day') }}</span>
          </v-chip>
        </v-card>
      </v-col>
      <v-col md="auto" align="right">
        <v-card class="transparent py-2" flat tile>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-chip
                small
                color="tab_active2"
                v-bind="attrs"
                class="px-2"
                v-on="on"
              >
                <v-icon small class="px-3"> mdi-calendar </v-icon>
                <span class="caption">{{
                    $t('select date from calender')
                  }}</span>
              </v-chip>
            </template>
            <v-date-picker v-model="date" no-title range scrollable>
              <v-spacer />
              <v-btn text color="primary" @click="close">
                {{ $t('close') }}
              </v-btn>
              <v-btn text color="primary" @click="close">
                {{ $t('save') }}
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="pa-2">
      <v-col
        cols="12"
        md="6"
        sm="12"
        lg="6"
        class="pr-2"
        :style="bp.mdAndUp ? 'height: 400px' : ''"
      >
        <v-layout row wrap>
<!--          <v-flex xs12 sm6 md5 lg5 class="rounded mt-3 px-1">-->
<!--            <v-skeleton-loader-->
<!--              v-if="loading"-->
<!--              class="pa-5 px-2 py-3"-->
<!--              type="card"-->
<!--            ></v-skeleton-loader>-->
<!--            <pie-chart-component-->
<!--              chart-title="Doctors and Users"-->
<!--              chart-sub-title="all"-->
<!--              chart-desc="Doctors and Users"-->
<!--              :chart-data="marriedCompData"-->
<!--              property-id="dashMarriedStatChart"-->
<!--              class-name="dashboardWeddingChart"-->
<!--            />-->
<!--          </v-flex>-->
          <v-flex xs12 sm6 md12 lg12 class="px-1 py-3">
            <v-card flat class="mb-2 transparent radius">
              <v-skeleton-loader
                v-if="loading || !show"
                class="pa-5 px-2 py-6"
                type="card"
                :title="false"
              ></v-skeleton-loader>
              <bar-chart-component
                v-else
                chart-title="Registrations per month"
                chart-desc="Registrations"
                property-id="dashboardAccChart"
                :axis-data="regBarAxis"
                :chart-data="regBarData"
                class-name="dashboardBarChart"
              />
            </v-card>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="12"
        lg="3"
        v-if="show"
        :class="bp.mdAndUp ? 'pl-5' : 'mt-9'"
        :style="bp.mdAndUp ? 'height: 400px; margin-top: 12px' : ''"
      >
        <v-layout row wrap>
          <v-flex>
            <v-card height="378px" flat class="radius justify-center pa-0">
              <v-row class="pt-0">
                <v-col cols="12" md="12" sm="12" class="pt-0">
                  <v-btn depressed right x-small rounded class="mt-5 px-5 ml-2">
                    {{ $t('last 30 day') }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-container
                bg
                text-xs-center
                text-lg-center
                text-md-center
                class="mt-5"
              >
                <v-card-title class="justify-center text-center">
                  <span class="text-h1 text-xs-center">

                  </span>
                </v-card-title>

                <v-card-subtitle
                  class="text-center justify-center pp-body-reg-1"
                  align="center"
                >
                  {{ $t('new user added') }}
                </v-card-subtitle>
                <v-card-subtitle
                  class="text-center justify-center pp-body-reg-1"
                  align="center"
                >
                  {{ $t('view details here') }}
                </v-card-subtitle>
                <v-spacer />
                <v-card-actions class="justify-center align-self-end mt-2">
                  <v-btn
                    rounded
                    class="pa-2 mt-8 btn_color text-capitalize white--text"
                    :to="localePath('/stats')"
                  >
                    <v-list-item>
                      <span class="white--text px-0">{{
                          $t('view statistics')
                        }}</span>
                      <v-list-item-action class="pa-0 mx-0 pl-3">
                        <v-avatar size="18">
                          <v-icon color="white"
                          >mdi-arrow-right-thin-circle-outline</v-icon
                          >
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
import TitleCard from '../Common/TitleCard.vue'
import PieChartComponent from '../Statistics/ChartComponent/PieChartComponent.vue'
import BarChartComponent from '../Statistics/ChartComponent/BarChartComponent.vue'
import {mapGetters} from "vuex";

export default {
  name: 'UserDash',
  components: {
    TitleCard,
    PieChartComponent,
    BarChartComponent,
  },
  data() {
    return {
      loading: false,
      date: null,
      menu: false,
      weddingNumbers: [
        {
          index: 0,
          text: ' User',
          type: 'user',
          value: 0,
          icon: 'mdi-account'
        },
        {
          index: 1,
          text: ' Doctors',
          type: 'doctor',
          value: 0,
          icon: 'mdi-account-star'
        },
        {
          index: 2,
          text: ' Phlebotomist',
          type: 'phlebotomist',
          value: 0,
          icon: 'mdi-run'
        },
        {
          index: 3,
          text: 'Lab',
          type: 'labs',
          value: 0,
          icon: 'mdi-trending-up'
        },

      ],
      marriedCompData: [
        { value: 6000, name: 'Married' },
        { value: 12000, name: 'Un-Married' },
      ],
      regBarData: [
        {
          name: 'Registrations Per Month',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 15,
          label: {
            show: false,
          },
          emphasis: {
            focus: 'series',
          },
          data: [200, 258, 101, 134, 152, 120, 210, 520, 124, 650, 215],
        },
      ],
      regBarAxis: [
        'Dec 21',
        'Jan 22',
        'Feb 22',
        'March 22',
        'April 22',
        'May 22',
        'June 22',
        'July 22',
        'August 22',
        'September 22',
        'October 22',
      ],
      show: false,
      data: {
        user: 0,
        user_30: 0,
        phlebotomist: 0,
        doctor: 0,
        labs: 0,
        months: [],
        monthsBaseUser: [],

      }
    }
  },
  computed: {
    ...mapGetters({
     // dashboardData : 'cms/getDashboardData'
    })
  },
  watch: {
  },
  created() {

  },
  methods: {
    close() {
      this.menu = false
    },
    initChart() {
      this.loadUserData = false
      // this.$store.dispatch('dashboard/initDashboardReport')
    },
    initialize() {
      this.loading = true
      // this.$store.dispatch('cms/initDashboardStatistics')
      //   .catch((error) => {
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
    getValue(type) {
      this.setBarChartData()
      switch (type){
        case 'user':
          return this.data.user
        case 'doctor':
          return this.data.doctor
        case 'phlebotomist':
          return this.data.phlebotomist
        case 'labs':
          return this.data.labs
        case 'new_user':
          return this.data.user_30
      }
    },
    setBarChartData()
    {
      this.regBarAxis = this.data.months
      this.regBarData[0].data = this.data.monthsBaseUser
      this.show = true
    }
  },
}
</script>

<style scoped>
.radius {
  border-radius: 7px;
}

</style>
