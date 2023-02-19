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
        {title: 'Lab/Diagnostics', icon: 'mdi-flask-empty-outline', to: '/lab/test', items: null},
        {
          title: 'Location',
          path: null,
          icon: 'mdi-google-maps',
          items: [
            {title: 'District', icon: 'mdi-pencil', to: '/location'},
            {title: 'Sub District', icon: 'mdi-close', to: '/sub'},
          ]
        },
        {
          title: 'Service/Lab Test',
          path: null,
          icon: 'mdi-hospital',
          items: [
            {title: 'Diagnostics', icon: 'mdi-pencil', to: '/institute'},
            {title: 'Branch', icon: 'mdi-close', to: '/branch'},
          ]
        },

        {title: 'Package', icon: 'mdi-file-tree', to: '/package', items: null},
        {title: 'Phlebotomist', icon: 'mdi-account-convert-outline', to: '/phlebotomist', items: null},
        {
          title: 'Doctors',
          path: null,
          icon: 'mdi-hospital',
          items: [
            {title: 'Category', icon: 'mdi-flask-empty-outline', to: '/doctor-category'},
            {title: 'Doctors', icon: 'mdi-account-outline', to: '/doctors'},
          ]
        },
        {title: 'Medicine', icon: 'mdi-heart-pulse', to: '/medicine', items: null},
        {title: 'Test Report', icon: 'mdi-calendar', to: '', items: null},
        {
          title: 'Sales',
          path: null,
          icon: 'mdi-clock',
          items: [
            {title: 'Invoice', icon: 'mdi-pencil', to: ''},
            {title: 'Payment', icon: 'mdi-close', to: ''},
            {title: 'Report', icon: 'mdi-close', to: ''},
          ]
        },

        {title: 'Health Locker', icon: 'mdi-account', to: '', items: null},
        {title: 'SMS', icon: 'mdi-message-text-outline', to: '', items: null},
        {
          title: 'CMS',
          icon: 'mdi-clipboard-text',
          to: '',
          items: [
            {
              icon: 'mdi-view-dashboard-outline',
              title: 'Offer',
              to: '/gcare-offer',
            },
            {
              icon: 'mdi-account-convert-outline',
              title: 'Partner',
              to: '/gcare-partner',
            },
            {
              icon: 'mdi-file-tree',
              title: 'Slider',
              to: '/slider',
            },
            {
              icon: 'mdi-pencil-box-outline',
              title: 'Article',
              to: '/article',
            },
            {
              icon: 'mdi-source-branch',
              title: 'Why-Gcare',
              to: '/why-gcare',
            },
          ]
        },
        {title: 'User Management', icon: 'mdi-webpack', to: '/users', items: null},
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Orders',
          to: '/order',
        },
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
