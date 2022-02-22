<template>
  <Loader v-if="!atlasData || !rkiData"/>
  <div class="flex-center" v-else>
    <h1>7-Tage-COVID-19-Hospitalisierungsinzidenz</h1>
    <h2>Datenquelle: <a href="https://github.com/robert-koch-institut/COVID-19-Hospitalisierungen_in_Deutschland">
      Robert-Koch-Institut
    </a>
      <a href="https://raw.githubusercontent.com/robert-koch-institut/COVID-19-Hospitalisierungen_in_Deutschland/master/LICENSE">
        CC-BY-4.0
      </a>
    </h2>

    <div class="graph" v-bind:style="{ height: height +'px', width: width+ 'px' }">

      <svg :width='width' :height='height'>
        <Graph
            :atlas-data="atlasData"
            :rki-data="filteredData"
            :height="mapHeight"
            :width="width"
            :color-scale="colorScale"
            :color-value="colorValue"
            :row-by-state="rowByState"
        />
        <Legend
            :color-scale="colorScale"
            :legend-height="mapHeight"
            :margin-left="legendMargin"
            :legend-width="legendWidth"
        />
        <Line
            :data-values="bundesData"
            :inner-width="innerWidthLine"
            :x-scale="xScale"
            :x-value="timeValue"
            :y-value="colorValue"
            :overall-height="height"
            :proportion="lineChartHeight"
            :margin="lineMargin"
            :width="width"
            :x-format="xFormat"
            :selected-date="filteredDateLine"
        />
      </svg>
    </div>

  <Date-Fader
      v-if="atlasData && rkiData"
      :width="innerWidthLine"
      :x-scale="xScale"
      :x-format="xFormat"
      :atlasCallback="setFilteredDateAtlas"
      :lineCallback="setFilteredDateLine"
  />
  </div>
</template>

<script>

import Graph from "@/components/ChoroplethComps/Graph";
import Loader from "@/components/misc/Loader";
import Legend from "@/components/ChoroplethComps/Legend";
import DateFader from "@/components/misc/DateFader";
import {getAtlasData, getRKIData} from "@/components/misc/getData";
import {max, interpolatePuBuGn, scaleSequential, timeFormat, scaleTime, extent} from 'd3';
import Line from "@/components/LineComps/Line";


export default {
  name: "Choropleth",
  components: {DateFader, Line, Legend, Loader, Graph},
  data() {
    return {
      width: 960,
      height: 600,
      lineChartHeight: 0.23,

      margin: {top: 20, right: 0, bottom: 50, left: 0},

      atlasData: null,
      rkiData: null,
      maxRadius: 15,

      legendWidth: 20,
      legendMargin: 60,

      lineMargin: {top: 10, right: 80, bottom: 30, left: 80},

      filteredDateAtlas: new Date(2021, 0, 14),
      filteredDateLine: new Date(2021, 0, 14)
    }
  },
  computed: {
    mapHeight() {
      return this.height * (1 - this.lineChartHeight)
    },
    colorScale() {
      return scaleSequential(interpolatePuBuGn)
          .domain([0, max(this.rkiData, this.colorValue)])

    },
    bundesData() {
      return this.rkiData ? this.rkiData.filter(
          d => d.Bundesland === "Bundesgebiet"
      ) : null
    },
    filteredData() {
      return this.rkiData ? this.rkiData.filter(d => d.Datum.valueOf() === this.filteredDateAtlas.valueOf()) : null
    },
    rowByState() {
      const row = new Map()
      this.filteredData.forEach(d => {
        row.set(d.Bundesland, d)
      })
      return row
    },

    // Candidates for refactoring (put them in store?! Shared scales and maybe a clean config for all margins etc.
    xScale() {
      return scaleTime()
          .domain(extent(this.bundesData, this.timeValue))
          .range([0, this.innerWidthLine])
    },
    innerWidthLine() {
      return this.width - this.lineMargin.left - this.lineMargin.right
    },
  },
  methods: {
    setRKIData(data) {
      this.rkiData = data
    },
    setAtlasData(data) {
      this.atlasData = data
    },
    setFilteredDateAtlas(date) {
      this.filteredDateAtlas = date
    },
    setFilteredDateLine(date) {
      this.filteredDateLine = date
    },
    colorValue: d => d["7T_Hospitalisierung_Inzidenz"],
    timeValue: d => d["Datum"],
    xFormat: timeFormat("%d.%m.%Y"),
    xAxisTickFormat(d) {
      return this.xFormat(d)
    }
  },
  mounted() {
    getAtlasData(this.setAtlasData)
    getRKIData(this.setRKIData)
  }
}

</script>

<style>

line {
  stroke: rgba(63, 55, 55, 0.7);
}

.flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>