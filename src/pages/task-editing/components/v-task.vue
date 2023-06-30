<template>
  <div
    class="v-task"
    @mouseleave="showBtn(false)"
    @mouseenter="showBtn(true)"
  >
    <div
      v-if="task.done"
      class="v-task_status"
    >
      Завершено
    </div>
    <label
      class="v-task_label"
      :class="{'__doneTask': task.done}"
    >
      <template v-if="props.task.edit">
        <input
          ref="inputTask"
          v-model="contentTask"
          class="v-task_input"
          @focus="$event.target.select()"
          @blur="toggleMode"
          @keydown.enter="saveTask"
        >
        <button
          v-if="task.edit && isShowBtn"
          class="v-task_save"
          @click.stop="saveTask"
        >
          <img
            class="v-task_img"
            src="@/assets/images/svg/btn-move.svg"
          >
        </button>
      </template>
      <template v-else>
        <span class="v-task_content"> {{ task.content }} </span>
      </template>
    </label>
    <div class="v-task_buttons">
      <button
        class="v-task_delete"
        @click="deleteTask"
      >
        <img
          class="v-task_img"
          src="@/assets/images/svg/btn-delete.svg"
        >
      </button>
      <button
        v-if="isShowBtn"
        class="v-task_edit"
        @click="editTask"
      >
        <img
          class="v-task_img"
          src="@/assets/images/svg/btn-edit.svg"
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick } from 'vue';

const emit = defineEmits(['edit-task', 'save-task', 'delete-task', 'toggle-mode']);

const props = defineProps({
  task: Object
});

const inputTask = ref(null);
const contentTask = ref('');
const isShowBtn = ref(false);

const showBtn = (is) => {
  isShowBtn.value = is;
};

const editTask = () => {
  emit('edit-task', props.task.id, contentTask);

  nextTick(() => {
    inputTask.value.focus();
  });
};

const saveTask = () => {
  if (contentTask.value) {
    emit('save-task', props.task.id, contentTask);
  } else {
    deleteTask();
  }
  toggleMode();
};

const deleteTask = () => {
  emit('delete-task', props.task.id);
};

const toggleMode = () => {
  setTimeout(() => {
    emit('toggle-mode', props.task.id);
  }, 500);
};
</script>

<style lang="scss">
.v-task {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    .v-task_label {
      filter: brightness(0.9);
    }
  }
  &_input {
    border: none;
    font-size: 20px;
    width: 90%;
    &:focus-visible {
      outline: none;
    }
  }
  &_label {
    display: flex;
    border: 1px solid;
    justify-content: center;
    padding: 10px;
    border-radius: 8px;
    width: 600px;
    background-color: var(--white);
    &.__doneTask {
      border: 2px solid var(--green);
    }
  }
  &_status {
    color: var(--green);
    position: absolute;
    left: -124px;
  }
  &_buttons {
    display: flex;
    align-items: center;
  }
  &_delete {
    cursor: pointer;
    &:hover {
      filter: brightness(0.7);
    }
  }
  &_edit {
    position: absolute;
    right: -28px;
    cursor: pointer;
    &:hover {
      filter: brightness(0.7);
    }
  }
  &_save {
    position: absolute;
    right: 0;
    bottom: 8px;
    z-index: 10;
    cursor: pointer;
  }
}
</style>