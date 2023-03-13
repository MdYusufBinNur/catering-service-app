<template>
  <v-app dark>
    <Nav/>
    <NavSidebar/>

    <v-main style="background-color: #EDEFF3">
      <v-container fluid class="pa-5">
        <Nuxt/>
      </v-container>
    </v-main>
    <!--    <v-footer-->
    <!--      :absolute="!fixed"-->
    <!--      app-->
    <!--    >-->
    <!--      <span>&copy; {{ new Date().getFullYear() }}</span>-->
    <!--    </v-footer>-->
  </v-app>
</template>

<script>
import Nav from "../components/Common/Nav";
import dashboardIcon from 'static/icons/dashboard.png'
import userIcon from 'static/icons/user.png'
import deviceIcon from 'static/icons/devices.png'
import staffIcon from 'static/icons/staff.png'
import settingsIcon from 'static/icons/settings.png'
import translationIcon from 'static/icons/translation.png'
import reportIcon from 'static/icons/report.png'
import communicationLogIcon from 'static/icons/communication_log.png'
import cmsIcon from 'static/icons/cms.png'
import {mapGetters} from "vuex";
import NavSidebar from "../components/Common/NavSidebar";


export default {
  head() {
    return {
      // link: [
      //   {
      //     rel: 'icon',
      //     type: 'image/png',
      //     href: this.fav,
      //   },
      // ],
    }
  },
  name: 'default',
  components: {NavSidebar, Nav},
  middleware: ['auth'],
  data() {
    return {
      fixed: true,
      items: [
        {
          icon: dashboardIcon,
          title: 'Dashboard',
          to: '/dashboard',
          parent: 'Dashboard'
        },
        {
          icon: userIcon,
          title: 'User',
          to: '/users',
          parent: 'User'
        },
        {
          icon: userIcon,
          title: 'User',
          to: '/users',
          parent: 'User'
        },

      ],
      testItems: [],
      miniVariant: false,
      right: true,
      drawer: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      fav: '/favicon.png',
      mergedItems: [
        {
          icon: dashboardIcon,
          title: 'Dashboard',
          to: '/dashboard',
          parent: 'Dashboard'
        },
      ],
      listLoader: false
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.initFav()
  },
  methods: {
    initFav() {
      this.$axios.get('settings')
        .then((response) => {
          if (response.data.data.settings) {
            this.fav = this.propertyURL + response.data.data.settings.favicon
          }
        })
    },
  }
}
</script>

<style>
html {
  font-family: "Poppins", serif;
}
</style>
