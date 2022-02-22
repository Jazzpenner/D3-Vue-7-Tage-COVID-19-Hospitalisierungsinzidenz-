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


.slider {
  -webkit-appearance: none; 
  appearance: none;
  width: 100%; 
  height: 25px; 
  background: #d3d3d3; 
  outline: none; 
  opacity: 0.6; 
  -webkit-transition: .2s; 
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1; 
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px; 
  height: 25px; 
  background: #137B80; 
  cursor: pointer; 
}

.slider::-moz-range-thumb {
  width: 25px; 
  height: 25px; 
  background: #137B80; 
  cursor: pointer;
}
</style>
