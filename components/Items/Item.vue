<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-2">
        <TitleCard title="Food Items"/>
        <v-divider/>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import TitleCard from "@/components/Common/TitleCard";

export default {
  name: "Item",
  components: {TitleCard}
}
</script>

<style scoped>

</style>
