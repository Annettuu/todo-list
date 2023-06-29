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
          @blur="deleteMode(task.id)"
          @keydown.enter="saveTask(task.id), deleteMode"
        >
        <button
          v-if="task.edit && isShowBtn"
          class="v-task_save"
          @click.stop="saveTask(task.id)"
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
        @click="deleteTask(task.id)"
      >
        <img
          class="v-task_img"
          src="@/assets/images/svg/btn-delete.svg"
        >
      </button>
      <button
        v-if="isShowBtn"
        class="v-task_edit"
        @click="editTask(task.id)"
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

const emit = defineEmits(['edit-task', 'save-task', 'delete-task', 'delete-mode']);

const props = defineProps({
  task: Object
});

const inputTask = ref(null);
const contentTask = ref('');
const isShowBtn = ref(false);

const showBtn = (is) => {
  isShowBtn.value = is;
};

const editTask = (id) => {
  emit('edit-task', id, contentTask);

  nextTick(() => {
    inputTask.value.focus();
  });
};

const saveTask = (id) => {
  if (contentTask.value) {
    emit('save-task', id, contentTask);
  } else {
    deleteTask(id);
  }
};

const deleteTask = (id) => {
  emit('delete-task', id);
};

const deleteMode = (id) => {
  setTimeout(() => {
    emit('delete-mode', id);
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
    &:hover {
      filter: brightness(0.7);
    }
  }
  &_edit {
    position: absolute;
    right: -28px;
    &:hover {
      filter: brightness(0.7);
    }
  }
  &_save {
    position: absolute;
    right: 0;
    bottom: 8px;
    z-index: 10;
  }
}
</style>