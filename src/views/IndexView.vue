<template>
  <HeaderNav></HeaderNav>
  <section class="wapper">
    <section class="grid">
      <div class="card" v-for="c in course" :key="c.name">
        <router-link :to="{ name: 'table', params: { name: c.name } }">
          <img :src="require('@/assets/thumbnail/' + c.img + '.png')" />
          <div class="title">{{ c.title }}</div>
          <div class="date">{{ c.date }}</div>
        </router-link>
      </div>
    </section>
  </section>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "IndexView",
  components: { HeaderNav },
  data() {
    return {
      course: [
        {
          name: "jh_economy",
          img: "jh_economy",
          title: "中学生に学んで欲しい経済入門",
          date: "22022/02/02",
        },
        {
          name: "beginner_programming",
          img: "beginner_programming",
          title: "プログラミングはじめます？",
          date: "****",
        },
        {
          name: "jh_mathematics",
          img: "jh_mathematics",
          title: "ザックリ中学数学",
          date: "****",
        },
      ],
    };
  },
};
</script>

<style scoped>
.wapper {
  margin: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.card {
  background-color: white;
}

.card:hover {
  box-shadow: 1px 1px 3px;
}

.card img {
  width: 100%;
}

.card .title {
  padding: 0 1rem;
}

.card .date {
  padding: 0 1rem 0.5rem;
  text-align: end;
}

.card a {
  color: black;
  text-decoration: auto;
}
</style>
