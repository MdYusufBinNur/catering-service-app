<template>
  <v-card class="pa-0 pb-5 mt-4" style="background-color: transparent" flat color="transparent">
    <v-row>
      <v-col cols="12" md="5" sm="12" class="">
         <span :class="bp.mdAndUp ? 'mr-4 grey--text' : 'mr-4 grey--text caption text-start'">
            {{ $t('Showing pages')}} {{ page }} {{ $t('of')}} {{ itemsLength }}
           <v-menu offset-y left>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                close-icon="mdi-delete"
                pill
                small
                dark
                v-bind="attrs" v-on="on"
                color="high"
              >
                {{ itemsPerPage }}
                <v-icon color="white" class="pl-2">mdi-menu-down</v-icon>
              </v-chip>
            </template>
            <v-list>
              <v-list-item
                v-for="(title, index) in itemsPerPageArray"
                :key="index"
                class="black--text small"
              >
                <v-list-item-title class="black--text small" v-model="itemsPerPage" @click="setItemNumber(title)">{{ title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
           {{ $t('Rows per page')}}
          </span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="5" :align="bp.mdAndUp ? 'right' : 'left'" >
          <span :class="bp.mdAndUp ? 'mr-4 grey--text' : 'mr-4 grey--text caption text-start'">
            {{ $t('Showing page')}} {{ page }} {{ $t('of')}} {{ numberOfPages }}
          </span>
        <v-chip
          close-icon="mdi-delete"
          class="rounded-br-0 rounded-tr-0"
          pill
          :small="bp.mdAndUp"
          :x-small="bp.smAndDown"
          color="white black--text"
          @click="formerPage"
        >
          <v-icon color="black">mdi-chevron-left</v-icon>
        </v-chip>
        <v-chip
          close-icon="mdi-delete"
          class="rounded-l-0 rounded-r-0 px-4 mx-0"
          pill
          :small="bp.mdAndUp"
          :x-small="bp.smAndDown"
          dark
          color="white black--text"
        >
          {{ page }}
        </v-chip>
        <v-chip
          close-icon="mdi-delete"
          class="rounded-l-0 rounded-r-0 mx-0"
          :small="bp.mdAndUp"
          :x-small="bp.smAndDown"
          dark
          color="white black--text"
          @click="nextPage"
        >
          <v-icon color="black">mdi-chevron-right</v-icon>
        </v-chip>
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              close-icon="mdi-delete"
              class="rounded-bl-0 rounded-tl-0 mx-0"
              pill
              :small="bp.mdAndUp"
              :x-small="bp.smAndDown"
              dark
              v-bind="attrs" v-on="on"
              color="white black--text"
            >
              {{ itemsPerPage }}
              <v-icon color="black" class="pl-2">mdi-menu-down</v-icon>
            </v-chip>
          </template>
          <v-list>
            <v-list-item
              v-for="(title, index) in itemsPerPageArray"
              :key="index"
              class="black--text small"
            >
              <v-list-item-title class="black--text small" v-model="itemsPerPage" @click="setItemNumber(title)">{{
                  title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>
export default {
  name: "DataTableFooterPagination",
  props: {
    page: null,
    nextPage: null,
    itemsPerPage: null,
    itemsPerPageArray: null,
    numberOfPages: null,
    itemsLength: null,
  },
  methods: {
    setItemNumber(title)
    {

    },
    formerPage() {},
  }
}
</script>

<style scoped>

</style>
