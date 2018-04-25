<template>
  <div>
    <div>
      <img :src="audio.img">
      <audio
        ref="audio"
        :src="audio.src"
        @playing="isPlaying = true"
        @pause="isPlaying = false"
        @loadeddata="loadedData($event.target)"
        @timeupdate="timeUpdated($event.target)"
      />
      <input
        type="range"
        v-model="time"
        :max="duration"
        step="0.000001"
        @change="timeChanged(time)"
        @input="timeChanged(time)"
      />
      <button @click="play()" v-if="!isPlaying" :disabled="!loaded">Play</button>
      <button @click="pause()" v-else :disabled="!loaded">Pause</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AudioPlayer",
  data () {
    return {
      loaded: false,
      isPlaying: false,
      duration: 0,
      time: 0,
      answers: []
    }
  },
  methods: {
    play () {
      this.$refs['audio'].play()
    },
    pause () {
      this.$refs['audio'].pause()
    },
    loadedData (audio) {
      this.duration = audio.duration
      this.loaded = true
      if (this.autoplay) audio.play()
    },
    timeChanged (time) {
      this.$refs['audio'].currentTime = time
    },
    timeUpdated (audio) {
      this.time = audio.currentTime
    }
  },
  props: [
    'audio',
    'autoplay'
  ],
  watch: {
    'audio.src': function () {
      this.loaded = false
      this.duration = 0
      this.$refs['audio'].load()
    }
  }
}
</script>
<style lang="scss" scoped>
img {
  width: 50px;
}
</style>
