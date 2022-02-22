<template>

  <g :transform="`translate(${margin.left}, ${mapOffset + margin.top})`">
    <AxisLeft
        :yScale="yScale"
        :inner-width="innerWidth"
        :height="innerHeight"
        :y-axis-label-offset="yAxisLabelOffset"
        :y-axis-label="yAxisLabel"

        :scaled-selected-date="scaledSelectedDate"
        :scaled-selected-y="scaledSelectedY"
    />

    <AxisBottom
        :xScale="xScale"
        :height="innerHeight"
        :xAxisTickFormat="xAxisTickFormat"
        :width="innerWidth"
        :x-axis-label="xAxisLabel"
        :x-axis-label-offset="xAxisLabelOffset"

        :scaled-selected-date="scaledSelectedDate"
        :scaled-selected-y="scaledSelectedY"
    />

    <Graph
        :v-memo="[dataValues]"
        :data="dataValues"
        :xScale="xScale"
        :yScale="yScale"
        :xValue="xValue"
        :yValue="yValue"
        :line-color="lineColor"

        :circle-radius="circleRadius"
        :scaled-selected-date="scaledSelectedDate"
        :scaled-selected-y="scaledSelectedY"
    />

  </g>


</template>

<script>
import {scaleLinear, extent} from 'd3';
import AxisLeft from "@/components/LineComps/AxisLeft";
import AxisBottom from "@/components/LineComps/AxisBottom";
import Graph from "@/components/LineComps/Graph";

export default {
  name: "Line",
  components: {AxisLeft, AxisBottom, Graph},
  props: {
    xValue: Function,
    yValue: Function,
    dataValues: Object,
    margin: Object,
    width: Number,
    innerWidth: Number,
    overallHeight: Number,
    proportion: Number,
    xFormat: Function,
    selectedDate: Date,
    xScale: Function,

  },
  data() {
    return {
      url: "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv",

      xAxisLabelOffset: 24,
      yAxisLabelOffset: 25,
      xAxisLabel: "Datum",
      yAxisLabel: "Bundesweit",
      circleRadius: 3,
      lineColor: "black",
    }
  },
  computed: {
    mapOffset() {
      return this.overallHeight * (1 - this.proportion)
    },
    height() {
      return this.overallHeight * this.proportion
    },
    innerHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },

    yScale() {
      return scaleLinear()
          .domain(extent(this.dataValues, this.yValue))
          .range([this.innerHeight, 0])
          .nice();
    },
    scaledSelectedY() {
      const y = this.yValue(this.dataValues.filter(x => this.xValue(x).valueOf() === this.selectedDate.valueOf())[0])
      return this.yScale(y)
    },
    scaledSelectedDate() {
      return this.xScale(this.selectedDate)
    }
  },
  methods: {
    xAxisTickFormat(tickValue) {
      return this.xFormat(tickValue)
    },
  },

}
</script>

<style>
.graph {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart path {
  stroke: #137B80;
  stroke-width: 2;
  fill: none;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.chart .selected {
  fill: rgb(223, 218, 235);
  stroke: #000000;

}

.tick line {
  stroke: #C0C0BB;
}

.line-axis .tick text {
  fill: #635F5D;
  font-size: 0.7em;
}

.axis-label {
  font-size: 0.9em;
  fill: #635F5D;
}
</style>