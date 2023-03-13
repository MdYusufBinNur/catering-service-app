<template>
  <v-app-bar
    absolute
    style="background-color: transparent"
    flat
    app
    class="mt-2"
    fixed
  >
        <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>

    <v-toolbar-items v-show="bp.mdAndUp">
<!--      <v-col cols="8" class="px-0">-->
<!--        <v-text-field-->
<!--          rounded-->
<!--          color="secondary"-->
<!--          background-color="white"-->
<!--          :placeholder="$t('Search')"-->
<!--          required-->
<!--          clearable-->
<!--        >-->
<!--          <template v-slot:append>-->
<!--            <v-icon style="margin-right: -12px" right>-->
<!--              mdi-magnify-->
<!--            </v-icon>-->
<!--          </template>-->
<!--        </v-text-field>-->
<!--      </v-col>-->
<!--      <v-col cols="5">-->
<!--        <v-menu-->
<!--          v-model="menu2"-->
<!--          :close-on-content-click="false"-->

<!--          transition="scale-transition"-->
<!--          offset-y-->
<!--          min-width="auto"-->
<!--        >-->
<!--          <template v-slot:activator="{ on, attrs }">-->
<!--            <v-text-field-->
<!--              rounded-->
<!--              color="secondary"-->
<!--              background-color="white"-->
<!--              :placeholder="$t('SEARCH_BY_DATE')"-->
<!--              hide-details="auto"-->
<!--              required-->
<!--              v-model="date"-->
<!--              readonly-->
<!--              v-bind="attrs"-->
<!--              v-on="on"-->
<!--              clearable-->
<!--            >-->
<!--              <template v-slot:append>-->
<!--                <div style="margin-right: -5px">-->
<!--                  <v-img :src="date_icon" width="25" class="mt-1" style="margin-right: -10px">-->

<!--                  </v-img>-->
<!--                </div>-->

<!--              </template>-->

<!--            </v-text-field>-->
<!--          </template>-->
<!--          <v-date-picker-->
<!--            v-model="date"-->
<!--            header-color="active2"-->
<!--            @input="menu2 = false"-->
<!--          ></v-date-picker>-->
<!--        </v-menu>-->
<!--      </v-col>-->
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-spacer></v-spacer>


    <Notifications />

    <v-menu offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn  text plain small rounded v-bind="attrs" class="px-0" v-on="on" style="background-color: transparent">
          <v-avatar size="30" v-show="bp.mdAndUp">
            <v-img :src="$auth.user && $auth.user.data.image ? propertyURL + $auth.user.data.image : 'https://cdn.vuetifyjs.com/images/john.png'"></v-img>
          </v-avatar>
          <v-list-item-content v-show="bp.mdAndUp" class="px-0" >

            <span class="pa-0 px-2 caption text-left text-capitalize" >
              {{ username }}
            </span>
          </v-list-item-content>
          <v-icon left >
            mdi-menu-down
          </v-icon>
        </v-btn>

      </template>
      <v-card style="border-radius: 10px" max-width="200px">
        <v-list dense >
          <v-list-item
            class="black--text small"
            dense
            selectable
          >
            <v-avatar size="40" v-show="bp.mdAndUp">
              <v-img :src="$auth.user && $auth.user.data.image ? propertyURL + $auth.user.data.image: 'https://cdn.vuetifyjs.com/images/john.png'"></v-img>
            </v-avatar>
            <v-list-item-content v-show="bp.mdAndUp">
              <v-card-subtitle class="pa-0 px-2">
                {{ username }}
              </v-card-subtitle>
              <span class="pa-0 px-2 caption">
                {{ userRole ? userRole : '-'}}
              </span>
            </v-list-item-content>

          </v-list-item>
          <v-divider />
          <v-list-item dense :to="localePath('/setting')">
            <v-list-item-avatar size="20">
              <v-img :src="ac" contain/>
            </v-list-item-avatar>
            <v-list-item-title class="text-capitalize" >{{ $t('account')}}</v-list-item-title>
          </v-list-item>
          <v-list-item dense @click="$auth.logout()">
            <v-list-item-avatar size="20">
              <v-img :src="logoutIcon" contain/>
            </v-list-item-avatar>
            <v-list-item-title class="text-capitalize">{{ $t('logout')}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>

    </v-menu>
<!--    <v-avatar size="30" v-show="bp.mdAndUp">-->
<!--      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>-->
<!--    </v-avatar>-->
<!--    <v-list-item-content v-show="bp.mdAndUp">-->
<!--      <v-card-subtitle class="pa-0 px-2">-->
<!--        Jhon Doe-->
<!--      </v-card-subtitle>-->
<!--      <span class="pa-0 px-2 caption" text @click="$auth.logout()">-->
<!--        Admin-->
<!--      </span>-->
<!--    </v-list-item-content>-->
    <v-dialog
      v-model="dialog"
      max-width="650px"
    >
      <v-card flat light rounded>
        <v-row align="center" no-gutters>
          <v-col cols="8">
            <v-card-title class="py-3 pb-0 h_primary">
              <span class="kep_title">{{ $t('Notification') }}</span>
            </v-card-title>
          </v-col>
          <v-col cols="4" class="pa-2 text-right">
            <v-switch
              v-model="switch1"
              flat
              color="info"
              :label="$t('Only show unread')"
            ></v-switch>
          </v-col>
        </v-row>
        <v-divider/>
        <v-form ref="form">
          <v-row no-gutters class="pa-2">
            Notification
          </v-row>
          <v-divider class="mb-2"/>
          <v-row no-gutters class="pa-2">
            <v-col cols="12" align="right" class="pa-2 pt-0">

            </v-col>
          </v-row>
        </v-form>
      </v-card>

    </v-dialog>
  </v-app-bar>
</template>

<script>
  import gm from "../../static/gm.png";
  import uk from "../../static/uk.png";
  import date_icon from 'static/icons/date.png'
  import LanguageSelect from "./LanguageSelect";
  import group_account from "../../static/icons/notificationIcon.png";
  import logoutIcon from 'static/icons/Logout.png';
  import ac from 'static/icons/ac.png';
  import Notifications from "./Notifications";
  import imageUploadMixin from "../../mixins/imageUploadMixin";
  export default {
    name: "Nav",

    components: {Notifications, LanguageSelect},
    mixins: [imageUploadMixin],
    data() {
      return {
        loadingState: false,
        show: false,
        gm,
        uk,
        ac,
        logoutIcon,
        date_icon,
        group_account,
        profileImg: null,
        userRole: null,
        languages:
          [
            {
              'local': 'gm',
              "name": "Germany",
              "icon": gm
            },
            {
              'local': 'en',
              "name": "English",
              "icon": uk
            },

            {
              'local': 'da',
              "name": "Danish",
              "icon": uk
            }
          ],
        date: '',
        menu2: false,

        adminMenu: false,
        dialog: false,
        drawer: false,
        username: '',
        userImage: '',
        switch1: true

      }
    },
    created() {
       this.initUser()
    },
    computed: {
      // profileImageInfo() {
      //   this.$auth.user.data.image ? this.profileImagePreviewURL = this.propertyURL+this.$auth.user.data.image : null
      // }
    },
    methods: {
      changeLanguage(lang) {
        // Change the i18n context object's locale
        // This makes it so the correct locale file is used
        this.$i18n.locale = lang;
        // app.switchLocalePath(lang)
      },
      close() {
        this.dialog = false
      },
      openDialog() {
        this.dialog = true
      },
      initUser() {
        this.username = this.$auth.user.data.username
        this.$nextTick(() => {
          this.userRole = this.$auth.user.data.role
          this.userImage = this.$auth.user.data.image
        })
      },
      openDrawer()
      {
        this.$root.$emit('openDrawer')
      }
    },

  }
</script>

<style scoped>
  .radius {
    border-radius: 10px;
  }
</style>
