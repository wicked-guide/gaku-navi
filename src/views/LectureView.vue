<template>
  <section class="wapper">
    <div>{{ name }}</div>
    <div>{{ id }}</div>
    <div v-if="senario">json:{{ senario }}</div>

    <!-- エラー時の処理 -->
    <div v-else>そのIDはありません</div>
  </section>
</template>

<script>
export default {
  name: "LectureView",
  components: {},
  data() {
    return {
      name: this.$route.params.name,
      id: this.$route.params.id,
    };
  },
  computed: {
    senario() {
      try {
        return this.$store.getters.getSenario(this.name, this.id);
      } catch {
        return { mes: "制作中です" };
      }
    },
  },
};
</script>

<style scoped>
.wapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(@/assets/background/classroom.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
}
</style>
