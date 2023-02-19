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
            <LanguageSelect :auth-layout="true" />
          </v-col>
        </v-row>
      </div>
      <span class="kep_title">
        {{ $t('Give email address')}}
      </span>
      <div align="center">
        <v-card align="center" class="text-center" flat :width="$vuetify.breakpoint.smAndDown ? '400' : '450'">
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-row class="justify-center">
                <v-col cols="10">
                  <v-text-field
                    v-model="email"
                    rounded
                    color="secondary"
                    :rules="emailRules"
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
            </v-form>
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
                  @click.stop="emailSent=true"
                >
                  {{ $t('Send')}}
                </v-btn>
              </v-col>
            </v-row>

          </v-card-actions>
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
    data: () => ({
      isLoading: false,
      valid: true,
      logo,
      account,
      uk,
      gm,
      showPassword: false,
      email: '',
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

      goToSourceDestination() {
        if (this.isDialog) {
          this.$emit('closeAuthentication')
        } else {
          this.$router.push('/dashboard')
        }
      },

      login() {
        this.isLoading = true
        if (!this.$refs.form.validate()) {
          this.errorMessage = 'Please input valid data'
          this.errorColor = 'error'
          this.snackbar = true
          this.isLoading = false
        } else {
          this.resetValidation()
          this.$store.dispatch('auth/postLogin', this.loginInfo)
            .then((response) => {
              if (response.data.error) {
                this.$toast.error(response.data.message);
                // this.errorMessage = response.data.message
                // this.errorColor = 'error'
                // this.snackbar = true
                return;
              }
              this.goToSourceDestination()
            })
            .catch((error) => {
              this.errorMessage = error.response.data.message
              this.errorColor = 'error'
              this.snackbar = true
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      },

      checkAuth(next, path) {
        console.log(next)
        // only admin-group has the access to any property without association
        if (this.authToken !== null) {
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/login');
        }
      },

      forgetPassword() {
        return this.$router.push('/forget-password')
      }
    }
  }
</script>
