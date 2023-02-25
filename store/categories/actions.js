export default {
  initCategories(context, payload) {
    this.$axios.get('food-menu-category', payload)
      .then((response) => {
        context.commit('setFoodMenuCategories', response.data.data );
        return response.data.data
      })
  }
}
