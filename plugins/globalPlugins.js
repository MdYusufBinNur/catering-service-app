import Vue from 'vue'
import userRole from '@/mixins/userRole'
import validationMixin from '@/mixins/validationMixin'
import noImage from 'static/icons/no-user.png'
import logo from 'static/logo.png'
import moonboon from 'static/icons/moonboon.png'
import Echo from 'laravel-echo';
import vueDebounce from 'vue-debounce'
import momentTimezone from 'moment-timezone'

Vue.use(vueDebounce)
Vue.mixin({

  computed: {
    bp() {
      return this.$vuetify.breakpoint
    },
    propertyURL() {
     return 'https://api.gcare.com.bd/';
     //    return 'http://127.0.0.1:8000/';
    },
    /**
     * @return {string}
     */
    API() {
      // return 'https://api.test.moonboon.com/api/v1';
        return 'http://127.0.0.1/api/v1';
    }
  },
  data() {
    return {
      noImage,
      logo,
      moonboon,
      // clipped: false,
      drawer: true,
      dashboardFilterMode : false,
      tiny_api_key: 'mw34pc21bdb4huz4mvu639u3pka3tmggjygirmj07to8lhe8'
    }
  },

  methods: {
    // formatDate (date) {
    //   return moment(date).format('lll')
    // },
    formatTimeZone (date) {
      const momentDate = momentTimezone(date)
      return momentDate.tz('Asia/Dhaka').format('ll')
    },
    formatTime (date) {
      const momentDate = momentTimezone(date)
      return momentDate.tz('Asia/Dhaka').format('Y-m-d H:i:s')
    }
  }
});
Vue.mixin(userRole)
Vue.mixin(validationMixin)
