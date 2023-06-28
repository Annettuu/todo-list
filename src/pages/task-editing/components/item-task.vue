<template>
  <div
    class="item-task"
    @mouseleave="showBtn(false)"
    @mouseenter="showBtn(true)"
  >
    <label class="item-task_label">
      <template v-if="props.task.edit">
        <input
          ref="inputTask"
          v-model="contentTask"
          class="item-task_input"
          @focus="$event.target.select()"
          @blur="deleteMode"
          @keydown.enter="saveTask(task.id), deleteMode"
        >
        <button
          v-show="task.edit && isShowBtn"
          class="item-task_save"
          @click="saveTask(task.id)"
        >
          <img
            class="item-task_img"
            src="@/assets/images/svg/btn-move.svg"
          >
        </button>
      </template>
      <template v-else>
        <span class="item-task_content"> {{ task.content }} </span>
      </template>
    </label>
    <div class="item-task_buttons">
      <button
        class="item-task_delete"
        @click="deleteTask(task.id)"
      >
        <img
          class="item-task_img"
          src="@/assets/images/svg/btn-delete.svg"
        >
      </button>
      <button
        v-if="isShowBtn"
        class="item-task_edit"
        @click="editTask(task.id)"
      >
        <img
          class="item-task_img"
          src="@/assets/images/svg/btn-edit.svg"
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick } from 'vue';

const emit = defineEmits(['edit-task', 'save-task', 'delete-task']);

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
  console.debug(899898);
  emit('save-task', id, contentTask);
};

const deleteTask = (id) => {
  emit('delete-task', id);
};

const deleteMode = () => {
  delete props.task.edit;
};
</script>

<style lang="scss">
.item-task {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    .item-task_label {
      filter: brightness(0.8);
    }
  }
}
.item-task_input {
  border: none;
  font-size: 20px;
  width: 90%;
  &:focus-visible {
    outline: none;
  }
}

.item-task_label {
  display: flex;
  border: 1px solid;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  width: 600px;
  background-color: var(--white);
}
.item-task_buttons {
  display: flex;
  align-items: center;
}
.item-task_edit {
  position: absolute;
  right: -28px;
}
.item-task_save {
  position: absolute;
  right: 0;
  bottom: 8px;
}
</style>