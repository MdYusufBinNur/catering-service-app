<template>
  <div align="center" class="justify-center">
    <v-card class="text-center" outlined elevation="3" :width="$vuetify.breakpoint.smAndDown ? '400' : '600'"
    >
      <div>
        <v-row class="mb-5">
          <v-col class="col-sm-3"></v-col>
          <v-col class="col-sm-6 align-self-center">
            <v-img :src="logo" contain :aspect-ratio="bp.mdAndUp ? 5 : 2" class="mt-4 justify-center"></v-img>
          </v-col>
          <v-col class="col-sm-3 align-self-center">

            <LanguageSelect :auth-layout="true"/>
          </v-col>
        </v-row>
      </div>
      <span class="kep_title">
       {{ $t(title) }}
      </span>
      <div align="center">
        <v-card align="center" class="text-center" flat :width="$vuetify.breakpoint.smAndDown ? '400' : '500'">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation>
            <v-card-text>

              <v-row class="justify-center">
                <v-col cols="10">
                  <v-text-field
                    v-model="password"
                    outlined
                    rounded
                    color="secondary"
                    :rules="validationRules.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    placeholder="Enter new password"
                    :type="showPassword ? 'text' : 'password'"
                    hide-details="auto"
                    required
                    @click:append="showPassword = !showPassword"
                    prepend-inner-icon="mdi-lock-outline"
                  >
                    <template v-slot:prepend-inner>
                      <v-img :src="lock" width="20" class="mr-2">

                      </v-img>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                    v-model="dataInfo.confirm_password"
                    outlined
                    rounded
                    color="secondary"
                    :rules="validationRules.confirmPassword"
                    :append-icon="confirmPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    placeholder="Confirm new password"
                    :type="confirmPasswordShow ? 'text' : 'password'"
                    hide-details="auto"
                    required
                    @click:append="confirmPasswordShow = !confirmPasswordShow"
                    prepend-inner-icon="mdi-lock-outline"
                  >
                    <template v-slot:prepend-inner>
                      <v-img :src="lock" width="20" class="mr-2">

                      </v-img>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="10" align="start" class="pa-0 pl-3">
                  <v-list-item>
                    <v-list-item-action class="mr-2  ml-0">
                      <v-checkbox color="secondary" class="ml-0"></v-checkbox>
                    </v-list-item-action>
                    <p style="margin-top: 15px">
                      {{ $t('Log me out from all other device')}}
                    </p>
                  </v-list-item>
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
                    @click="changePassword"
                  >
                    {{ $t('Change to new password')}}
                  </v-btn>
                </v-col>
              </v-row>

            </v-card-actions>

          </v-form>
        </v-card>
      </div>

    </v-card>
  </div>
</template>
<script>
  import logo from 'static/logo.png'
  import LanguageSelect from "../Common/LanguageSelect";
  import lock from 'static/lock.png'
  import validationMixin from "../../mixins/validationMixin";

  export default {
    components: {LanguageSelect},
    mixins: [validationMixin],
    props: {
      isDialog: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      },
      title: {
        type: String,
        required: false,
        default() {
          return "Change Password"
        }
      }
    },
    data: () => ({
      isLoading: false,
      valid: true,
      logo,
      lock,
      showPassword: false,
      confirmPasswordShow: false,
      email: '',
      confirm_password: '',
      password: '',

      isLoggedIn: false,
      snackbar: false,
      errorMessage: '',
      errorColor: '',
      dataInfo: {
        email: '',
        code: '',
        password: '',
        confirm_password: ''
      },
      end_point: ''
    }),

    computed: {},


    methods: {
      validate() {
        return this.$refs.form.validate()
      },

      resetValidation() {
        this.$refs.form.resetValidation()
      },

      changePassword() {
        if (this.title === 'Change Password')
          this.end_point = 'update-password';
        else
          this.end_point = 'reset-password';

        if (!this.validate()) {
          return;
        }
        this.isLoading = true;
        this.dataInfo.email = this.$route.query.email
        this.dataInfo.code = this.$route.query.token
        this.dataInfo.password = this.password

        this.$nextTick(()=>{
          this.$axios.post('/'+this.end_point, this.dataInfo, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }})
            .then((response) => {
              if (response.data.error)
                this.$toast.error(response.data.message)
              this.$toast.success(response.data.message)
              this.$auth.logout();
              this.resetValidation();
              this.$router.push('/auth')
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => {
              this.isLoading = false
            })
        })

      }
    }
  }
</script>
<style>
  .title {
    font-family: Poppins, sans-serif;
  }
</style>
