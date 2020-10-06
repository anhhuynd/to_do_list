<template>
  <div class="container">
    <div>
      <button class="clickNewTask" @click="showAddNewTask">Add New Task</button>
    </div>
    <input class="search" v-model="searchTitle" placeholder="Tìm kiếm"  >
    <NewTask v-if="getterShowAddNewTask" />
    <BoxNewTask />
    <BoxBulkAction />
  </div>
</template>

<script>
import NewTask from "../components/NewTask/NewTask";
import BoxNewTask from "../components/BoxNewTask/BoxNewTask";
import BoxBulkAction from "../components/BulkAction/BoxBulkAction";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isShowAddNewTask: false,
      searchTitle:null
    };
  },
  computed: {
    ...mapGetters(["getterShowAddNewTask"]),
  },
  watch:{
    searchTitle(){
      let data = this.searchTitle
      this.$store.dispatch("searchName", data);
    }
  },
  methods: {
    showAddNewTask() {
      if (this.getterShowAddNewTask) {
        this.$store.dispatch("showAddNewTask", false);
      } else {
        this.$store.dispatch("showAddNewTask", true);
      }
    },
    
  },
  components: {
    NewTask,
    BoxNewTask,
    BoxBulkAction,
  },
};
</script>

<style scoped>
.clickNewTask {
  text-align: center;
  width: 200px;
  margin-left: 60%;
} 
input.search {
    justify-content: center;
    width: 500px;
    padding: 7px;
    text-align: center;
    margin-left: 32%;
    margin-top: 10px;
    border: 1px solid #8a97a0;
    border-radius: 3px;
}
</style>