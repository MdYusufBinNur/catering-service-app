<template>
  <v-app style="background: linear-gradient( to bottom, #E5E5E5 0%, #E5E5E5 50%, #E5E5E5 50%, #E5E5E5 100% )">
<!--  <v-app>-->
    <v-main >
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
          <v-flex>
            <Nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    head() {
      return  {
        title: 'G-Care',
        link: [
          {
            rel: 'icon',
            type: 'image/png',
            href: this.fav,
          },
        ],
      }
    },
    name: 'auth',
    data() {
      return {
        fav: '/favicon.png'
      }
    },
    created() {
      //this.initFav()
    },
    methods: {
      initFav() {
        this.$axios.get('setting')
          .then((response) => {
            this.fav = this.propertyURL + response.data.data.settings.favicon
          })
      }
    }
  }
</script>
<style>
  html {
    font-family: "Poppins",serif;
  }
</style>
