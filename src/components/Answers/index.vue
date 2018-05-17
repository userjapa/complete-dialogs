<template>
<div class="item-border">
  <div class="container column">
    <div class="item">
      <h3>{{ exercise.title }}</h3>
    </div>
  </div>
  <div class="item">
    <div class="container align-items-start wrap">
      <div class="flex-basis-300 flex-grow-1 item margin-10 item-border">
        <div v-for="(ex, index) in exercise.audios"
        :ref="`audio${index}`"
        class="audio"
        :class="{
          disabled: !ex.answered
          }"
          @click="viewCurrent(ex, index)">
          <AudioPlayer :audio="ex" />
        </div>
      </div>
    </div>
  </div>
  <div class="item">
    <div class="container align-items-start wrap row">
      <div class="item margin-10 item-border flex-basis-300 flex-grow-1 list-content">
        <div v-for="(aswr, index) in current.answers" @click="selectAnswer(aswr, $event.target)" :ref="`answer${index}`" class="option" :class="{ right: checkRight(aswr, current), wrong: checkWrong(aswr, current), selected: aswr.selected }">
          {{ index + 1 }}) {{ aswr.text }}
        </div>
      </div>
      <div class="item">
        <button @click="setCurrent(exercise.audios)" v-if="current.answered && !ended" class="btn btn-primary">Next</button>
        <p v-if="ended">You've finished!</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import AudioPlayer from '../../components/AudioPlayer'

export default {
  name: "Answers",
  data() {
    return {
      current: {
        answers: [],
        answered: false,
        hit: false
      },
      ended: false
    }
  },
  methods: {
    setCurrent(audios) {
      for (const index in audios) {
        if (!audios[index].answered) {
          this.current = audios[index]
          this.ended = false
          break
        } else {
          if (parseInt(index) === (audios.length - 1)) {
            this.ended = 'true'
            this.current = audios[index]
          }
        }
      }
    },
    selectAnswer(answer, el) {
      if (!this.current.answered) {
        answer.selected = true
        this.current.answered = true
        if (answer.correct) this.current.hit = true
      }
    },
    checkRight (answer, audio) {
      if (answer.correct && audio.answered) return true
      else return false
    },
    checkWrong(answer, audio) {
      if (answer.selected && !answer.correct && audio.answered) return true
      else return false
    },
    checkAnswer(answers) {
      const selectedIndex = answers.findIndex(x => x.selected)
      if (selectedIndex >= 0) {
        if (answers[selectedIndex].correct) return true
      }
      return false
    },
    viewCurrent(audio, index) {
      if (audio && audio.answered && this.exercise.audios[this.currentIndex].answered) this.current = this.exercise.audios[this.currentIndex]
    },
    checkSelected(audio) {
      const index = audio.answers.findIndex(x => x.selected)
      if (index >= 0) return true
      else return false
    }
  },
  props: [
    'exercise'
  ],
  components: {
    AudioPlayer
  },
  watch: {
    audios: function () {
      this.ended = false
      this.setCurrent(this.exercise.audios)
    }
  },
  mounted () {
    this.setCurrent(this.exercise.audios)
  }
}
</script>
<style lang="scss" scoped>
.list-content {
    text-align: left;
    display: block;
    > div {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}

.option {
  background-color: #ddd;
  border-radius: 15px;
  padding-left: 10px;
}

.right {
  background-color: green;
}

.wrong {
  background-color: red;
}

.disabled {
  background-color: gray;
}

.selected {
  font-weight: bold;
}

.audio {
  background-color: #ddd;
  border-radius: 15px
}
</style>
