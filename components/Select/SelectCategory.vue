<template>
  <div>
    <v-autocomplete
      v-model="selected"
      v-debounce:800ms="debouncedInitData"
      :items="testList"
      :no-data-text="noDataText"
      :loading="loading"
      :search-input.sync="name"
      :debounce-events="['onclick', 'oninput', 'onkeydown']"
      v-bind="$attrs"
      hide-details="auto"
      :item-text="itemText"
      :item-value="itemValue"
      multiple
      small-chips
      @change="onChangeSelectedItem"
      @click="onChangeSelectedItemIndex"
    >


    </v-autocomplete>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'SelectCategory',
    props: {
    },

    data () {
      return {
        selected: null,
        name: null,
        testList: [],
        loading: false,
        itemText: 'name',
        itemValue: 'id'
      }
    },

    computed: {
      ...mapGetters({
        categoryList: 'categories/getFoodMenuCategories'
      }),

      searchQuery () {
        return (
          `${this.name !== '' && this.name !== null ? '?query=' + this.name : ''}`
        )
      },

      noDataText () {
        let text = ''
        if (this.loading) {
          text = 'Data is Loading...'
        } else {
          text = 'No data available'
        }
        return text
      }
    },

    watch: {
      categoryList: {
        handler (nv, ov) {
          if (this.categoryList && this.categoryList.length) {
            this.testList = JSON.parse(JSON.stringify(this.categoryList))
          }
        },
        immediate: true,
        deep: true
      },
    },


    created() {
      if (this.categoryList.length <= 0) {
        this.initialize()
      }
    },
    methods: {
      onChangeSelectedItem (item) {
        this.$emit('setSelectedMedicine', item)
      },
      onChangeSelectedItemIndex (indexNo) {
        this.$emit('setIndexNo', indexNo)
      },
      onChangeSelectedGroup (item) {
        this.$emit('setSelectedGroup', item)
      },

      initialize () {
        this.loading = true
        this.$store.dispatch('categories/initCategories')
          .catch((error) => {
            this.$toast.error(error.response.data.message)
          })
          .finally(() => {
            this.loading = false
          })
      },

      debouncedInitData (v) {
        this.name = v
        this.initialize()
      },

      setId (id) {
        const found = this.testList.find(el => el.id === id)
        if (found) {
          this.selected = parseInt(id, 10)
        } else {
          this.initialize('?id=' + id)
          this.selected = parseInt(id, 10)
        }
      },

      save(item) {
        this.setId(item.id)
      },

      update(item) {
        this.setId(item.id)
      },
    }
  }
</script>
