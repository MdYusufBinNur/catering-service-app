<template>
  <v-card align="center" flat class="text-center" style="background-color: transparent">
    <div>
      <v-row>
        <v-col class="col-sm-2"></v-col>
        <v-col class="col-sm-8 align-self-center">
          <v-img :src="page404" contain :aspect-ratio="bp.mdAndUp ? 5 : 2" class="mt-4 justify-center"></v-img>
        </v-col>
      </v-row>
    </div>
    <span class="text-lg-h1 text-primary">404</span>
    <div>
         <span class="mt-10 mb-10  text--disabled" v-if="pageNotFound">
           {{ $t('Page Not Found')}}
         </span>
      <span class="mt-10 mb-10  text--disabled" v-else>
          {{ $t('Something went wrong')}}
        </span>
    </div>
    <div align="center">
      <v-card
        class="mx-auto pa-2"
        flat
        style="background-color: transparent"
      >
        <v-card-title>
          <v-spacer/>
          <nuxt-link :to="localePath('/')" style="color: #0cc0d4; text-decoration: none">
              <span class="pp-cation-reg">
                {{ $t(' << Go back')}}
              </span>
          </nuxt-link>
          <v-spacer/>
        </v-card-title>
      </v-card>
    </div>
  </v-card>
</template>

<script>
  import er404 from '../../static/support.png'
  import logo from 'static/logo.png'
  import page404 from 'static/icons/page404.png'

  export default {
    props: {
      pageNotFound:
        {
          type: Boolean,
          default: false
        }
    },
    data: () => ({
      reveal: false,
      er404,
      logo,
      page404
    })
  }
</script>

<style scoped>
  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
  }
</style>
