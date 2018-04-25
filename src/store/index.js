import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX)

export default new VueX.Store({
  state: {
    audios: [],
    toUpdate: null
  },
  getters: {
    getAudios ({ audios }) {
      return audios
    },
    isToUpdate({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    }
  },
  mutations: {
    addAudio (state, audio) {
      state.audios.push(audio)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    update (state, audio) {
      const index = state.toUpdate
      state.audios[index] = audio
    },
    remove (state, index) {
      state.audios.splice(index, 1)
    }
  }
})
