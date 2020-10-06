import Vue from "vue";
import Vuex from "vuex";
import Task from "./task";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Task
  }
});
