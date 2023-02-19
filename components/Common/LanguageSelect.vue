<template>
  <v-menu offset-y left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn :x-small="authLayout" :small="!authLayout" rounded :outlined="authLayout" v-bind="attrs" v-on="on"
             :color="!authLayout ? 'white' : ''" :class="authLayout ? 'text-capitalize' : 'text-capitalize mr-2'">

        <v-img :src="menu_item.icon" width="13" height="13"
               :class="authLayout ? 'rounded rounded-circle  v-size--x-small mr-2' : 'rounded rounded-circle'"/>
        <span v-show="bp.mdAndUp && authLayout" class="text-capitalize">
                      {{ menu_item.name }}
                    </span>
        <v-icon right x-small>
          mdi-menu-down
        </v-icon>
      </v-btn>

    </template>
    <!--    <v-list dense>-->
    <!--      <v-list-item-->
    <!--        v-for="(title, index) in languages"-->
    <!--        :key="index"-->
    <!--        class="black&#45;&#45;text small"-->
    <!--        dense-->
    <!--        selectable-->
    <!--        @click="setMenuData(title)"-->
    <!--      >-->
    <!--        <v-img :src="title.icon"  height="13" width="13" class="rounded-circle v-size&#45;&#45;x-small mr-2" ></v-img>-->
    <!--        <v-list-item-title class="black&#45;&#45;text small">{{ title.name }}</v-list-item-title>-->

    <!--      </v-list-item>-->
    <!--    </v-list>-->
    <v-list dense>
      <v-list-item
        v-for="(title, index) in languages"
        :key="title.code"
        class="black--text small"
        dense
        selectable
        @click="changeLanguage(title)"
      >
        <v-img :src="title.icon"  height="13" width="13" class="rounded-circle v-size--x-small mr-2" ></v-img>
        <v-list-item-title class="black--text small">{{ title.name }}</v-list-item-title>

      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

  import europe from 'static/flag/europe.png'
  import danish from 'static/flag/danish.png'
  import swedish from 'static/flag/swdish.png'
  import french from 'static/flag/franch.png'
  import german from 'static/flag/german.png'

  export default {
    name: "LanguageSelect",
    props: {
      authLayout: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isLoading: false,
        valid: true,
        europe,
        danish,
        swedish,
        french,
        german,
        languages:
          [
            {
              name: "Danish",
              icon: danish,
              lang: 'danish',
              code: 'da'
            },
            {
              name: "Swedish",
              icon: swedish,
              lang: 'swedish',
              code: 'sw'
            },
            {
              name: "German",
              icon: german,
              lang: 'german',
              code: 'gr'
            },
            {
              name: "English",
              icon: europe,
              lang: 'english',
              code: 'en'
            },
            {
              name: "French",
              icon: french,
              lang: 'french',
              code: 'fr'
            }
          ],
        menu_item: {
          icon: null,
          name: null
        }
      }
    },
    computed: {
      availableLocales() {
        return this.language.filter(i => i.code !== this.$i18n.locale)
      },
      menu_items() {
         this.$i18n.getLocale()
      }
    },
    created() {
      this.menu_item_icon()
    },
    methods: {
      setMenuData(data) {
        this.menu_item.name = data.name
        this.menu_item.icon = data.icon
        this.$i18n.locale = data.lang;
      },
      changeLanguage(data) {
        this.menu_item.name = data.name
        this.menu_item.icon = data.icon
        this.$i18n.setLocale(data.code)
      },
      menu_item_icon() {
        if (this.$route.name) {
          const name = this.$route.name.slice(-3)
          switch (name) {
            case '_da' :
              this.menu_item.icon = danish
              this.menu_item.name = 'danish'
              break;

            case '_sw' :
              this.menu_item.icon = swedish
              this.menu_item.name = 'swedish'
              break;

            case '_en' :
              this.menu_item.icon = europe
              this.menu_item.name = 'english'
              break;

            case '_gr' :
              this.menu_item.icon = german
              this.menu_item.name = 'german'
              break;

            case '_fr' :
              this.menu_item.icon = french
              this.menu_item.name = 'french'
              break;
          }
        }

      }

    }
  }
</script>

<style scoped>

</style>
