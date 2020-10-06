<template>
  <div class="container">
    <form>
      <h4 class="newtask">New Task</h4>
      <input
        type="text"
        id="name"
        placeholder="Add new task"
        v-model="newTask"
        required
      />

      <label for="bio" class="textBoldlable">Descripttion</label>
      <textarea
        required
        id="bio"
        name="student_bio"
        rows="22"
        cols="50"
        v-model="contentNewTask"
      ></textarea>

      <div class="option_new_task">
        <div class="option_detail">
          <label class="textBoldlable">Due Date</label>
          <input
            type="date"
            id="birthday"
            placeholder="Date"
            v-model="dateNewTask"
          />
        </div>
        <div class="option_detail">
          <label class="textBoldlable">Piority</label>
          <select id="courses" v-model="choosePiority">
            <option
              v-for="option in optionPiority"
              :key="option.value"
              v-bind:value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" @click.prevent="addNewStak">Add</button>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import "../../../static/css/task-style.css";
export default {
  data() {
    return {
      optionPiority: [
        {
          value: 1,
          label: "Low",
        },
        {
          value: 2,
          label: "Normal",
        },
        {
          value: 3,
          label: "Hight",
        },
      ],
      choosePiority: 2,
      newTask: '',
      contentNewTask: '',
      dateNewTask: moment().format("YYYY-MM-DD"),
    };
  },
  methods: {
    addNewStak() {
      let newTask = this.newTask;
      let contentNewTask = this.contentNewTask;
      let dateNewTask = this.dateNewTask;
      let choosePiority = this.choosePiority;
      let _id = Math.random().toString(36).substring(7);
      let type = 0;
      let data = {
        _id,
        newTask,
        contentNewTask,
        dateNewTask,
        choosePiority,
        type,
      };
      if(newTask.length == 0){
        alert('Trường New Task không có dữ liệu')
        return false
      }
      if(contentNewTask.length == 0){
        alert('Trường Descripttion không có dữ liệu')
        return false
      }
      let resultInsert = this.$store.dispatch("insertNewTask", data);
      if (resultInsert) {
        this.newTask = null;
        this.contentNewTask = null;
        this.$store.dispatch("showAddNewTask", false);
      }
    },
  },
};
</script>

<style scoped>
</style>