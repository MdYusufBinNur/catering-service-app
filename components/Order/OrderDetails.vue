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
    <v-row>
      <v-col cols="12" class="transparent">
        <v-tabs class="mb-2 transparent" v-model="tab" active-class="secondary white--text" hide-slider >
          <v-tab class="text-capitalize" href="#user">User</v-tab>
          <v-tab class="text-capitalize" href="#schedule">Schedule</v-tab>
          <v-tab class="text-capitalize" href="#items">Items</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12">
        <v-tabs-items v-model="tab" light>
          <v-tab-item value="user">
            <UserInfo v-if="userInfoData && deliveryAddressData" :loading="loading" :address="deliveryAddressData" :data="userInfoData"/>
          </v-tab-item>
          <v-tab-item value="schedule">
            <ScheduleInfo v-if="scheduleInfo" :data="scheduleInfo" />
          </v-tab-item>
          <v-tab-item value="items">
            <ItemsInfo v-if="foodDetailsItem" :data="foodDetailsItem" />
          </v-tab-item>

        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TitleCard from "@/components/Common/TitleCard";
import UserInfo from "@/components/Order/Details/UserInfo";
import ScheduleInfo from "@/components/Order/Details/ScheduleInfo";
import ItemsInfo from "@/components/Order/Details/ItemsInfo";

export default {
  name: "OrderDetails",
  components: {ItemsInfo, ScheduleInfo, UserInfo, TitleCard},
  data() {
    return {
      tab: null,
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
      userInfoData : null,
      deliveryAddressData : null,
      scheduleInfo : null,
      detailsItem: null,
      foodDetailsItem: null,
    }
  },
  methods: {
    initialize() {
      this.loading = true
      this.$axios.get('order-info/' + this.$route.params.id)
        .then((response) => {
          this.detailsItem = Object.assign({}, response.data.data)
          this.userInfoData = Object.assign({}, this.detailsItem.user)
          this.deliveryAddressData = Object.assign({}, this.detailsItem.address)
          this.scheduleInfo = this.detailsItem.schedule
          this.foodDetailsItem = this.detailsItem.details
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
