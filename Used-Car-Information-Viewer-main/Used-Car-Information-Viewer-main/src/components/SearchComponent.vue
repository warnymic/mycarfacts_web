<template>
  <div>
    <v-form class="d-block">

          <v-select
              label="제조사"
              :items="manufacturers"
              v-model="manufacturer"
          ></v-select>

          <v-select
              label="모델"
              :items="models"
              v-model="model"
          ></v-select>

          <label>연식</label>
          <v-range-slider
              :min="1990"
              :max="2020"
              v-model="range"
              step="1"
              thumb-label="always"
          ></v-range-slider>
          <v-btn block color="primary" @click="search">
            검색
          </v-btn>

    </v-form>
    <v-divider class="my-5"></v-divider>
    <div>검색결과 {{ searchResult.length }} 건</div>
    <div class="search-result my-3">

      <div v-for="(item) in searchResult" class="item" :key="item.no" @click="onItemClicked(item.no)">
        <v-row no-gutters>
          <v-col cols="12" class="px-5">
            <v-row>
              <v-col cols="3"><div class="image"  :style="{ backgroundImage: 'url(' + getImageUrl(item.image) + ')' }"></div></v-col>
              <v-col cols="9">
                <v-row no-gutters>
                  <v-col class="font-weight-bold">{{ item.manufacturer }} {{ item.model }}</v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>{{ item.model_detail }}</v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>{{ item.mileage }}</v-col>
                </v-row>
                <v-row class="float-right" no-gutters>
                  <v-col style="font-size:0.9em;">{{ item.charge ? item.charge : '가격 미표시' }}</v-col>
                </v-row>
              </v-col>
            </v-row>


          </v-col>

        </v-row>
        <loading :active.sync="isLoading"
                 :is-full-page="false"
                 :can-cancel="false"></loading>
      </div>
    </div>
  </div>
</template>

<script>
import carList from "../assets/car-data.json";

import Loading from 'vue-loading-overlay';

export default {
  name: "SearchComponent",
  components: { Loading },
  data: () => {
    return {
      manufacturer: null,
      model: null,
      range: [1993, 2020],

      isLoading: false,
      searchResult: [

      ]
    }
  },
  computed: {
    cars() {
      return carList.cars
    },
    manufacturers() {
      let items = new Set()

      this.cars.forEach((i) => {
        items.add(i.manufacturer)
      })

      return Array.from(items)
    },
    models() {
      let self = this
      let items = new Set()

      this.cars.forEach((i) => {
        if(i.manufacturer != self.manufacturer) return
        items.add(i.model)
      })

      return Array.from(items)
    },
  },
  mounted() {
    this.search()
  },
  methods: {
    search() {
      this.isLoading = true
      let self = this
      let items = []

      this.cars.forEach((i) => {
        if(self.manufacturer &&  i.manufacturer != self.manufacturer) return
        if(self.model && i.model != self.model) return
        if(i.year && (self.range[0] >= i.year || i.year >= self.range[1])) return
        items.push(i)

      })
      this.searchResult = items
      this.isLoading = false
    },
    onItemClicked(itemNo) {
      this.$emit('itemClicked', itemNo)
    },
    getImageUrl(imageName) {
      if(imageName != null) {
        return require('@/assets/static/images/car/' + imageName)
      } else {
        return require('@/assets/static/images/no-car-image.jpg')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  max-height: 500px;
  overflow-y:auto;

  .item {

    cursor: pointer;

    .image {
      width:100%;
      height:80px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    :hover {
      background-color: #f8f8f8;
    }
  }
  .item:not(:first-child) {
    border-top:1px solid #eeeeee;
  }
}
</style>