<template>
  <div>
    <div>
      <h2>Create</h2>
    </div>
    <div>
      <AudioPlayer :audio="audio" autoplay="true"/>
    </div>
    <div>
      <div>
        <label for="audio_source">Source</label>
        <input id="audio_source" type="text" v-model="audio.src" @click="audio.src = 'https://vignette.wikia.nocookie.net/leagueoflegends/images/f/f2/Diana_Select.ogg/revision/latest?cb=20121119074638'"/>
      </div>
      <div>
        <label for="audio_image">Image</label>
        <input id="audio_image" type="text" v-model="audio.img" @click="audio.img = 'https://pa1.narvii.com/6523/f9c9f9becbc37e1cf7d3862e54a1b3e4ef88ecd2_128.gif'"/>
      </div>
      <div>
        <form v-on:submit.prevent="addAnswer(answer)">
          <div>
            <label for="audio_answer">Answer</label>
            <input id="audio_answer" type="text" v-model="answer.text"/>
          </div>
          <div>
            <button type="submit">Add Answer</button>
          </div>
        </form>
      </div>
      <div>
        <div v-for="aswr in audio.answers">
          <input type="text" v-model="aswr.text">
          <input type="radio" name="correct" :checked="aswr.correct" @change="correctChange(aswr)">
          <span>Correct</span>
        </div>
      </div>
      <div>
        <button @click="addAudio(audio)">Add Audio</button>
      </div>
      <div>
        <div v-for="ex in audios">
          <div>
            Source: {{ ex.src }}
          </div>
          <div>
            Image: {{ ex.img }}
          </div>
          <div>
            Answers: {{ ex.answers.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AudioPlayer from '../../components/AudioPlayer'

export default {
  name: "Create",
  data () {
    return {
      audio: {
        src: '',
        img: '',
        answers: [],
        answered: false
      },
      answer: {
        text: '',
        correct: false
      }
    }
  },
  methods: {
    resetAudio () {
      this.audio = {
        src: '',
        img: '',
        answers: [],
        answered: false
      }
    },
    addAudio (audio) {
      if (audio.answers.length > 0) {
        const validIndex = audio.answers.findIndex(x => x.correct)
        if (validIndex > -1) {
          this.$store.commit('addAudio', audio)
          this.resetAudio()
        } else {
          alert('Correct answer must be selected!')
        }
      } else {
        alert('Answers must be informed!')
      }
    },
    addAnswer (answer) {
      this.audio.answers.push(answer)
      this.answer = {
        text: '',
        correct: false
      }
    },
    correctChange (answer) {
      this.audio.answers.map(x => {
        if (x.text === answer.text) x.correct = true
        else x.correct = false
      })
    }
  },
  computed: {
    audios () {
      return this.$store.getters['getAudios']
    }
  },
  components: {
    AudioPlayer
  }
}
</script>
<style lang="scss" scoped>
</style>
