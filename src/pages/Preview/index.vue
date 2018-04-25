<template>
  <div>
    <div>
      <h2>Preview</h2>
    </div>
    <div>
      <Answers ref="answers"/>
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
  mounted () {
    const audios = this.$store.getters['getAudios']
    this.$refs['answers'].setGame(audios)
  }
}
</script>
<style lang="scss" scoped>
</style>
