import { createStore } from "vuex";
// 各コースの目次
import table_jh_economy from "@/assets/jh_economy/table.json";
import table_jh_mathematics from "@/assets/jh_mathematics/table.json";
import table_beginner_programming from "@/assets/beginner_programming/table.json";

// 各シナリオの読み込み
import jh_economy_01 from "@/assets/jh_economy/01.json";
import jh_economy_02 from "@/assets/jh_economy/02.json";

export default createStore({
  state: {
    // 目次を一元化
    contentsTables: [
      { name: "jh_economy", data: table_jh_economy },
      {
        name: "jh_mathematics",
        data: table_jh_mathematics,
      },
      {
        name: "beginner_programming",
        data: table_beginner_programming,
      },
    ],
    // シナリオを一元化
    scenarios: [
      { name: "jh_economy", id: "01", data: jh_economy_01 },
      { name: "jh_economy", id: "02", data: jh_economy_02 },
    ],
  },
  getters: {
    // パスパラメータで目次を返す
    getTable: (state) => (tableName) => {
      // console.log(tableName);
      return state.contentsTables.find((table) => table.name === tableName)
        .data;
    },

    // パスパラメータでシナリオを返す
    getSenario: (state) => (name, id) => {
      // console.log(tableName);
      return state.scenarios.find(
        (scenario) => scenario.name === name && scenario.id === id
      ).data;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
