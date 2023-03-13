<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-2">
        <TitleCard title="Order Details"/>
        <v-breadcrumbs :items="breadcrumbItems" class="pa-0 mb-2">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <v-divider/>

      </v-col>
    </v-row>

  </div>
</template>

<script>
import TitleCard from "@/components/Common/TitleCard";

export default {
  name: "OrderDetails",
  components: {TitleCard},
  data() {
    return {
      breadcrumbItems: [
        {
          text: 'order',
          disabled: false,
          to: '/order',
        },
        {
          text: 'details',
          disabled: false,
          to: '',
        },
      ],
      details: null,
      loading: false,
      detailsItem: {}
    }
  },
  methods: {
    initialize() {
      this.loading = true
      this.$axios.get('order-info/' + this.$route.params.id)
        .then((response) => {
          console.log(response.data.data)
          this.detailsItem = Object.assign({}, response.data.data)
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  created() {
    this.initialize()
  }
}
</script>

<style scoped>

</style>
