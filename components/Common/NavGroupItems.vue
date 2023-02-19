<template>
  <v-list-group class="mb-0" :value="false" :prepend-icon="prependIcon" append-icon="mdi-menu-down" dense>
    <template #activator>
      <v-list-item-content>
        <span class="pp-body-reg-1">
          {{ $t(title) }}
        </span>
        <!-- <v-list-item-title class="mr-3">{{ title }}</v-list-item-title> -->
      </v-list-item-content>
    </template>
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      dense
      :to="localePath(item.to)"
      class="ml-4"
    >
      <v-list-item-icon class="mr-4">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <span class="pp-body-reg-1">
          {{ $t(item.title) }}
        </span>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  name: 'NavGroupItems',
  props: {
    prependIcon: String,
    title: String,
    items: Array,
  },
}
</script>

<style lang="scss" scoped></style>
