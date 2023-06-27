<template>
  <label class="input-task">
    <input 
      v-model="newTask"
      class="input-task_input"
      @keydown.enter="addTask"
    />
    <button 
      class="input-task_button" 
      @click="addTask"
    >
      Добавить задачу
    </button>
  </label>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const newTask = ref();

const emit = defineEmits(['addTask']);

const addTask = () => {
  if (newTask.value) {
    emit('addTask', newTask.value);
    newTask.value = '';
  }
};

</script>