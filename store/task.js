import StorageService from "../common/storage.service";
import moment from "moment";

var storageTask = JSON.parse(StorageService.get("task"))
  ? JSON.parse(StorageService.get("task"))
  : [];

const state = {
  Tasks: storageTask,
  bulkAction: [],
  showAddNewTask: false
};

const getters = {
  getterTask: state => {
    return state.Tasks;
  },
  getterBulkAction: state => {
    return state.bulkAction;
  },
  getterShowAddNewTask: state => {
    return state.showAddNewTask;
  }
};

const mutations = {
  mutationsNewTask(state, value) {
    state.Tasks = JSON.parse(StorageService.get("task"));
    if (state.Tasks == []) {
      state.Tasks.push(value);
    } else {
      let data = state.Tasks.filter(
        elment => moment(elment.dateNewTask) > moment(value.dateNewTask)
      )[0];
      if (!data) {
        state.Tasks.push(value);
      } else {
        let index = state.Tasks.findIndex(e => e._id == data._id);
        state.Tasks.splice(index, 0, value);
      }
    }
    StorageService.save("task", JSON.stringify(state.Tasks));
  },
  mutationsAddBulkAction(state, value) {
    state.bulkAction.push(value);
  },
  mutationsRemoveBulkAction(state, value) {
    let index = state.bulkAction.findIndex(element => element._id == value._id);
    state.bulkAction.splice(index, 1);
  },
  mutationsDeleteBulkAction(state, value) {
    state.bulkAction = [];
    value.forEach(element => {
      state.Tasks = state.Tasks.filter(e => e._id !== element._id);
    });
    StorageService.save("task", JSON.stringify(state.Tasks));
  },
  mutationsDoneBulkAction(state, value) {
    value.forEach(element => {
      let index = state.Tasks.findIndex(e => e._id == element._id);
      state.Tasks[index].type = 1;
    });
    StorageService.save("task", JSON.stringify(state.Tasks));
  },
  mutationsUpdateDetailAction(state, value) {
    let index = state.Tasks.findIndex(e => e._id == value._id);
    state.Tasks.splice(index, 1);
    if (state.Tasks == []) {
      state.Tasks.push(value);
    } else {
      let data = state.Tasks.filter(
        elment => moment(elment.dateNewTask) > moment(value.dateNewTask)
      )[0];
      if (!data) {
        state.Tasks.push(value);
      } else {
        let index = state.Tasks.findIndex(e => e._id == data._id);
        state.Tasks.splice(index, 0, value);
      }
    }

    StorageService.save("task", JSON.stringify(state.Tasks));
  },
  mutationsRemoveTaskIdAction(state, value) {
    state.Tasks = state.Tasks.filter(e => e._id !== value._id);
    StorageService.save("task", JSON.stringify(state.Tasks));
  },
  mutationsShowAddNewTaskAction(state, value) {
    state.showAddNewTask = value;
  },
  mutationsSearchNameAction(state, value) {
    if(value.length >0 ){
      let data = JSON.parse(StorageService.get("task"));
      let check = data.filter(element => {
       return  element.newTask.toLowerCase().indexOf(value.toLowerCase()) > -1
      })
      state.Tasks = check
    }else{
      state.Tasks = JSON.parse(StorageService.get("task"));
    }
  }
};

const actions = {
  insertNewTask({ commit }, data) {
    commit("mutationsNewTask", data);
    return true;
  },
  removeTask({ commit }, data) {
    commit("mutationsNewTask", data);
    return true;
  },
  addBulkAction({ commit }, data) {
    commit("mutationsAddBulkAction", data);
  },
  deleteBulkAction({ commit }, data) {
    commit("mutationsDeleteBulkAction", data);
  },
  removeBulkAction({ commit }, data) {
    commit("mutationsRemoveBulkAction", data);
  },
  doneBulkAction({ commit }, data) {
    commit("mutationsDoneBulkAction", data);
  },
  UpdateTaskDetailAction({ commit }, data) {
    commit("mutationsUpdateDetailAction", data);
  },
  removeTaskIdAction({ commit }, data) {
    commit("mutationsRemoveTaskIdAction", data);
  },
  showAddNewTask({ commit }, data) {
    commit("mutationsShowAddNewTaskAction", data);
  },
  searchName({ commit }, data) {
    commit("mutationsSearchNameAction", data);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
