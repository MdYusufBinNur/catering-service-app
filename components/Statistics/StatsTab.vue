<template>
  <v-container fluid class="pa-0">
    <title-card title="stats_report" />
    <v-row no-gutters align="center">
      <v-col>
        <v-divider class="pa-0" />
        <v-card class="transparent" flat tile>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="high"
            class="mb-2 mt-2"
            show-arrows
            hide-slider
          >
            <v-tab
              v-for="item in items"
              :key="item.id"
              class="text-capitalize radius"
              active-class="tab_active"
            >
              {{ $t(item.tab) }}
            </v-tab>
          </v-tabs>
        </v-card>
        <v-divider class="pa-0 pb-5" />
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <v-col>
        <v-tabs-items v-model="tab" style="background-color: transparent">

        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TitleCard from '../Common/TitleCard.vue'
// import CoupleStats from './TabContents/CoupleStats.vue'
// import WeddingStats from './TabContents/WeddingStats.vue'
// import GuestStats from './TabContents/GuestStats.vue'
// import TaskStats from './TabContents/TaskStats.vue'

export default {
  name: 'StatsTab',
  components: { TitleCard, },
  data: () => ({
    loading: false,
    tab: null,
    items: [
      {
        id: 0,
        tab: 'couple',
      },
      {
        id: 1,
        tab: 'weddings',
      },
      {
        id: 2,
        tab: 'guests',
      },
      {
        id: 3,
        tab: 'tasks',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped></style>
