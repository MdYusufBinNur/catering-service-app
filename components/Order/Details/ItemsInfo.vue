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
      <template #item.discount="{item}">
        {{ item.item ? item.item.discount : '-' }}
      </template>
      <template #item.item_name="{item}">
        {{ item.item ? item.item.item_name : '-' }}
      </template>
      <template #item.item_price="{item}">
        {{ item.item ? item.item.item_price : '-' }}
      </template>
      <template #item.discount_type="{item}">
        <v-btn x-small text rounded :class="setStatusColor(item.status)" class="text-capitalize white--text">
          {{ item.item ? item.item.discount_type : '-' }}
        </v-btn>
      </template>


      <template #item.image="{item}">
        <v-img :src="item.item.item_image" contain max-width="80" max-height="80"/>
      </template>

    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "ItemsInfo",
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
        {text: this.$t('Item Name'), value: 'item_name', class: 'accentlight', align: 'center'},
        {text: this.$t('Item Price'), value: 'item_price', class: 'accentlight', align: 'center'},
        {text: this.$t('Discount'), value: 'discount', class: 'accentlight', align: 'center'},
        {text: this.$t('Discount Type'), value: 'discount_type', class: 'accentlight', align: 'center'},
        {text: this.$t('Image'), value: 'image', class: 'accentlight', align: 'center'},
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
