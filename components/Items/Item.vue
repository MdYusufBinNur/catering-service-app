<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-2">
        <TitleCard title="Food Item"/>
        <v-divider/>

      </v-col>
    </v-row>

    <v-card class="pa-0 pb-5" style="background-color: transparent" flat color="transparent">
      <v-row>
        <v-col cols="12">
          <v-btn rounded class="secondary px-10 text-capitalize" @click="openDialog">
            Add New Food item
          </v-btn>
        </v-col>

        <v-col cols="6" sm="4" md="4" class="pt-0 mt-0">
          <v-text-field
            rounded
            color="secondary"
            background-color="white"
            :placeholder="$t('Filter')"
            hide-details="auto"
            required
            single-line
            append-icon="mdi-magnify"
            type="text"
            v-model="search"
            clearable
          ></v-text-field>
        </v-col>

        <v-spacer v-show="bp.mdAndUp"></v-spacer>
        <v-col cols="12" sm="6" md="5" :align="bp.mdAndUp ? 'right' : 'left'" class="mt-5 pt-0">
          <span :class="bp.mdAndUp ? 'mr-4 grey--text' : 'mr-4 grey--text caption text-start'">
            Showing page {{ page }} of {{ numberOfPages }}
          </span>
          <v-chip
            close-icon="mdi-delete"
            class="rounded-br-0 rounded-tr-0"
            pill
            :small="bp.mdAndUp"
            :x-small="bp.smAndDown"
            dark
            color="white  black--text"
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
            color="white  black--text"
          >
            {{ page }}
          </v-chip>
          <v-chip
            close-icon="mdi-delete"
            class="rounded-l-0 rounded-r-0 mx-0"
            :small="bp.mdAndUp"
            :x-small="bp.smAndDown"
            dark
            color="white  black--text"
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
                color="white  black--text"
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
                    title
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>
    <v-skeleton-loader
      v-if="loading"
      type="table"
    ></v-skeleton-loader>
    <v-data-table
      v-else
      :headers="headers"
      :items="items"
      item-key="name"
      class="elevation-1"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      align="center"
      :header-props="{ sortIcon: null }"

    >

      <template #item.type="{item}">
        <v-chip small :ripple="false" :color="item.type === 'menu' ? 'secondary' : 'info'" >
          {{  item.type }}
        </v-chip>
      </template>
      <template #item.image="{item}">
        <v-img :src="item.item_image" contain max-width="80" max-height="80"/>
      </template>
      <template #item.action="{item}">
        <!--        <v-menu offset-y left>-->
        <!--          <template v-slot:activator="{ on, attrs }">-->
        <!--            <v-chip-->
        <!--              close-icon="mdi-delete"-->
        <!--              pill-->
        <!--              small-->
        <!--              outlined-->
        <!--              dark-->
        <!--              v-bind="attrs" v-on="on"-->
        <!--              color="high"-->
        <!--            >-->
        <!--              {{ item.active ? 'Enable' : 'Disable' }}-->
        <!--              <v-icon color="black" class="pl-3">mdi-menu-down</v-icon>-->
        <!--            </v-chip>-->
        <!--          </template>-->
        <!--          <v-list dense>-->
        <!--            <v-list-item-->
        <!--              v-for="(title, index) in activeList"-->
        <!--              :key="index"-->
        <!--              class="black&#45;&#45;text small"-->
        <!--              selectable-->
        <!--              dense-->
        <!--              @click="confirmDialog(item, title)"-->
        <!--            >-->
        <!--              <v-list-item-title class="black&#45;&#45;text small" @click="setActivity(title)"> {{title}}-->
        <!--              </v-list-item-title>-->
        <!--            </v-list-item>-->
        <!--          </v-list>-->
        <!--        </v-menu>-->
        <v-btn icon plain  color="primary" @click="editItem(item)">
          <v-icon >
            mdi-pencil-circle
          </v-icon>
        </v-btn>
        <v-btn icon plain color="red" @click="confirmDialog(item)">
          <v-icon >
            mdi-delete-circle
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-card class="pa-0 pb-5 mt-4" style="background-color: transparent" flat color="transparent">
      <v-row>
        <v-col cols="12" md="5" sm="12" class="">
         <span :class="bp.mdAndUp ? 'mr-4 grey--text' : 'mr-4 grey--text caption text-start'">
            {{ $t('Showing pages') }} {{ page }} {{ $t('of') }} {{ items.length }}
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
                <v-list-item-title class="black--text small" v-model="itemsPerPage"
                                   @click="setItemNumber(title)">{{ title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
           {{ $t('Rows per page') }}
          </span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="5" :align="bp.mdAndUp ? 'right' : 'left'">
          <span :class="bp.mdAndUp ? 'mr-4 grey--text' : 'mr-4 grey--text caption text-start'">
            {{ $t('Showing page') }} {{ page }} {{ $t('of') }} {{ numberOfPages }}
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
                    title
                  }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="650"
    >
      <v-card flat light rounded>
        <v-card-title class="pt-3 pb-0 h_primary">
          <span class="kep_title">{{ $t('Add New Category') }}</span>
        </v-card-title>
        <v-container grid-list-sm class="pt-0">
          <v-divider/>
          <v-row no-gutters class="pa-0">
            <v-col cols="12" class="pa-2">
              <label class="">Name</label>
              <v-text-field
                hide-details
                outlined
                dense
                v-model="editedItem.item_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-2">
              <label class="">Price</label>
              <v-text-field
                hide-details
                outlined
                dense
                type="numeric"
                v-model="editedItem.item_price"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-2">
              <label class="">Categories</label>
              <SelectCategory
                hide-details
                outlined
                dense
                v-model="editedItem.food_item_category_id"
              />
            </v-col>
            <v-col cols="12" class="pa-2">
              <label class="">Type</label>
              <v-select
                :items="types"
                hide-details
                outlined
                dense
                v-model="editedItem.type"
              ></v-select>
            </v-col>
            <v-col cols="12" class="pa-2">
              <label class="">Image</label>
              <v-file-input
                hide-details="auto"
                outlined
                dense
                type="file"
                @change="onLogoInput"
                append-outer-icon=""
                prepend-icon=""
                append-icon="mdi-file"
                class="rounded-r-0"
                v-model="editedItem.image"
                :clearable="false"
              />
            </v-col>
            <v-col cols="12" class="pa-5" md="4" v-show="logoPreviewURL">
              <v-img :src="logoPreviewURL" contain aspect-ratio="2"/>
            </v-col>
            <v-col cols="12" md="3" class="pa-5 px-5" v-show="logoPreviewURL">
              <v-chip small @click="clearPreview" >
                <v-icon small class="px-2">
                  mdi-delete-outline
                </v-icon>
                Remove
              </v-chip>
            </v-col>
          </v-row>
          <v-divider class="mb-5"/>
          <v-col cols="12" align="right" class="pa-2">
            <v-card-actions class="pb-5">
              <v-btn
                color="primary"
                outlined
                rounded
                class="px-8"
                @click="close"
              >
                {{ $t('close') }}
              </v-btn>
              <v-btn
                class="secondary px-8"
                rounded
                :loading="btnLoading"
                @click="saveCategory"
                v-show="editedIndex === -1"
              >
                {{ $t('Save') }}
              </v-btn>
              <v-btn
                class="secondary px-8"
                rounded
                :loading="btnLoading"
                v-show="editedIndex !== -1"
                @click="updateCategory"
              >
                {{ $t('Update') }}
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-col>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDelete" max-width="350" persistent eager>
      <v-card flat>
        <v-card-title class="text-center">
          Are you sure to delete this ?
        </v-card-title>
        <v-card-actions class="text-center justify-center" >
          <v-btn text color="secondary" class="text-capitalize" :loading="deleteLoading" :ripple="false" @click="deleteCategory">
            Yes
          </v-btn>
          <v-btn text class="text-center text-capitalize"  :ripple="false" @click="close">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TitleCard from "@/components/Common/TitleCard";
import {mapGetters} from "vuex";
import editIcon from 'static/icons/editInfoColor.png'
import trashIcon from 'static/icons/trashInfo.png'
import eyeIcon from 'static/icons/eyeInfo.png'
export default {
  name: "Item",
  data() {
    return {
      search: '',
      editIcon, trashIcon, eyeIcon,
      btnLoading: false,
      logoPreviewURL: null,
      confirmDelete: false,
      deleteLoading: false,
      loading: false,
      loadingSaveData: false,
      editedIndex: -1,
      dialog: false,
      dialogDelete: false,
      dialogView: false,
      itemsPerPageArray: [5, 10, 15, 20, 25, 50],
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      items: [],
      districts: [],
      active: 'Enable',
      activeList: ['Enable', 'Disable'],
      types: ['food', 'menu'],
      editedItem: {
        image: null,
        name: null,
        item_name: null,
        item_price: null,
        item_short_description: null,
        item_description: null,
        type: null,
        discount: null,
        discount_type: null,
        trending: null,
        available_on: null,
        food_item_category_id: []
      },
      defaultItem: {
        image: null,
        name: null,
        item_name: null,
        item_price: null,
        item_short_description: null,
        item_description: null,
        type: null,
        discount: null,
        discount_type: null,
        trending: null,
        available_on: null,
        food_item_category_id: null
      },
      dialogItems: {
        title: null,
        description: null,
        category: {
          name: null
        }
      },
      categoryItem: {
        name: null
      },
      categoryModal: false,

      updateActivityDialog: false
    }
  },

  components: {
    TitleCard
  },
  computed: {
    headers() {
      return [
        {text: this.$t('Name'), value: 'item_name', class: 'accentlight',},
        {text: this.$t('Price'), value: 'item_price', class: 'accentlight',},
        {text: this.$t('Type'), value: 'type', class: 'accentlight',},
        {text: this.$t('Image'), value: 'image', class: 'accentlight',},

        {text: this.$t('Action'), value: 'action', class: 'accentlight',},
      ]
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Add New' : 'Edit'
    },
    ...mapGetters({
      categoryList: 'categories/getFoodMenuCategories',
    })
  },
  watch: {
    // guide: {
    //   handler (nv, ov) {
    //     if (this.guide && this.guide.length) {
    //       this.items = JSON.parse(JSON.stringify(this.guide))
    //     } else {
    //       //this.initialize()
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // },
    subList: {
      handler(nv, ov) {

      },
      immediate: true,
      deep: true
    },
    categoryList: {
      handler(nv, ov) {
        if (this.categoryList && this.categoryList.length) {
          this.items = JSON.parse(JSON.stringify(this.categoryList))
        }
      },
      immediate: true,
      deep: true
    },
  },

  created() {
    this.initialize()
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    setItemNumber(data) {
      this.itemsPerPage = parseInt(data);
    },
    initialize() {
      this.loading = true
      // this.$store.dispatch('items/initCategories').finally(()=>{
      //   this.loading= false
      // })
      this.$axios.get('food-items')
        .then((response) => {
          this.items = response.data.data
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    reset() {
      this.$refs.form.reset()
    },
    close() {
      this.dialog = false
      this.confirmDelete = false
      this.editedIndex = -1
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })

    },

    confirmDialog(data) {
      this.editedItem.id = data.id
      this.editedIndex = this.items.indexOf(data)
      this.confirmDelete = true
    },
    closeDeleteDialog() {
      this.updateActivityDialog = false
      this.editedItem.active = null
      this.editedItem.id = null
      this.editedIndex = null
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)

      this.editedItem.id = item.id
      this.editedItem.name = item.name
      this.editedItem.type = item.type
      // this.editedItem = Object.assign({}, item)
      this.logoPreviewURL = item.image ? item.image : null
      this.dialog = true
    },
    openDialog() {
      this.dialog = true
      this.logoPreviewURL = null
    },
    async saveCategory() {
      this.btnLoading = true
      let formData = new FormData();
      formData.append('name', this.editedItem.name)
      formData.append('type', this.editedItem.type)
      formData.append('image', this.editedItem.image)
      await this.$axios.post('food-menu-category', formData)
        .then((res) => {
          this.items.unshift(res.data.data)
          this.$toast.success(res.data.message)
          this.close()
          this.$store.dispatch('categories/initCategories')

        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },
    async updateCategory() {
      this.btnLoading = true
      let formData = new FormData();
      formData.append('name', this.editedItem.name)
      formData.append('type', this.editedItem.type)
      if (this.editedItem.image)
      {
        formData.append('image', this.editedItem.image)
      }
      formData.append('_method', 'put')
      await this.$axios.post('food-menu-category/' + this.editedItem.id, formData)
        .then((response) => {
          this.$toast.success(response.data.message)
          Object.assign(this.items[this.editedIndex], response.data.data)
          this.close()
          this.$store.dispatch('categories/initCategories')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },

    onLogoInput(payload) {
      this.editedItem.image = payload
      this.logoPreviewURL = URL.createObjectURL(payload);
    },
    clearPreview() {
      this.editedItem.image = null
      this.logoPreviewURL = null
    },

    deleteCategory()
    {
      this.deleteLoading = true

      this.$axios.delete('food-menu-category/' + this.editedItem.id)
        .then((response) => {
          this.items.splice(this.editedIndex, 1)
          this.$toast.success(response.data.message)
          this.close()
        })
        .catch((error) => {
          this.$toast.success(response.data.message)
        })
        .finally(() => {
          this.deleteLoading = false
        })
    }
  },
}
</script>

<style scoped>
html {
  font-family: 'Poppins',serif;
}
</style>
