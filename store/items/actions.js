export default {
  initCategories(context, payload) {
    this.$axios.get('foot-items', payload)
      .then((response) => {
        context.commit('setItems', response.data.data );
        return response.data.data
      })
  }
}
