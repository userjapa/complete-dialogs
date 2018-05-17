import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    exercise: {
      title: ``,
      audios: []
    },
    toUpdate: null
  },
  getters: {
    getExercise ({ exercise }) {
      return exercise
    },
    getAudios ({ exercise }) {
      return exercise.audios
    },
    isToUpdate({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    }
  },
  mutations: {
    saveExercise (state, exercise) {
      state.exercise = exercise
    },
    addAudio (state, audio) {
      state.exercise.audios.push(audio)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    update (state, audio) {
      const index = state.toUpdate
      state.exercise.audios[index] = audio
    },
    remove (state, index) {
      state.exercise.audios.splice(index, 1)
    }
  }
})
