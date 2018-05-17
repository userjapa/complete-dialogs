<template>
  <div>
    <div class="player">
      <div class="play">
        <button class="btn btn-primary" @click="play()" :disabled="isPlaying">
          <font-awesome-icon :icon="iconSound" />
        </button>
      </div>
      <div class="image">
        <img :src="audio.img">
      </div>

      <audio ref="audio"
             :src="audio.src"
             @playing="isPlaying = true"
             @pause="isPlaying = false"
             @loadeddata="loadedData($event.target)"
             @timeupdate="timeUpdated($event.target)"
             @ended="$event.target.currentTime = 0" />

      <div class="container column">
        <div class="item no-padding">
          <div class="container">
            <div class="item padding-5">
              <span class="answer" :class="{ selected: audio.answered }">{{ getSelected(audio) }}</span>
            </div>
          </div>
        </div>
        <div class="item no-padding">
          <div class="container row wrap">
            <div class="item flex-basis-100 padding-5">
              <input type="range"
                     v-model="time"
                     :max="duration"
                     step="0.000001"
                     @change="timeChanged(time)"
                     @input="timeChanged(time)"
              />
            </div>
            <div class="item flex-basis-50 padding-5">
              <input type="range"
                     v-model="volume"
                     step="0.001"
                     @change="changeVolume(volume)"
                     @input="changeVolume(volume)"
                     max="1">
            </div>
          </div>
        </div>
      </div>

      <div class="correct">
        <font-awesome-icon class="result right" :icon="iconRight" v-if="audio.hit && audio.answered"/>
        <font-awesome-icon class="result wrong" :icon="iconWrong" v-if="!audio.hit && audio.answered"/>
      </div>
    </div>
  </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faVolumeUp from '@fortawesome/fontawesome-free-solid/faVolumeUp'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

export default {

  name: "AudioPlayer",
  data () {
    return {
      loaded: false,
      isPlaying: false,
      duration: 0,
      volume: 1,
      time: 0,
      answers: []
    }
  },
  methods: {
    play () {
      this.$refs['audio'].play()
    },
    loadedData (audio) {
      this.duration = audio.duration
      this.loaded = true
    },
    timeChanged (time) {
      this.$refs['audio'].currentTime = time
    },
    timeUpdated (audio) {
      this.time = audio.currentTime
    },
    changeVolume(volume) {
     this.$refs['audio'].volume = volume
    },
    getSelected (audio) {
      if (!audio.answered) return 'Selecione o som correspondente'
      else {
        const index = audio.answers.findIndex(x => x.selected)
        return audio.answers[index].text
      }
    }
  },
  props: [
    'audio'
  ],
  computed: {
    iconSound () {
      return faVolumeUp
    },
    iconRight () {
      return faCheck
    },
    iconWrong () {
      return faTimes
    }
  },
  components: {
    FontAwesomeIcon
  },
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
.player {
  width: 100%;
  border-radius: 4px;
  margin: 10px;
  padding: 5px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
    .image {
      width: 50px;
      height: 50px;
      background: red;
      img {
        width: 100%;
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }
    input {
      width: 100%;
      margin: 0 auto;
    }
    .correct {
      margin: auto 20px auto auto;
      width: 40px;
      height: 40px;
      .result {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        text-align: center;
        line-height: 100px;
        vertical-align: middle;
        padding: 10px;
        color: #ddd;
      }
      .right {
        background-color: green;
      }
      .wrong {
        background-color: red;
      }
    }
}

.play {
  margin-right: 10px;
  button {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
}

.no-padding {
  padding: 0;
}

span.answer {
  display: inline-block;
  width: 100%;
  height: 25px;
  border-radius: 15px;
  background-color: #efefef;
  word-break: break-all;
  overflow: hidden;
}

span.answer.selected {
  background-color: #ff9c00
}

.padding-5 {
  padding: 5px !important;
  padding-bottom: 0 !important;
}
</style>
