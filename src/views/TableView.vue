<template>
  <HeaderNav></HeaderNav>
  <section class="wapper">
    <div>
      <img
        :src="require('@/assets/thumbnail/' + thumbnail)"
        class="thumbnail"
        alt="制作中"
      />
      <div
        v-for="(tr, index) in contentTable"
        :key="index"
        class="contentTable"
      >
        <div class="title">{{ tr.part }}</div>
        <ul>
          <li v-for="(chapter, index) in tr.chapter" :key="index">
            <router-link
              :to="{
                name: 'lecture',
                params: { name: name, id: chapter.href },
              }"
            >
              {{ chapter.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "TableView",
  components: { HeaderNav },
  data() {
    return {
      name: this.$route.params.name,
      thumbnail: this.$route.params.name + ".png",
    };
  },

  computed: {
    contentTable() {
      try {
        return this.$store.getters.getTable(this.name);
      } catch {
        return { mes: "制作中です" };
      }
    },
  },
};
</script>

<style scoped>
.wapper {
  margin: 2rem auto;
  padding: 0 2rem;
  max-width: 600px;
}

.thumbnail {
  max-width: 100%;
  /* max-height: 300px; */
}

.contentTable .title {
  padding-left: 0.5rem;
  font-size: large;
  font-weight: bold;
  border-left: steelblue solid 5px;
  border-bottom: solid steelblue thin;
}

.contentTable ul {
  margin: 0 0 1rem;
  list-style: decimal;
  font-size: larger;
}

.contentTable ul li {
  margin: 0.2rem 0;
}

.contentTable ul a {
  display: block;
  padding: 0 0.5rem;
  color: black;
  text-decoration: auto;
}

.contentTable ul a:hover {
  background-color: steelblue;
  color: white;
}
</style>
