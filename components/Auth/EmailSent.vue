<template>
  <v-dialog v-model="show" max-width="700px" persistent >
    <v-card align="center">
      <v-system-bar
        color="transparent"
      >
        <v-spacer></v-spacer>
        <v-btn fab x-small elevation="8" class="badge" style="margin-top: 20px" @click="show = false">
          <v-icon  align="center" class="justify-center" >mdi-close</v-icon>
        </v-btn>

      </v-system-bar>
      <v-card-actions >
        <v-img :src="email" contain aspect-ratio="9" style="margin-top: 10px"/>
      </v-card-actions>
      <span class="text-center justify-center kep_title">
        {{ $t('We have sent an email')}}
      </span>
      <v-card-text class="text-center px-15">
        {{ $t('A verification link has been send to your given email address. Please check your email Inbox or Spam folder.')}}
      </v-card-text>

      <v-card-text class="text-center">
        <p>
          <span class="font-italic">{{ $t("Didn't get the link ?")}} </span> <span @click="resendEmail" style="color: #5d94ff; text-decoration: none"> {{ $t('Resend email')}}</span>
        </p>
      </v-card-text>
      <v-card-actions class="justify-center pb-10" style="margin-top: -15px">
        <v-btn color="blue" class="px-5" outlined rounded  @click.stop="backToLogin()" >{{ $t('Back to log in')}}</v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>
</template>

<script>
  import email from '../../static/email.png'
  export default {
    props: ['visible'],
    computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
          if (!value) {
            this.$emit('close')
          }
        }
      }
    },
    data () {
      return {
        email,
      }
    },
    methods: {
      backToLogin()
      {
        this.show = false
        this.$router.push('/auth')
      },
      resendEmail() {
        this.$root.$emit('resend')
      }
    }
  }
</script>
<style>

</style>
