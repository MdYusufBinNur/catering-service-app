import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export default ({ app, store}) => {
  app.i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages: {
      en: require("~/static/en.json"),
      german: require("~/static/gr.json"),
      da: require("~/static/da.json"),
      danish: require("~/static/da.json"),
    },
  })
  //app.i18n.locale = 'bn'
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }
}
