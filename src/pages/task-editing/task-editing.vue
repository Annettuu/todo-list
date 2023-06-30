<template>
  <div class="task-editing">
    <task-input @add-task="addTask" />
    <ul class="task-editing_tasks">
      <li
        v-for="task of tasks"
        :key="task.id"
        class="task-editing_task"
      >
        <v-task
          :task="task"
          @delete-task="onDeleteTask"
          @edit-task="onEditTask"
          @save-task="onSaveTask"
          @toggle-mode="onToggleMode"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import taskInput from './components/input-task.vue';
import VTask from './components/v-task.vue';

const store = useStore();
const tasks= computed(() => store.getters.getListTask);
const lastId = computed(() => store.getters.getLastId);

const addTask = (content) => {
  const newListTask = [{ id: lastId.value, content: content }, ...tasks.value];
  store.dispatch('updateListTask', newListTask);
  store.dispatch('updateLastId', lastId.value + 1);
};

const onEditTask = (id, content) => {
  tasks.value.forEach(task => {
    if (task.id === id) {
      task.edit = true;
      content.value = task.content;
    }
  });
};

const onSaveTask = (id, content) => {
  for (let i = 0; i < tasks.value.length; i++) {
    const task = tasks.value[i];
    if (task.id === id && content.value) {
      task.content = content.value;
      task.edit = false;
    }
  }
  content.value = '';
  store.dispatch('updateListTask', tasks.value);
};

const onDeleteTask = (id) => {
  const index = tasks.value.findIndex((item) => item.id === id);
  tasks.value.splice(index, 1);
  store.dispatch('updateListTask', tasks.value);
};

const onToggleMode = (id) => {
  tasks.value.forEach(task => {
    if (task.id === id) {
      task.edit = false;
    }
  });
};

const loadData = () => {
  store.dispatch('loadListTask', tasks.value);
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
  margin-bottom: 30px;
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