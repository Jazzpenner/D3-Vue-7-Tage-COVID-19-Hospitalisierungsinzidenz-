<template class="line-axis">
  <line
      stroke-dasharray="2 2"
      :x2="scaledSelectedDate"
      :transform="`translate(0, ${scaledSelectedY})`"
  />
  <g v-memo="[height, yAxisLabelOffset]">
    <line :transform="`translate(0,${height})`" :x2="innerWidth"></line>
    <g class="line-axis" v-for="tick in yScale.ticks(numberOfTicks)" :key="tick">
      <g class="tick" :transform="`translate(0, ${yScale(tick)})`">
        <text :style="textStyleVal" :dy="dy" :x="x">{{ tick }}</text>
      </g>
    </g>
    <text
        class="axis-label"
        text-anchor="middle"
        :transform="`translate(${-yAxisLabelOffset},${height / 2}) rotate(-90)`"
    >
      {{ yAxisLabel }}
    </text>
  </g>
</template>

<script>
export default {
  name: "AxisLeft",
  props: {
    innerWidth: Number,
    yScale: Function,
    yAxisLabelOffset: Number,
    height: Number,
    yAxisLabel: String,
    numberOfTicks: {type:Number, default:6, required:false},

    scaledSelectedDate: Number,
    scaledSelectedY: Number,
  },
  data() {
    return {
      strokeVal: "black",
      textStyleVal: "text-anchor: end;",
      dy: "0.32em",
      x: "-3"
    }
  },
}
</script>
<style scoped>
</style>