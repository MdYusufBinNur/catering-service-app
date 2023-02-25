<template>
  <v-navigation-drawer v-model="drawer" fixed app overlay-color="green">
    <v-list-item
      class="pa-5 pb-1"
      :to="localePath('/dashboard')"
      active-class="white"
      color="white"
    >
      <v-list-item-title class="text-md-h5 black--text">
        G-Care Admin
      </v-list-item-title>
    </v-list-item>
    <v-list rounded dense>
      <NavigationItems
        v-for="(item, i) in navItems"
        :items="item.items"
        :title="item.title"
        :path="item.to"
        :prepend-icon="item.icon"
        :key="i"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import NavigationItems from "@/components/Common/NavigationItems";

export default {
  name: 'NavSidebar',
  components: {
    NavigationItems,
  },

  data() {
    return {
      drawer: true,
      navItems: [
        {title: 'Dashboard', icon: 'mdi-home', to: '/dashboard', items: null},
        {title: 'Category', icon: 'mdi-flask-empty-outline', to: '/categories', items: null},
        {
          title: 'Order',
          path: null,
          icon: 'mdi-google-maps',
          items: [
            {title: 'All', icon: 'mdi-pencil', to: '/'},
            {title: 'Pending', icon: 'mdi-close', to: '/'},
            {title: 'Cancelled', icon: 'mdi-close', to: '/'},
          ]
        }
      ]
    }
  },
  mounted() {
    this.$root.$on('openDrawer', () => {
      this.showDrawer()
    })
  },
  methods: {
    showDrawer() {
      this.drawer = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
