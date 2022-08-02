<template>
  <HeaderNav></HeaderNav>
  <section class="wapper">
    <section>
      <img :src="setImg" class="thumbnail" alt="そのコースは存在しません" />
      <div></div>
    </section>
    <section v-if="contentTable" class="contentTable">
      <div v-for="(tr, index) in contentTable" :key="index">
        <div class="title">{{ tr.part }}</div>
        <ul>
          <li v-for="(chapter, index) in tr.chapter" :key="index">
            <router-link
              v-if="chapter.href != '#'"
              :to="{
                name: 'lecture',
                params: { name: name, id: chapter.href },
              }"
            >
              {{ chapter.title }}
            </router-link>
            <div v-else>
              <span class="making">制作中</span>
              {{ chapter.title }}
            </div>
          </li>
        </ul>
      </div>
      <div>{{ contentTable.mes }}</div>
    </section>
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
    // スライドの読み込み
    setImg() {
      try {
        const thumbnailSrc = this.$route.params.name + ".png";
        console.log(thumbnailSrc);
        return require("@/assets/thumbnail/" + thumbnailSrc);
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
  /* max-width: 600px; */
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1rem;
}

.thumbnail {
  max-width: 100%;
  /* max-height: 300px; */
}

.contentTable {
  max-height: 85vh;
  overflow: auto;
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

.making {
  background: lightgray;
  padding: 0 0.5rem;
  border-radius: 5px;
}
</style>
