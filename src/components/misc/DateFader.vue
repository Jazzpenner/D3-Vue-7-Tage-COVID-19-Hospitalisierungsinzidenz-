<template>
  <div :style="`width:${width + 25}px`">
    <input
        type="range"
        min="1"
        :max="numDates"
        v-model="faderPosition"
        @mouseup="pushDateToAtlas()"
        class="slider"
        id="myRange"
    >
  </div>
  <div>{{ faderPosition ? xFormat(monthTicks[faderPosition - 1]) : null }}</div>
</template>

<script>
import {timeDay} from "d3";

export default {
  name: "DateFader",
  props: {
    width: Number,
    atlasCallback: Function,
    lineCallback: Function,
    xScale: Function,
    xFormat: Function,
  },
  data() {
    return {
      initialValue: 40,
      faderPosition: null,
    }
  },
  watch: {
    faderPosition() {
      this.pushDateToLine()
    }
  },
  computed: {
    monthTicks() {
      const [startV, stopV] = this.xScale.domain()
      return timeDay.every(1).range(startV, stopV)
    },
    numDates() {
      return this.monthTicks.length
    }
  },
  methods: {
    pushDateToAtlas() {
      this.atlasCallback(this.monthTicks[this.faderPosition - 1])
    },
    pushDateToLine() {
      this.lineCallback(this.monthTicks[this.faderPosition - 1])
    },
    initFader() {
      if (!this.faderPosition) {
        this.faderPosition = this.numDates
        this.atlasCallback(this.monthTicks[this.faderPosition - 1])
      } else {
        throw Error("position of fader already set.")
      }
    }
  },
  mounted() {
    this.initFader()
  }

}
</script>

<style scoped>

/* The slider itself */
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.6; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #137B80; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #137B80; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>