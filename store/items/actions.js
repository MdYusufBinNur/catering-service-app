export default {
  initItems(context, payload) {
    this.$axios.get('food-items', payload)
      .then((response) => {
        context.commit('setItems', response.data.data );
        return response.data.data
      })
  }
}
