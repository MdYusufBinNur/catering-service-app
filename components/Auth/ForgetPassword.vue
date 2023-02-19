<template>
  <div align="center" class="justify-center">
    <v-card class="text-center" outlined elevation="3" :width="$vuetify.breakpoint.smAndDown ? '500' : '600'"
    >

      <div>
        <v-row class="mb-5">
          <v-col class="col-sm-3"></v-col>
          <v-col class="col-sm-6 align-self-center">
            <v-img :src="logo" contain :aspect-ratio="bp.mdAndUp ? 4 : 2" class="mt-4 justify-center"></v-img>
          </v-col>
          <v-col class="col-sm-3 align-self-center">
            <LanguageSelect :auth-layout="true"/>
          </v-col>
        </v-row>
      </div>
      <span class="kep_title">
        {{ $t('Forget Password')}}
      </span>
      <div align="center">
        <v-card align="center" class="text-center" flat :width="$vuetify.breakpoint.smAndDown ? '400' : '450'">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>

            <v-card-text>
              <v-row class="justify-center">
                <v-col cols="10">
                  <v-text-field
                    v-model="userInfo.email"
                    rounded
                    color="secondary"
                    :rules="validationRules.email"
                    outlined
                    :placeholder="$t('Enter email address')"
                    hide-details="auto"
                    required
                    prepend-inner-icon="mdi-account-outline"
                    type="email"
                  >
                    <template v-slot:prepend-inner>
                      <v-img :src="account" width="15" class="mr-2">

                      </v-img>
                    </template>
                  </v-text-field>
                  <v-card-subtitle class="text-left">
                    {{ $t('Please give your email address to send the verification link')}}
                  </v-card-subtitle>
                </v-col>

              </v-row>
            </v-card-text>
            <v-card-actions class="text-center">
              <v-row class="justify-center">
                <v-col cols="10">
                  <v-btn
                    block
                    large
                    rounded
                    class="secondary mb-10"
                    :loading="isLoading"
                    @click="sendEmail"
                  >
                    {{ $t('Send')}}
                  </v-btn>
                </v-col>
              </v-row>

            </v-card-actions>
          </v-form>
        </v-card>
      </div>

    </v-card>
    <EmailSent :visible="emailSent" @close="emailSent=false"/>
  </div>
</template>
<script>
  import logo from 'static/logo.png'
  import uk from 'static/uk.png'
  import gm from 'static/gm.png'
  import EmailSent from "./EmailSent";
  import account from 'static/account.png'
  import LanguageSelect from "../Common/LanguageSelect";
  import validationMixin from "../../mixins/validationMixin";

  export default {
    components: {LanguageSelect, EmailSent},
    props: {
      isDialog: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      }
    },
    mounted() {
      this.$root.$on('resend', () => {
        // your code goes here
        this.sendEmail()
      })
    },
    mixins: [validationMixin],
    data: () => ({
      isLoading: false,
      valid: true,
      logo,
      account,
      uk,
      gm,
      showPassword: false,
      userInfo : {
        email: '',
        type: 'web'
      },
      password: '',
      emailSent: false,
      emailRules: [
        v => !!v || 'Email is required',
      ],

      passwordRules: [
        v => !!v || 'Password is required'
      ],

      isLoggedIn: false,
      snackbar: false,
      errorMessage: '',
      errorColor: '',
    }),

    computed: {},


    methods: {
      validate() {
        this.$refs.form.validate()
      },

      resetValidation() {
        this.$refs.form.resetValidation()
      },

      async sendEmail() {
        this.isLoading = true;
        this.emailSent = false;
        if (!this.$refs.form.validate()) {
          this.isLoading = false
          return;
        }
        try {
            await
              this.$axios.post('/forgot-password', this.userInfo, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept' : 'application/json',
                }
              })
                .then((response) => {
                  console.log(response.data)
                  if (response.data.error === false) {
                    this.emailSent = true
                    this.resetValidation()
                  }
                  if (response.data.error === true) {
                    return  this.$toast.error(response.data.message)
                  }
                  if (response.data.message && response.data.message === 'passwords.sent') {
                    this.emailSent = true
                    this.resetValidation()
                  }
                })
                .finally(() => {
                  this.isLoading = false
                })
                .catch(error => {
                  if (error.response.data.error === 'passwords.user') {
                   return  this.$toast.error('No user found !!')
                  }
                  if (error.response.data.error === 'passwords.throttled') {
                   return  this.$toast.error('Too many attempts. Please try again later !')
                  }
                  console.log('errorMessage', error.response.data.error);
                });
        } catch (err) {
          console.log(err)
        }

      }
    }
  }
</script>
