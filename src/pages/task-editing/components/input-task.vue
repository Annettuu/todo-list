<template>
  <label class="input-task">
    <input
      v-model="newTask"
      class="input-task_input"
      placeholder="Введите задачу"
      @keydown.enter="addTask"
    >
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

const emit = defineEmits(['add-task']);

const addTask = () => {
  if (newTask.value) {
    emit('add-task', newTask.value);
    newTask.value = '';
  }
};

</script>

<style lang="scss">

.input-task {
  display: flex;
  gap: 10px;
}

.input-task_input {
  padding: 11px;
  border: 1px solid var(--gray);
  border-radius: 5px;
  width: 500px;
  font-size: 20px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.09), 0px 7.7037px 12.7407px rgba(0, 0, 0, 0.0607407), 0px 1.62963px 3.25926px rgba(0, 0, 0, 0.0607);
  &:focus-visible {
    outline: none;
    border: 2px solid var(--blue);
  }
}

.input-task_button {
  border: 1px solid var(--gray);
  color: var(--gray);
  padding: 5px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.09), 0px 7.7037px 12.7407px rgba(0, 0, 0, 0.0607407), 0px 1.62963px 3.25926px rgba(0, 0, 0, 0.0607);
  cursor: pointer;
  &:hover {
    border: 1px solid var(--blue);
    color: var(--blue);
    background-color: var(--blue-hover);
  }
}
</style>