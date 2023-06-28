import { createStore } from 'vuex';
import { listTask } from './modules/list-task.js';

export default createStore({
  modules: { listTask }
});
