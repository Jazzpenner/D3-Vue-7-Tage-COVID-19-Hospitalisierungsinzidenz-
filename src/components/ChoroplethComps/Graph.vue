<template>
  <foreignObject :width="width" :height="height">
    <canvas id="states" :width="width" :height="height"></canvas>
  </foreignObject>
</template>

<script>
import {geoAlbers, geoPath, geoGraticule} from "d3";

export default {
  name: "Graph",
  props: {
    atlasData: Object,
    rkiData: Object,
    width: Number,
    height: Number,
    colorValue: Function,
    colorScale: Function,
    rowByState: Object,
    strokeColor: {default: "rgba(111, 110, 110, 0.4)", type: String, required: false}

  },
  data() {
    return {
      graticule: geoGraticule()
    }
  },
  methods: {
    makeColor(item) {
      const d = this.rowByState.get(item.properties.name)
      return d ? this.colorScale(this.colorValue(d)) : "white"
    },
    drawCanvasMap() {
      this.atlasData.states.features.forEach(d => {
        this.vueCanvas.beginPath();
        this.path(d);
        this.vueCanvas.fillStyle = this.makeColor(d);
        this.vueCanvas.fill();
        this.vueCanvas.strokeStyle = this.strokeColor;
        this.vueCanvas.stroke()
      })
    }
  },
  computed: {
    projection() {
      // used bbox finder to find center and parallels http://bboxfinder.com
      // it's easy practice to use geojson and d3 library! topojson makes things a little difficult
      return geoAlbers()
          .parallels([4.702148, 54.162434])
          .rotate([0, 0])
          .center([10.546875, 50.7])
          .scale(3200)
    },
    path() {
      return geoPath(this.projection, this.vueCanvas)
    },
  },
  watch: {
    rkiData() {
      this.drawCanvasMap()
    }
  },
  mounted() {
    const c = document.getElementById("states");
    const ctx = c.getContext("2d");
    this.vueCanvas = ctx;
    this.drawCanvasMap()
  },
}

</script>
<style scoped>

</style>