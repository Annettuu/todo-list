<template>
  <div class="task-editing">
    <task-input @add-task="addTask" />
    <li class="task-editing_tasks">
      <ul
        v-for="task of listTask"
        :key="task.id"
        class="task-editing_task"
      >
        <item-task
          :task="task"
          @delete-task="deleteTask"
          @edit-task="editTask"
          @save-task="saveTask"
        />
      </ul>
    </li>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import taskInput from './components/input-task.vue';
import itemTask from './components/item-task.vue';

const store = useStore();
const listTask = computed(() => store.getters.getListTask);
const lastId = computed(() => store.getters.getLastId);


const addTask = (newTask) => {
  const newListTask = [{ id: lastId.value, content: newTask }, ...listTask.value];
  store.dispatch('updateListTask', newListTask);
  store.dispatch('updateLastId', lastId.value + 1);
};

const editTask = (id, contentTask) => {
  listTask.value.forEach(task => {
    if (task.id === id) {
      task.edit = true;
      contentTask.value = task.content;
    }
  });
};

const saveTask = (id, contentTask) => {
  const newListTask = listTask.value.map((task) => {
    if (task.id === id && contentTask.value) {
      task.content = contentTask.value;
      delete task.edit;
    }

    return task;
  });
  contentTask.value = '';
  store.dispatch('updateListTask', newListTask);
};

const deleteTask = (id) => {
  const newListTask = listTask.value.filter((item) => item.id !== id);
  store.dispatch('updateListTask', newListTask);
};

const loadData = () => {
  store.dispatch('loadListTask', listTask.value);
  store.dispatch('loadLastId', lastId.value);
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss">
.task-editing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &_tasks {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    list-style-type: none;
  }
  &_task {
    display: flex;
    justify-content: center;
  }
}
</style>