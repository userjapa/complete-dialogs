<template>
  <div>
    <div>
      <h2>Preview</h2>
    </div>
    <div>
      <Answers :audios="audios"/>
    </div>
  </div>
</template>
<script>
import Answers from '../../components/Answers'

export default {
  name: "Preview",
  components: {
    Answers
  },
  computed: {
    audios () {
      return this.$store.getters['getAudios']
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
