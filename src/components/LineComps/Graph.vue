<template>
  <g class="chart">
    <path v-memo="[data]" :d="lineFormat" />
    <circle
        class="selected"
        :cx="scaledSelectedDate"
        :cy="scaledSelectedY"
        :r="circleRadius"
    />
  </g>
</template>

<script>
import { line, curveNatural } from "d3";
export default {
  name: "Graph",
  props: {
    data: Object,
    xScale: Function,
    yScale: Function,
    xValue: Function,
    yValue: Function,
    circleRadius: Number,

    scaledSelectedDate: Number,
    scaledSelectedY: Number,
  },
  computed: {
    lineFormat() {
      return line()
          .x(d => this.xScale(this.xValue(d)))
          .y(d => this.yScale(this.yValue(d)))
          .curve(curveNatural)(this.data)
    }
  }
}
</script>
<style scoped>
</style>