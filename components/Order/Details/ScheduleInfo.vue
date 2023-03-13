<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      item-key="name"
      class="elevation-1"

      align="center"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
    >
      <template #item.status="{item}">
        <v-btn x-small text rounded :class="setStatusColor(item.status)" class="text-capitalize white--text">
          {{ item.status }}
        </v-btn>
      </template>
      <template #item.date="{item}">
            <span>
              {{ formatTimeZone(item.date) }}
            </span>
      </template>


      <template #item.rider="{item}">
        {{ item.rider ? item.rider.full_name : 'Not Assigned'}}
      </template>

    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "ScheduleInfo",
  props: {
    data: {
      required: true,
      type: Array
    },
  },
  data() {
    return {
      itemsPerPageArray: [5, 10, 15, 20, 25, 50],
      filter: {},
      categories: [],
      sortDesc: false,
      page: 1,
      search: '',
      itemsPerPage: 10,
    }
  },
  computed: {
    headers() {
      return [
        {text: this.$t('ID'), value: 'id', class: 'accentlight', align: 'center'},
        {text: this.$t('Delivery Date'), value: 'date', class: 'accentlight', align: 'center'},
        {text: this.$t('Delivery Time'), value: 'date', class: 'accentlight', align: 'center'},
        {text: this.$t('Status'), value: 'status', class: 'accentlight', align: 'center'},
        {text: this.$t('Rider'), value: 'rider', class: 'accentlight', align: 'center'},
        {
          text: this.$t('Action'),
          sortable: false,
          value: 'action', class: 'accentlight', align: 'center'
        },
      ]
    },
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
  }
}
</script>

<style scoped>

</style>
