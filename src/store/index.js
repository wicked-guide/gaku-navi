import { createStore } from "vuex";
//
import table_jh_economy from "@/assets/jh_economy/table.json";
import table_jh_mathematics from "@/assets/jh_mathematics/table.json";

export default createStore({
  state: {
    tables: [
      { name: "jh_economy", data: table_jh_economy },
      {
        name: "jh_mathematics",
        data: table_jh_mathematics,
      },
    ],
  },
  getters: {
    getTable: (state) => (tableName) => {
      console.log(tableName);
      return state.tables.find((table) => table.name === tableName).data;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
