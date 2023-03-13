<template>
  <div>
    <v-row>
      <v-col cols="7" class="pb-2">
        <TitleCard title="Orders"/>
      </v-col>
      <v-col cols="5" class="pb-2">
        <v-text-field
          rounded
          color="secondary"
          background-color="white"
          :placeholder="$t('Filter')"
          hide-details="auto"
          required
          single-line
          type="text"
          v-model="search"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row class="mt-2">
      <v-col>
        <v-btn rounded :outlined="activeBtn !== 1" class="text-capitalize" :class="activeBtn === 1 ? 'secondary' : ''"
               @click="getRecords(1)">
          All Orders
        </v-btn>
        <v-btn rounded :outlined="activeBtn !== 2" class="text-capitalize" :class="activeBtn === 2 ? 'secondary' : ''"
               @click="getRecords(2)">
          Active Orders
        </v-btn>
        <v-btn rounded :outlined="activeBtn !== 3" class="text-capitalize" :class="activeBtn === 3 ? 'secondary' : ''"
               @click="getRecords(3)">
          In Process
        </v-btn>
        <v-btn rounded :outlined="activeBtn !== 5" class="text-capitalize" :class="activeBtn === 5 ? 'secondary' : ''"
               @click="getRecords(5)">
          Pending
        </v-btn>
        <v-btn rounded :outlined="activeBtn !== 6" class="text-capitalize" :class="activeBtn === 6 ? 'secondary' : ''"
               @click="getRecords(6)">
          Delivered
        </v-btn>
        <v-btn rounded :outlined="activeBtn !== 4" class="text-capitalize" :class="activeBtn === 4 ? 'secondary' : ''"
               @click="getRecords(4)">
          Cancelled
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader
          v-if="loading"
          type="table"
        ></v-skeleton-loader>
        <v-data-table
          v-else
          :headers="headers"
          :items="items"
          item-key="name"
          class="elevation-1"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          align="center"
          :header-props="{ sortIcon: null }"
        >
          <template #item.payment_method="{item}">
            <span class="text-capitalize">
              {{ item.payment_method === 'cash_on_delivery' ? 'Cash On Delivery' : item.payment_method }}
            </span>
          </template>
          <template #item.date="{item}">
            <span>
              {{ formatTimeZone(item.created_at) }}
            </span>
          </template>

          <template #item.action="{item}">
<!--            <v-btn icon color="info" depressed @click="editItem(item)">-->
<!--              <v-img contain :src="editIcon" aspect-ratio="2"/>-->
<!--            </v-btn>-->
            <v-btn icon color="info" depressed @click="openDeleteItem(item)">
              <v-img contain :src="trashIcon" aspect-ratio="2"/>
            </v-btn>
          </template>

          <template #item.status="{item}">
            <v-btn x-small text rounded :class="setStatusColor(item.status)" class="text-capitalize white--text">
              {{ item.status }}
            </v-btn>
          </template>

          <template #item.details="{item}">
            <v-btn
              rounded
              small
              class="pa-2 btn_color text-capitalize white--text"
              @click="detailsItem(item)"
            >
              <v-list-item>
                      <span class="white--text px-0">See Details</span>
                <v-list-item-action class="pa-0 mx-0 pl-3">
                  <v-avatar size="16">
                    <v-icon color="white"
                    >mdi-arrow-right-thin-circle-outline
                    </v-icon
                    >
                  </v-avatar>
                </v-list-item-action>
              </v-list-item>
            </v-btn>
          </template>
        </v-data-table>
        <v-card class="pa-0 pb-5 mt-4" style="background-color: transparent" flat color="transparent">
          <v-row>
            <v-col cols="12" md="5" sm="12" class="">
         <span :class="bp.mdAndUp ? 'mr-4 grey--text' : 'mr-4 grey--text caption text-start'">
            {{ $t('Showing ') }} {{ items.length }} {{ $t('of') }} {{ totalCount }}
           <v-menu offset-y left>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                close-icon="mdi-delete"
                pill
                small
                dark
                v-bind="attrs" v-on="on"
                color="high"
              >
                {{ paginate }}
                <v-icon color="white" class="pl-2">mdi-menu-down</v-icon>
              </v-chip>
            </template>
            <v-list>
              <v-list-item
                v-for="(title, index) in itemsPerPageArray"
                :key="index"
                class="black--text small"
                selectable
              >
                <v-list-item-title class="black--text small" v-model="paginate"
                                   @click="setPagination(title)">{{ title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
           {{ $t('Rows per page') }}
          </span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="5" :align="bp.mdAndUp ? 'right' : 'left'">
          <span :class="bp.mdAndUp ? 'mr-4 grey--text' : 'mr-4 grey--text caption text-start'">
            {{ $t('Showing page') }} {{ page }} {{ $t('of') }} {{ totalPage }}
          </span>
              <v-chip
                close-icon="mdi-delete"
                class="rounded-br-0 rounded-tr-0"
                pill
                :small="bp.mdAndUp"
                :x-small="bp.smAndDown"
                color="white black--text"
                @click="gotoPreviousPage"
              >
                <v-icon color="black">mdi-chevron-left</v-icon>
              </v-chip>
              <v-chip
                close-icon="mdi-delete"
                class="rounded-l-0 rounded-r-0 px-4 mx-0"
                pill
                :small="bp.mdAndUp"
                :x-small="bp.smAndDown"
                dark
                color="white black--text"
              >
                {{ page }}
              </v-chip>
              <v-chip
                close-icon="mdi-delete"
                class="rounded-l-0 rounded-r-0 mx-0"
                :small="bp.mdAndUp"
                :x-small="bp.smAndDown"
                dark
                color="white black--text"
                @click="gotoNextPage"
              >
                <v-icon color="black">mdi-chevron-right</v-icon>
              </v-chip>
              <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    close-icon="mdi-delete"
                    class="rounded-bl-0 rounded-tl-0 mx-0"
                    pill
                    :small="bp.mdAndUp"
                    :x-small="bp.smAndDown"
                    dark
                    v-bind="attrs" v-on="on"
                    color="white black--text"
                  >
                    {{ paginate }}
                    <v-icon color="black" class="pl-2">mdi-menu-down</v-icon>
                  </v-chip>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(title, index) in itemsPerPageArray"
                    :key="index"
                    class="black--text small"
                  >
                    <v-list-item-title class="black--text small" v-model="paginate" @click="setPagination(title)">{{
                        title
                      }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import editIcon from "../../static/icons/editInfoColor.png";
import trashIcon from "../../static/icons/trashInfo.png";
import eyeIcon from "../../static/icons/eyeInfo.png";
import TitleCard from "../Common/TitleCard";

export default {
  name: "Order",
  components: {TitleCard},
  data() {
    return {
      loading: false,
      tab: null,
      search: '', editIcon, trashIcon, eyeIcon,
      btnLoading: false,
      loadingSaveData: false,
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      dialogView: false,
      itemsPerPageArray: [5, 10, 15, 20, 25, 50],
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      items: [],
      title: null,
      totalPage: 1,
      nextPageUrl: null,
      previousPageUrl: null,
      paginate: 15,
      currentPage: null,
      nextPage: null,
      prevPage: null,
      totalCount: 0,
      activeBtn: 1,
      status: null,
      active: null,
    }
  },
  computed: {
    headers() {
      return [
        {text: this.$t('Order Date'), value: 'date', class: 'accentlight', align: 'center'},
        {text: this.$t('User'), value: 'user.full_name', class: 'accentlight', align: 'center'},
        {text: this.$t('Payment Method'), value: 'payment_method', class: 'accentlight', align: 'center'},
        {text: this.$t('Payment Status'), value: 'payment_status', class: 'accentlight', align: 'center'},
        {
          text: this.$t('Order Status'),
          align: 'center',
          sortable: false,
          value: 'status',
          class: 'accentlight',

        },
        {
          text: 'Details',
          value: 'details',
          class: 'accentlight',
          align: 'center',
          sortable: false
        },
        {text: this.$t('Action'),
          sortable: false,
          value: 'action', class: 'accentlight', align: 'center'},
      ]
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Add New' : 'Edit'
    },
    searchQuery() {
      return this.status ? '&status=' + this.status : ''
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    setStatusColor(item) {
      switch (item) {
        case 'pending':
          return 'info darken-2'
        case 'delivered':
          return 'green darken-2'
        case 'processing':
          return 'pink darken-2'
        case 'cancelled':
          return 'red darken-2'
        default:
          return 'black'
      }
    },
    initialize() {
      this.loading = true
      this.$axios.get('order-info?page=' + this.page + '&paginate=' + this.paginate + this.searchQuery)
        .then((response) => {
          this.items = response.data.data.data
          this.nextPageUrl = response.data.data.next_page_url
          this.previousPageUrl = response.data.data.prev_page_url
          this.totalPage = response.data.data.total_page
          this.totalCount = response.data.data.total
          this.page = response.data.data.current_page
          this.nextPage = response.data.data.next_page
          this.prevPage = response.data.data.prev_page
          this.itemsPerPage = response.data.data.per_page
          if (this.prevPage === 0) {

          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.messages)
        })
        .finally(() => {
          this.loading = false
        })
    },
    detailsItem(item) {
      this.$router.push('/order/' + item.id)
    },
    openDeleteItem(item) {
    },

    /**
     * Pagination
     */
    gotoNextPage() {
      this.page = this.nextPage
      this.initialize()
    },
    gotoPreviousPage() {
      this.page = this.prevPage
      this.initialize()
    },
    setPagination(number) {
      this.paginate = number
      this.initialize()
    },
    getRecords(number) {
      if (number !== this.activeBtn) {
        this.activeBtn = number
        switch (number) {
          case 1:
            this.status = null
            break
          case 2:
            this.active = 1
            break
          case 3:
            this.status = 'processing'
            break
          case 4:
            this.status = 'cancelled'
            break
          case 5:
            this.status = 'pending'
            break
          case 6:
            this.status = 'delivered'
            break
        }
        this.initialize()
      }
    }
  }
}
</script>

<style scoped>

</style>
