<template>
  <div class="car-info">
    <div class="row">
      <div class="text-center title col">
        <span class="font-weight-light text-center">{{ title }}</span>
      </div>
    </div>

    <div class="row">
      <div class="image my-3">
        <div class="viewer" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
      </div>
      <div class="datasheet">
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
            <tr>
              <th class="text-left" width="30%">
                제조사명
              </th>
              <td>
                {{ item.manufacturer }}
              </td>
            </tr>
            <tr>
              <th class="text-left">
                모델
              </th>
              <td>
                {{ item.model_detail }}
              </td>
            </tr>
            <tr>
              <th class="text-left">
                엔진
              </th>
              <td>
                {{ item.engine }}
              </td>
            </tr>
            <tr>
              <th class="text-left">
                주행거리
              </th>
              <td>
                {{ item.mileage }}
              </td>
            </tr>
            <tr>
              <th class="text-left">
                판매가
              </th>
              <td>
                {{ item.charge ? item.charge : '가격 미표시' }}
              </td>
            </tr>
            </tbody>

          </template>
        </v-simple-table>

      </div>
    </div>

    <div class="row my-5">
      <div class="text-center title col">
        <div class="font-weight-bold">추후 고장예상파트</div>

        <radar-chart-component
            class="chart my-3"
            :chart-data="dataCollection"
        ></radar-chart-component>


        <template v-if="item && item.symptoms && item.symptoms.length > 0">
          <ul class="font-weight-regular text-left my-4" style="font-size:0.8em;">
            <li v-for="(item, idx) in item.symptoms" :key="idx">{{ item }}</li>
          </ul>
        </template>
        <template v-else>
          <div class="mt-5 py-5" style="font-size:0.9em;">고장 예상파트가 없습니다</div>
        </template>


      </div>
    </div>


    <div class="row">
      <div class="recall col pb-0">
        <v-btn block depressed :disabled="item.recall == null">리콜정보</v-btn>
      </div>
    </div>
    <div class="row">
      <div class="recall col">
        <v-btn block depressed :disabled="item.url == null">중고차 매물 바로가기</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import RadarChartComponent from "@/components/RadarChartComponent";

export default {
  name: "DisplayComponent",
  components: { RadarChartComponent },
  props: ['item'],
  data: () => {
    return {
    }
  },
  computed: {
    title() {
      if (this.item.no == null) return '차량을 선택해주세요'
      return this.item.manufacturer + ' ' + this.item.model
    },
    imageUrl() {
      if (this.item.image != null) {
        return require('@/assets/static/images/car/' + this.item.image)
      } else {
        return require('@/assets/static/images/no-car-image.jpg')
      }
    },
    dataCollection() {
      let self = this

      if(this.item == null || this.item.predictions == null) {
        return {
          labels: ['', '', '', ''],
          datasets: [
            { data: [0, 0, 0, 0] }
          ]
        }
      } else {

        let values = []
        let labels = []

        Object.keys(self.item.predictions).forEach(function(key) {
          labels.push(key)
          values.push(self.item.predictions[key])
        });

        return {
          labels: labels,
          datasets: [
            {data: values}
          ]
        }
      }
    },
  },
  methods: {
  },
  mounted() {

  }

}
</script>

<style lang="scss" scoped>
.car-info {
  .title {
    font-size:1.2em;
  }

  .image {
    width:100%;
    padding: 0 100px;

    .viewer {
      width:100%;
      height:200px;
      background-repeat: no-repeat;
      background-size:contain;
      background-position: center;
    }
  }

  .datasheet {
    width:100%;
    padding:0 50px;
  }

  .chart {
    max-width:300px;
    width:80%;
    margin: 0 auto;
  }
}
</style>