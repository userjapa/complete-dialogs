<template>
  <div>
    <div>
      <h2>Create</h2>
    </div>
    <div>
      <Answers ref="answers"/>
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
        <div v-for="(aswr, index) in audio.answers">
          <input type="text" v-model="aswr.text">
          <input type="radio" name="correct" :checked="aswr.correct" @change="correctChange(aswr)">
          <span>Correct</span>
          <button @click="removeAnswer(index)">Remove</button>
        </div>
      </div>
      <div>
        <button @click="addAudio(audio)" v-if="!isToUpdate">Add Audio</button>
        <button @click="update(audio)" v-else>Edit</button>
        <button @click="cancelUpdate()" v-if="isToUpdate">Calcel</button>
      </div>
      <div>
        <div v-for="(ex, index) in audios">
          <div>
            Source: {{ ex.src }}
          </div>
          <div>
            Image: {{ ex.img }}
          </div>
          <div>
            Answers: {{ ex.answers.length }}
          </div>
          <div>
            <button @click="edit(ex, index)">Edit</button>
            <button @click="remove(index)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AudioPlayer from '../../components/AudioPlayer'
import Answers from '../../components/Answers'

export default {
  name: "Create",
  data () {
    return {
      audio: {
        src: 'https://vignette.wikia.nocookie.net/leagueoflegends/images/f/f2/Diana_Select.ogg/revision/latest?cb=20121119074638',
        img: 'https://pa1.narvii.com/6523/f9c9f9becbc37e1cf7d3862e54a1b3e4ef88ecd2_128.gif',
        answers: [
          {
            text: 'A new moon is rising',
            correct: true
          },
          {
            text: 'A new moon is raising',
            correct: false
          },
          {
            text: 'A new doom is raising',
            correct: false
          },
          {
            text: 'A few moon is rising',
            correct: false
          }
        ],
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
          this.$refs['answers'].setGame(this.audios)
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
    },
    edit (audio, index) {
      this.audio = audio
      this.$store.commit('setToUpdate', index)
    },
    update (audio) {
      this.$store.commit('update', audio)
      this.$refs['answers'].setGame(this.audios)
      this.cancelUpdate()
    },
    cancelUpdate () {
      this.$store.commit('setToUpdate', null)
      this.resetAudio()
    },
    remove (index) {
      this.$store.commit('remove', index)
    },
    removeAnswer (index) {
      this.audio.answers.splice(index, 1)
    }
  },
  computed: {
    audios () {
      return this.$store.getters['getAudios']
    },
    isToUpdate () {
      return this.$store.getters['isToUpdate']
    }
  },
  components: {
    AudioPlayer,
    Answers
  }
}
</script>
<style lang="scss" scoped>
</style>
