<template>
  <div class="container">
    <form
      v-if="getterBulkAction.length > 0"
      style="
        background: rgb(227, 227, 227);
        position: fixed;
        bottom: 0;
        margin-bottom: 0px;
        width: 80%;
        left: 27%;
      "
    >
      <div class="centerbox">
        <div>
          <label class="light" for="engineering">Bulk Action</label>
        </div>
        <div class="floatright">
          <button
            class="button_click"
            style="background: #0bb3e5"
            @click="doneBulkAction"
          >
            Done</button
          ><button
            class="button_click"
            style="background: red"
            @click="removeBulkAction"
          >
            Remove
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import "../../../static/css/task-style.css";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getterBulkAction"]),
  },
  methods: {
    checkbok(index) {
      this.$store.dispatch("showbulkAction", true);
    },
    removeBulkAction() {
      let items = this.getterBulkAction;
      this.$store.dispatch("deleteBulkAction", items);
    },
    doneBulkAction() {
      let items = this.getterBulkAction;
      this.$store.dispatch("doneBulkAction", items);
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