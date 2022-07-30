<template>
  <section class="wapper">
    <img :src="thumbnail" class="thumbnail" />
    <div>{{ $route.params.name }}</div>

    <!-- <div v-for="(tr, index) in table" :key="index">
      {{ tr.part }}
      <ul>
        <li v-for="(chapter, index) in tr.chapter" :key="index">
          {{ chapter.title }}
        </li>
      </ul>
    </div> -->
    <div>{{ contentTable }}</div>
  </section>
</template>

<script>
export default {
  name: "TableView",
  components: {},
  data() {
    return {
      name: this.$route.params.name,
      thumbnail: "/thumbnail/" + this.$route.params.name + ".png",
    };
  },

  computed: {
    contentTable() {
      const tableName = this.$route.params.name;
      return this.$store.getters.getTable(tableName);
    },
  },
};
</script>

<style scoped>
.wapper {
  margin: auto;
  padding: 0 2rem;
  max-width: 800px;
}

.thumbnail {
  max-width: 100%;
  max-height: 300px;
}
</style>
