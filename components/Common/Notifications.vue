<template>
  <v-menu offset-y
          transition="slide-y-transition"
          v-model="notificationMenu"
          :close-on-content-click="false"
          left
          min-width="500"
          max-height="550"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab x-small class="mx-2" depressed v-bind="attrs" v-on="on" color="white">
        <v-badge
          color="red"
          overlap
          :content="notifications > 10 ? '10+' : notifications"
          :value="notifications "
        >
          <v-icon dense small color="black">mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card flat light rounded>
      <v-row align="center" no-gutters>
        <v-col cols="7">
          <v-card-title class="py-3 pb-0 h_primary">
            <span class="kep_title_2">{{ $t('Notification') }}</span>
          </v-card-title>
        </v-col>
        <v-col cols="5" class="pt-4 text-right">
          <v-switch
            v-model="switch1"
            flat
            dense
            color="info"
            :label="$t('Only show unread')"
            class="caption text-sm-caption"
            @click="showAllNotification"
          ></v-switch>
        </v-col>
      </v-row>
      <v-divider/>
      <v-row no-gutters justify="space-between" class="px-5 pt-2 ">
        <v-col cols="3">
          <span class="caption">{{ $t('Today')}}</span>
        </v-col>
        <v-col cols="4" align="right">
          <v-btn plain text v-show="notifications > 0" class="caption pr-0" @click="markAllRead" :loading="loading">{{ $t('Mark all as read')}}</v-btn>
        </v-col>
      </v-row>
      <v-virtual-scroll
        :items="todayNotificationData"
        height="400"
        item-height="120"
      >
        <template slot-scope="props">
          <v-row no-gutters dense class="pt-0">
            <v-col cols="12">
              <v-list dense max-width="550" class="py-0" >
                <v-list-item dense class="px-5 mx-3 my-2 radius" @click="makeRead(props.item)" active-class="accentlight" :style="props.item.isRead ? '' : 'background-color: #F2F2F2'">
                  <v-list-item-action class="mr-3">
                    <v-btn fab depressed class="accent" small>
                      <v-img :src="props.item.image ? props.item.image : group_account"  class="rounded" contain aspect-ratio="2" :alt="group_account"/>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item class="px-0">
                      <h6 class="">
                        {{ props.item.title }}
                      </h6>

                      <v-spacer/>
                      <v-list-item-action class="text-center">
                        <span class="caption text-center">
                         {{ props.item.time }} hour ago
                        </span>
                      </v-list-item-action>
                    </v-list-item>
                    <span class="caption" style="margin-top: -8px">
                     {{ props.item.details }}
                    </span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </template>

      </v-virtual-scroll>

    </v-card>
  </v-menu>

</template>

<script>
  import group_account from "../../static/icons/notificationIcon.png";

  export default {
    name: "Notifications",
    data() {
      return {
        //todayNotificationData: [],
        username: '',
        notificationMenu: false,
        switch1: true,
        notifications: 0,
        todayNotifications: [],
        yesterdayNotifications: [],
        otherNotifications: [],
        group_account,
        loading: false,
        indexNo: -1,
        notiData: {},
        unseenNotification: true,
        readNotification : [],
        unReadNotification : [],
        notificationRoomId: null,
        roomId: null
      }
    },
    created() {
      //this.initNotifications()
    },
    methods: {
      initNotifications() {
        return this.$store.dispatch('notifications/initItems')
          .then((response) => {
            this.notifications = JSON.parse(JSON.stringify(response.data.data.notifications))
            // this.todayNotifications = JSON.parse(JSON.stringify(response.data.data.today))
            // this.yesterdayNotifications = JSON.parse(JSON.stringify(response.data.data.yesterday))
            // this.otherNotifications = JSON.parse(JSON.stringify(response.data.data.others))
           // this.todayNotificationData = JSON.parse(JSON.stringify(response.data.data.all))

            this.readNotification = JSON.parse(JSON.stringify(response.data.data.read))
            this.unReadNotification = JSON.parse(JSON.stringify(response.data.data.unRead))
            this.roomId = JSON.parse(JSON.stringify(response.data.data.room))
          //  this.todayNotificationData = this.switch1 ? this.readNotification : this.unReadNotification

          })
          .catch((error) => {
            console.log(error.response.data)
          })
          .finally(() => {

          })
      },

      markAllRead() {
        this.loading = true
        return this.$axios.post('update-notification-info', this.$auth.user.id)
        .then((response) => {
          if (response.data.error) {
            this.$toast.error(response.data.message)
            return
          }

          this.initNotifications()

        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.loading = false
        })
      },
      makeRead(data) {
        this.indexNo = this.todayNotificationData.indexOf(data);
        this.notiData.title = data.title
        this.notiData.details = data.details
        this.notiData.isRead = true
        if (data.isRead) {
          return;
        }
        this.$nextTick(() => {
          this.$axios.put(`notification-info/${data.id}`, this.notiData)
            .then((response) => {
              if (response.data.error) {
                this.$toast.error(response.data.message)
                return
              }
              this.initNotifications()
              //console.log(response.data.data.notifications)
              // this.notifications = response.data.data.notifications > 0 ? response.data.data.notifications : 0
              // Object.assign(this.todayNotificationData[this.indexNo], response.data.data.updatedNotification)
            })
            .catch((error) => {
              this.$toast.error(error.response.data.message)
            })
            .finally(() => {})
        })


      },
      showAllNotification() {
        if (this.switch1 === false) {
          this.unseenNotification = false
        }
        if (this.switch1) {
          this.unseenNotification = true
        }
      }
    },
    computed: {
      todayNotificationData() {
       return this.switch1 ? this.unReadNotification : this.readNotification
      }
    },
    mounted () {
      // this.$echo.private(`notify.${this.roomId}`)
      //   .listen('App\\Events\\NotificationInfoEvent', (e) => {
      //     this.initNotifications()
      //   })

      //Working code in below
      // this.$echo.channel(`notify`)
      //   .on('App\\Events\\NotificationInfoEvent', (e) => {
      //     if (e.data === this.roomId) {
      //       this.initNotifications()
      //     }
      //   })
    }
  }
</script>

<style scoped>

</style>
