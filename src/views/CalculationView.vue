<template>
  <HeaderNav></HeaderNav>
  <section class="wapper">
    <h1>ランダム計算トレーニング</h1>
    <!-- 計算種類の選択 -->
    <div class="type">
      <template v-for="(t, index) in type" :key="index">
        <button
          @click="
            selectType = t;
            randNum();
          "
          class="fs-xl"
          :class="{ active: selectType == t }"
        >
          {{ t }}
        </button>
      </template>
    </div>
    <!-- <button @click="randNum">ランダム</button> -->
    <!-- 計算ゾーン -->
    <section class="calculation">
      <!-- 割り算以外 -->
      <table v-show="selectType != '÷'">
        <tr v-for="(tr, index) in question" :key="index">
          <td>{{ tr.x }}</td>
          <td>{{ selectType }}</td>
          <td>{{ tr.y }}</td>
          <td>=</td>
          <td>
            <input type="number" max="9999" v-model="answer[index]" />
          </td>
          <td v-show="selectType == '+'">
            <span v-show="answer[index] == tr.addition" class="good">
              正解
            </span>
          </td>
          <td v-show="selectType == '-'">
            <span v-show="answer[index] == tr.subtraction" class="good">
              正解
            </span>
          </td>
          <td v-show="selectType == '×'">
            <span v-show="answer[index] == tr.multiplication" class="good">
              正解
            </span>
          </td>
          <!-- カンニング用 -->
          <!-- <td v-show="selectType == '+'">{{ tr.addition }}</td>
          <td v-show="selectType == '-'">{{ tr.subtraction }}</td>
          <td v-show="selectType == '×'">{{ tr.multiplication }}</td> -->
        </tr>
      </table>

      <!-- 割り算 -->
      <table v-show="selectType == '÷'">
        <tr v-for="(tr, index) in question" :key="index">
          <td>{{ tr.multiplication }}</td>
          <td>÷</td>
          <td>{{ tr.x }}</td>
          <td>=</td>
          <td><input type="number" max="9999" v-model="answer[index]" /></td>
          <!-- カンニング用 -->
          <!-- <td>{{ tr.y }}</td> -->

          <td>
            <span v-show="answer[index] == tr.y" class="good">正解</span>
          </td>
        </tr>
      </table>
    </section>
  </section>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "CalcView",
  components: { HeaderNav },
  data() {
    return {
      type: ["+", "-", "×", "÷"],
      selectType: "+",
      question: [],
      answer: [],
    };
  },
  methods: {
    randNum() {
      this.question = [];
      this.answer = [];
      if (this.selectType == "+" || this.selectType == "-") {
        for (let i = 1; i < 10; i++) {
          let rx = 1 + Math.floor(Math.random() * 99);
          let ry = 1 + Math.floor(Math.random() * rx);
          this.question.push({
            x: rx,
            y: ry,
            addition: rx + ry,
            subtraction: rx - ry,
            multiplication: rx * ry,
          });
        }
      } else {
        for (let i = 1; i < 10; i++) {
          let rx = 2 + Math.floor(Math.random() * 8);
          let ry = 2 + Math.floor(Math.random() * 8);
          this.question.push({
            x: rx,
            y: ry,
            addition: rx + ry,
            subtraction: rx - ry,
            multiplication: rx * ry,
          });
        }
      }
    },
  },
  mounted() {
    this.randNum();
  },
};
</script>

<style scoped>
.wapper {
  margin: 2rem;
  user-select: none;
}
.type {
  margin-bottom: 1rem;
}

.type button {
  font-size: x-large;
}

.active {
  background: aquamarine;
}
.calculation {
  text-align: end;
}
.calculation input {
  width: 5rem;
  text-align: end;
  font-size: larger;
}

.good {
  padding: 0.2rem;
  border-radius: 5px;
  background: aquamarine;
}
</style>
