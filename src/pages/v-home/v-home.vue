<template>
  <div class="v-home">
    <div class="v-home_tasks">
      <div
        v-for="task of listTask"
        :key="task.id"
        class="v-home_task"
      >
        <task-item
          :task="task"
          @done-task="doneTask"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import taskItem from './components/task-item.vue';

const store = useStore();
const listTask = computed(() => store.getters.getListTask);

const doneTask = (id) => {
  const newListTask = listTask.value.map(task => {
    if (task.id === id) {
      task.done = !task.done;
    }

    return task;
  });
  store.dispatch('updateListTask', newListTask);
};

const loadData = () => {
  store.dispatch('loadListTask', listTask.value);
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss">
.v-home {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;

  &_tasks {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  &_task {
    justify-content: center;
    display: flex;
  }
}
</style>