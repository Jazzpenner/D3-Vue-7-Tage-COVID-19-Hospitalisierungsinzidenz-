<template>
  <defs>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop
          v-for="(n, i) in tickRange"
          :key="n"
          :offset="`${((i + 1) / numTicks) * 100}%`"
          :stop-color="colorScale(n)"
      />
    </linearGradient>
  </defs>
  <g :transform="`translate(${marginLeft}, 0)`">
    <rect :width="legendWidth" :height="legendHeight" fill="url(#Gradient2)"/>
    <g
        v-for="domain in band.domain()"
        :key="domain" class="tick"
        :transform="translate(domain)"
    >
      <line class="axis" stroke="black" :x2="legendWidth / 3"></line>
      <text :style="textStyleVal" :dy="dy" :x="xOffset">{{ domain }}</text>
    </g>
  </g>
</template>

<script>
import {scaleBand} from "d3";

export default {
  name: "Legend",
  props: {
    legendHeight: Number,
    colorScale: Function,
    legendWidth: {type: Number, default: 20, required: false},
    countAxisTicks: {type: Number, default: 14, required: false},
    marginLeft: {type: Number, default: 90, required: false}
  },
  data() {
    return {
      dy: "0.3em",
      xOffset: "-3px",
      textStyleVal: "text-anchor: end;",
    }
  },
  computed: {
    band() {
      return scaleBand()
          .domain(this.tickRange)
          .range([0, this.legendHeight])
          .paddingInner(0.1)
    },
    tickRange() {
      return this.colorScale.ticks(this.countAxisTicks).reverse()
    },
    // real Number of ticks. as computed by d3
    numTicks() {
      return this.tickRange.length
    }
  },
  methods: {
    translate: function (domain) {
      return `translate(0, ${this.band(domain) + this.band.bandwidth() / 2})`
    }
  }
}
</script>

<style scoped>

</style>