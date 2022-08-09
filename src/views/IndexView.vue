<template>
  <HeaderNav></HeaderNav>
  <section class="wapper" :class="{ 'extra-wapper': extra }">
    <!-- メインコース -->
    <section class="grid">
      <div class="card" v-for="c in course" :key="c.name">
        <router-link :to="{ name: 'table', params: { name: c.name } }">
          <img :src="require('@/assets/thumbnail/' + c.name + '.png')" />
          <div class="title">{{ c.title }}</div>
          <div class="date">{{ c.date }}</div>
        </router-link>
      </div>
    </section>

    <!-- おまけ -->
    <section v-show="extra" class="extra">
      <!-- <div>おまけ</div> -->
      <router-link to="Calculation">ランダム計算</router-link>
      <router-link to="areavolume">ランダム面積</router-link>
      <router-link to="hajiki">速さ時間距離</router-link>
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
          title: "中学生に学んで欲しい経済入門",
          date: "22022/02/02",
        },
        {
          name: "beginner_programming",
          title: "プログラミングはじめます？",
          date: "****",
        },
        {
          name: "jh_mathematics",
          title: "ザックリ中学数学",
          date: "****",
        },
        {
          name: "giveup-English",
          title: "ギブアップ英語",
          date: "****",
        },
      ],
      extra: true,
    };
  },
};
</script>

<style scoped>
.wapper {
  margin: 2rem;
}

.extra-wapper {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

/* コース */
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

/* おまけ */
.extra {
  background: floralwhite;
  padding: 1rem;
  border-radius: 10px;
}

.extra a {
  display: block;
  text-decoration: none;
  color: steelblue;
  padding: 0.5rem;
  border-radius: 10px;
}

.extra a:hover {
  background-color: steelblue;
  color: white;
}
</style>
