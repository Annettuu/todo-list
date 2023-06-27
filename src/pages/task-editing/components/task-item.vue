<template>
  <div class="task-item">
    <label class="task-item_label">
      <template v-if="task.edit">
        <input 
          ref="inputTask"
          v-model="contentTask"
          @focus="$event.target.select()"
          @blur="task.edit = false"
          @keydown.enter="saveTask(task.id), task.edit = false"
        >
      </template>
      <template v-else>
        <span class="task-item_content"> {{ task.content }} </span>
      </template>
    </label> 
    <div class="task-item_buttons">
      <button 
        class="task-item_save" 
        @click="saveTask(task.id)"
      >
        <img class="task-item_img" src="@/assets/images/svg/btn-move.svg" />
      </button>
      <button 
        class="task-item_delete" 
        @click="deleteTask(task.id)"
      >
        <img class="task-item_img" src="@/assets/images/svg/btn-delete.svg" />
      </button>
      <button 
        class="task-item_edit" 
        @click="editTask(task.id)"
      >
        <img class="task-item_img" src="@/assets/images/svg/btn-edit.svg" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick } from 'vue';

const emit = defineEmits(['editTask', 'saveTask', 'deleteTask']);

const props = defineProps({
  task: Object
});

const inputTask = ref(null);
const contentTask = ref('');

const editTask = (id) => {
  emit('editTask', id, contentTask);
  nextTick(() => {
    inputTask.value.focus();
  });
};

const saveTask = (id) => {
  emit('saveTask', id, contentTask);
};

const deleteTask = (id) => {
  emit('deleteTask', id);
};
</script>

<style lang="scss">
</style>