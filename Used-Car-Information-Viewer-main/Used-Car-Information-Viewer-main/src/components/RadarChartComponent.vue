<script>
import { Radar } from 'vue-chartjs'

export default {
  name: "RadarChartComponent",
  extends: Radar,
  props: ['chartData'],
  data: () => {
    return {
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scale: {
          ticks: {
            suggestedMin: 0, suggestedMax: 100,
            stepSize: 20,
          }
        }
      }
    }
  },
  watch: {
    chartData: function() {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped>

</style>