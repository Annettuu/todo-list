<template>
  <div class="v-home">
    <v-empty
      v-if="!tasks.length"
      :is-first-visit="isFirstVisit"
    />
    <ul class="v-home_tasks">
      <li
        v-for="task of tasks"
        :key="task.id"
        class="v-home_task"
      >
        <task-item
          :task="task"
          @done-task="doneTask"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import taskItem from './components/task-item.vue';
import vEmpty from './components/v-empty.vue';

const store = useStore();
const tasks = computed(() => store.getters.getListTask);
const isFirstVisit = ref(false);

const doneTask = (id) => {
  for (let i = 0; i < tasks.value.length; i++) {
    const task = tasks.value[i];
    if (task.id === id) {
      task.done = !task.done;
    }
  }
  store.dispatch('updateListTask', tasks.value);
};

const loadData = () => {
  store.dispatch('loadListTask', tasks.value);
};

onMounted(() => {
  loadData();
  watchVisited();
});

const watchVisited = () => {
  const visitedBefore = localStorage.getItem('visitedBefore');
  if (!visitedBefore) {
    isFirstVisit.value = true;
    localStorage.setItem('visitedBefore', 'true');
  }
};
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