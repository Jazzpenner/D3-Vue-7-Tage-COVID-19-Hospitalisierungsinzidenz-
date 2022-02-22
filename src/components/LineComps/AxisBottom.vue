<template>
  <line
      stroke-dasharray="2 2"
      :y1="scaledSelectedY"
      :y2="height"
      :transform="`translate(${scaledSelectedDate}, 0)`"
  />
  <g v-memo="[width, height, xAxisLabelOffset]">
    <line :y2="height"></line>
    <g class="line-axis" v-for="tickValue in xScale.ticks()" :key="tickValue">
      <g class="tick" :transform="`translate(${xScale(tickValue)}, 0)`">

        <text :style="textStyleVal" :dy="dy" :y="y">{{ xAxisTickFormat(tickValue) }}</text>
      </g>
    </g>
    <text
        class="axis-label"
        :x="width/2"
        text-anchor="middle"
        :y="height + xAxisLabelOffset"
    >
      {{ xAxisLabel }}
    </text>
  </g>
</template>

<script>
export default {
  name: "AxisBottom",
  props: {
    width: Number,
    height: Number,
    xScale: Function,
    xAxisTickFormat: Function,
    xAxisLabelOffset: Number,
    xAxisLabel: String,

    scaledSelectedDate: Number,
    scaledSelectedY: Number,
  },
  data() {
    return {
      strokeVal: "black",
      textStyleVal: "text-anchor: middle;",
      dy: "0.71em",
      y: `${this.height + 3}`,
    }
  },
}
</script>
<style scoped>
</style>