<template>
  <div class="v-home">
    <vZaglushka
      v-if="!listTask.length"
      :is-first-visit="isFirstVisit"
    />
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
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import taskItem from './components/task-item.vue';
import vZaglushka from './components/v-zaglushka.vue';

const store = useStore();
const listTask = computed(() => store.getters.getListTask);
const isFirstVisit = ref(false);

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