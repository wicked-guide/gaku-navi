import { createRouter, createWebHashHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import TableView from "../views/TableView.vue";
import LectureView from "../views/LectureView.vue";
import CalculationView from "../views/CalculationView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: IndexView,
  },
  {
    path: "/:name",
    name: "table",
    component: TableView,
  },
  {
    path: "/:name/:id",
    name: "lecture",
    component: LectureView,
  },
  {
    path: "/Calculation",
    name: "Calculation",
    component: CalculationView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
