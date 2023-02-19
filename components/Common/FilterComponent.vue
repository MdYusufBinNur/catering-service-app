<template>
  <div>
    <v-form ref="form">
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="2" lg="2" class="mt-3 pa-1">
          <v-text-field
            rounded
            hide-details="auto"
            class="white caption"
            placeholder="Search"
            v-model="filterData.name"
            solo
            flat
          >
            <template v-slot:append>
              <v-icon small right>
                mdi-magnify
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" class="mt-3 pa-1">
          <v-autocomplete
            :items="locations"
            item-text="country"
            :placeholder="$t('Select location')"
            item-value="country"
            rounded
            hide-details="auto"
            class="white caption"
            solo
            flat
            v-model="filterData.location"
            clearable
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" class="mt-3 pa-1">
          <v-autocomplete
            :items="status"
            item-text="name"
            :placeholder="$t('Select status')"
            item-value="id"
            rounded
            solo
            flat
            hide-details="auto"
            class="caption white"
            style=""
            v-model="filterData.status"
            clearable
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" class="mt-3 pa-1">
          <v-autocomplete
            :items="action"
            item-text="name"
            :placeholder="$t('Select action')"
            item-value="id"
            rounded

            flat
            solo
            hide-details="auto"
            class="caption white"
            style=""
            v-model="filterData.action"
            clearable
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" class="mt-3 pa-1">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                rounded

                hide-details
                :placeholder="$t('From')"
                class="white caption"
                v-model="filterData.from"
                v-bind="attrs"
                v-on="on"
                flat
                solo
              >
                <template v-slot:append>
                  <v-img :src="date_icon" width="12">

                  </v-img>
                </template>
                <template v-slot:prepend-inner>
                  <v-icon x-small @click="clearFilterDate">
                    {{ filterData.from ? 'mdi-close-circle' : ''}}
                  </v-icon>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="filterData.from"
              header-color="active2"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="2" lg="2" class="mt-3 pa-1">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            min-width="auto"
            offset-y
            transition="scale-transition"
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                rounded
                :placeholder="$t('To')"
                flat
                solo
                hide-details
                class="white caption"
                v-bind="attrs"
                v-on="on"
                v-model="filterData.to"
              >
                <template v-slot:append>
                  <v-img :src="date_icon" width="12">

                  </v-img>
                </template>
                <template v-slot:prepend-inner>
                  <v-icon x-small @click="clearLastActiveDate">
                    {{ filterData.to ? 'mdi-close-circle' : ''}}
                  </v-icon>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="filterData.to"
              @input="menu1 = false"
              header-color="active2"

            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" align="right" class="pt-5 mb-2">
          <v-btn outlined class="px-7" rounded depressed :loading="clearFilterBtnLoading"
                 @click="clearFilter">
            {{ $t('Clear filter')}}
          </v-btn>
          <v-btn class="btn_color px-10" dark :loading="filterBtnLoading" rounded depressed
                 @click="filterDataItems">
            {{ $t('Apply filter')}}
          </v-btn>

        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
  import editIcon from "../../static/icons/editInfoColor.png";
  import trashIcon from "../../static/icons/trashInfo.png";
  import eyeIcon from "../../static/icons/eyeInfo.png";
  import date_icon from "../../static/icons/date.png";
  import globallMixin from "../../mixins/globallMixin";

  export default {
    name: "FilterComponent",
    props: {
      staff: {
        type: Boolean,
        default: false
      },
      device: {
        type: Boolean,
        default: false
      },
      user: {
        type: Boolean,
        default: false
      },
      locations: {
        type: Array,
        default: null,
        required: false
      },
    },
    data() {
      return {
        menu: false,
        menu2: false,
        menu1: false,
        filterDate: '',
        filterLastActiveDate: '',
        date: [],
        filterBtnLoading: false,
        clearFilterBtnLoading: false,
        search: '',
        editIcon, trashIcon, eyeIcon, date_icon,
        purpose: [
          {
            id: 1,
            name: 'Welcome'
          }
        ],
        status: [
          {
            id: 1,
            name: 'Active'
          },
          {
            id: 2,
            name: 'Inactive'
          }
        ],
        action: [
          {
            id: 1,
            name: 'Enable'
          },
          {
            id: 2,
            name: 'Disable'
          }
        ],
        filterData: {
          name: '',
          location: '',
          status: '',
          action: '',
          from: '',
          to: ''
        }

      }
    },
    mixins: [globallMixin],
    methods: {
      clearFilterDate() {
        this.filterDate = ''
        this.filterData.from = ''
      },
      clearLastActiveDate() {
        this.filterLastActiveDate = ''
        this.filterData.to = ''
      },
      filterDataItems() {
        if (this.staff) {
          this.$store.commit('staff/setFilteredStaffs', [])
          this.filterBtnLoading = true
          this.$store.dispatch('staff/filterStaff', this.filterData)
            .then((response) => {
              this.$nuxt.$emit('filterStaffData')
            })
            .finally(() => {
              this.filterBtnLoading = false
            })
        }
        if (this.device) {
          this.$store.commit('device/setFilteredDevice', [])
          this.filterBtnLoading = true
          this.$store.dispatch('device/filterDevice', this.filterData)
            .then((response) => {
              this.$nuxt.$emit('filterDeviceData')
            })
            .finally(() => {
              this.filterBtnLoading = false
            })
        }
        if (this.user) {
          this.$store.commit('user/setFilteredUsers', [])
          this.filterBtnLoading = true
          this.$store.dispatch('user/filterUser', this.filterData)
            .then(() => {
              this.$nuxt.$emit('filterUserData')
            })
            .finally(() => {
              this.filterBtnLoading = false
            })
        }
      },
      clearFilter() {
        this.$nuxt.$emit('clearFilterMode')
        // this.clearFilterBtnLoading = true;
        // if (this.staff) {
        //     this.$store
        //         .dispatch('staff/initItems')
        //         .finally(() => {
        //             this.clearFilterBtnLoading = false;
        //         })
        // }
        // if (this.user) {
        //     this.$store
        //         .dispatch('user/initItems')
        //         .finally(() => {
        //             this.clearFilterBtnLoading = false;
        //         })
        // }
        // if (this.device) {
        //     this.$store
        //         .dispatch('device/initItems')
        //         .finally(() => {
        //             this.clearFilterBtnLoading = false;
        //         })
        // }
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>

</style>
