export default {
  data () {
    return {
      options: {
        page: null,
        itemsPerPage: null,
        sortBy: 'id',
        sortDesc: true
      },

      pagination: {
        totalPage: 1,
        nextPageUrl: null,
        previousPageUrl: null,
        paginate: 10,
        currentPage: null,
        nextPage: null,
        prevPage: null,
        totalCount: 0
      },
    }
  },

  computed: {
    paginationQuery () {
      return (
        `&page=${this.pagination.page ? this.pagination.page : 1}` +
        `&per_page=${
          this.pagination.itemsPerPage ? this.pagination.itemsPerPage : 50
        }` +
        `&order_by=${this.options.sortBy ? this.options.sortBy : 'id'}` +
        `&order_direction=${this.options.sortDesc ? 'desc' : 'asc'}`
      )
    }
  },

  methods: {
    setPaginationData (meta) {
      this.pagination = Object.assign({}, meta)
    }
  }
}
