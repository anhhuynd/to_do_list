<template>
  <div class="container">
    <div v-if="getterTask">
      <form v-for="(TaskDetail, index) in getterTask" :key="index">
        <div class="centerbox">
          <div v-if="TaskDetail.type == 0">
            <input
              @change="checkbok(TaskDetail._id, $event)"
              type="checkbox"
              id="engineering"
              name="user_interest"
              v-model="toggle[index]"
            /><label class="light" for="engineering">{{
              TaskDetail.newTask
            }}</label>
          </div>
          <div v-else>
            <label
              class="light"
              for="engineering"
              style="text-decoration: line-through"
              >{{ TaskDetail.newTask }}</label
            >
          </div>

          <div class="floatright" v-if="TaskDetail.type == 0">
            <button
              class="button_click"
              style="background: #0bb3e5"
              @click.prevent="DetailTask(TaskDetail._id)"
            >
              Detail</button
            ><button
              class="button_click"
              style="background: red"
              @click.prevent="removeTaskId(TaskDetail._id)"
            >
              Remove
            </button>
          </div>
        </div>
        <div
          v-if="showDetail == TaskDetail._id"
          style="margin-bottom: 70px; margin-top: 40px"
        >
          <input
            type="text"
            id="name"
            placeholder="Add new task"
            v-model="taskDetail.newTask"
          />

          <label for="bio" class="textBoldlable">Descripttion</label>
          <textarea
            id="bio"
            name="student_bio"
            rows="22"
            cols="50"
            v-model="taskDetail.contentNewTask"
          ></textarea>

          <div class="option_new_task">
            <div class="option_detail">
              <label class="textBoldlable">Due Date</label>
              <input
                type="date"
                id="birthday"
                placeholder="Date"
                v-model="taskDetail.dateNewTask"
              />
            </div>
            <div class="option_detail">
              <label class="textBoldlable">Piority</label>
              <select id="courses" v-model="taskDetail.choosePiority">
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

          <button type="submit" @click.prevent="UpdateStack(UpdateStack._id)">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "../../../static/css/task-style.css";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeCheckBox: [],
      taskDetail: null,
      showDetail: null,
      toggle:[],
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
    };
  },
  computed: {
    ...mapGetters(["getterTask"]),
  },
  destroyed: {},
  methods: {
    checkbok(_id, $event) {
      if ($event.target.checked) {
        let check = $event.target.checked;
        let data = { _id, check };
        let resultInsert = this.$store.dispatch("addBulkAction", data);
      } else {
        let check = $event.target.checked;
        let data = { _id, check };
        let resultInsert = this.$store.dispatch("removeBulkAction", data);
      }
    },
    DetailTask(_id) {
      const vm = this;
      if (vm.showDetail) {
        vm.showDetail = null;
      } else {
        vm.showDetail = _id;
        vm.taskDetail = vm.getterTask.filter(
          (element) => element._id == _id
        )[0];
      }
    },
    UpdateStack(_id) {
      let data = this.taskDetail;
      
      if (data.newTask.length == 0) {
        alert("Trường New Task không có dữ liệu");
        return false;
      }
      if (data.contentNewTask.length == 0) {
        alert("Trường Descripttion không có dữ liệu");
        return false;
      }
      this.$store.dispatch("UpdateTaskDetailAction", data);
      this.showDetail = null;
    },
    removeTaskId(_id) {
      let data = { _id };
      let resultInsert = this.$store.dispatch("removeTaskIdAction", data);
    },
  },
};
</script>

<style scoped>
.box_detail_task {
  width: 1000px;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 70px;
}
.button_click {
  width: 100px;
  height: 30px;
  margin-right: 20px;
}

.centerbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>