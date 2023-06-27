<template>
  <div class="task-item">
    <span>{{ props.task.content }}</span>
    <button 
      class="v-home_button" 
      @click="doneTask(props.task.id)"
    >
      <img src="@/assets/images/svg/btn-done.svg" />
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['doneTask']);

const props = defineProps({
  task: Object
});

const doneTask = (id) => {
  emit('doneTask', id);
};
</script>