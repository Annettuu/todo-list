<template>
  <div class="v-home">
   <span>Ваши задачи</span>
   <div class="v-home_tasks">
      <div class="v-home_task" v-for="task of listTask" :key="task.id">
        {{ task.content }}
      </div>
   </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const listTask = computed(() => store.getters.getListTask);

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
  
  &_tasks {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
}

</style>