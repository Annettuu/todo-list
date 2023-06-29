<template>
  <div
    class="task-item"
    :class="{ '__done': task.done }"
  >
    <span
      class="task-item_content"
      @click="doneTask(props.task.id)"
    >{{ props.task.content }}</span>
    <button
      class="task-item_button"
      @click="doneTask(props.task.id)"
    >
      <img
        v-svg-inline
        src="@/assets/images/svg/btn-done.svg"
        :class="svg"
      >
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const emit = defineEmits(['done-task']);

const props = defineProps({
  task: Object
});

const doneTask = (id) => {
  emit('done-task', id);
};
</script>

<style lang="scss">
.task-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--white);
  cursor: pointer;
  &_content {
    border: 1px solid var(--gray);
    background-color: var(--white);
    color: var(--gray);
    padding: 10px;
    border-radius: 8px;
    min-width: 750px;
    display: flex;
    justify-content: flex-start;
    max-width: 250px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.09), 0px 7.7037px 12.7407px rgba(0, 0, 0, 0.0607407), 0px 1.62963px 3.25926px rgba(0, 0, 0, 0.0607);
    &:hover {
      filter: brightness(0.9);
    }
  }
  &_button {
    cursor: pointer;
  }
  &.__done {
    .task-item_content {
      border: 2px solid var(--green);
      color: var(--green);

      &:hover {
        background-color: var(--green-hover);
      }
    }
    svg > path {
      fill: var(--green);
    }
  }
  svg {
    outline: none;
  }
}
</style>