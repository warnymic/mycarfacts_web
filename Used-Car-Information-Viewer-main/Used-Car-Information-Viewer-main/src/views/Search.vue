<template>

    <v-row>
      <v-col cols="12"
        lg="6"
        sm="6"
        xs="12"
      >
        <v-card>
          <v-card-title>차량검색</v-card-title>
          <v-card-text>
            <SearchComponent
              @itemClicked="onItemClicked"
            ></SearchComponent>
          </v-card-text>

        </v-card>
      </v-col>
      <v-col cols="12"
          lg="6"
          sm="6"
          xs="12"
      >
        <v-card>
          <v-card-title>차량정보</v-card-title>

          <v-card-text>
            <DisplayComponent
              ref="display"
              :item.sync="selectedItem"
            ></DisplayComponent>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

</template>

<script>
import SearchComponent from "@/components/SearchComponent";
import DisplayComponent from "@/components/DisplayComponent";

import carList from "../assets/car-data.json";

export default {
  name: "Search",
  components: {DisplayComponent, SearchComponent},
  data: () => {
    return {
      selectedItem: {}
    }
  },
  methods: {
    onItemClicked(itemNo) {
      let self = this
      this.cars.forEach((i) => {
        if(i.no == itemNo) self.selectedItem = i
      })
    }
  },
  computed: {
    cars() {
      return carList.cars
    },
  }
}
</script>

<style scoped>

</style>