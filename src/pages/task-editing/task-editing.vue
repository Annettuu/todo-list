<template>
  <div class="task-editing">
    <label class="task-editing_label">
      <input 
        v-model="newTask"
        class="task-editing_input"
        @keydown.enter="addTask"
      />
      <button 
        class="task-editing_button" 
        @click="addTask"
      >
        Добавить задачу
      </button>
    </label>
    <li class="task-editing_list-task">
      <ul
        v-for="task of listTask"
        :key="task.id"
        class="task-editing_task"
      >
        <div
          v-if="task.done" 
          class="task-editing_status"
        >
          Выполнено
        </div>
        <label class="task-editing_wrapper">
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
            <span class="task-editing_content"> {{ task.content }} </span>
          </template>
        </label> 
        <div class="task-editing_buttons">
          <button 
            class="task-editing_save" 
            @click="saveTask(task.id)"
          >
            <img class="task-editing_img" src="@/assets/images/svg/btn-move.svg" />
          </button>
          <button 
            class="task-editing_delete" 
            @click="deleteTask(task.id)"
          >
            <img class="task-editing_img" src="@/assets/images/svg/btn-delete.svg" />
          </button>
          <button 
            class="task-editing_edit" 
            @click="editTask(task.id)"
          >
            <img class="task-editing_img" src="@/assets/images/svg/btn-edit.svg" />
          </button>
        </div>
      </ul>
    </li>
  </div>
</template>

<script setup>
import { ref, nextTick, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const newTask = ref('');
const listTask = computed(() => store.getters.getListTask);
const lastId = computed(() => store.getters.getLastId);
const inputTask = ref(null);
const contentTask = ref();


const addTask = () => {
  if (newTask.value) {
    const newListTask = [...listTask.value, { id: lastId.value, content: newTask.value }];
    store.dispatch('updateListTask', newListTask);
    store.dispatch('updateLastId', lastId.value + 1);
    newTask.value = '';
  }
};

const editTask = (id) => {
  listTask.value.forEach(task => {
    if (task.id === id) {
      task.edit = true;
      contentTask.value = task.content;
      nextTick(() => {
        inputTask.value[0].focus();
      });
    }
  });
};

const saveTask = (id) => {
  const newListTask = listTask.value.map((task) => {
    if (task.id === id && contentTask.value) {
      task.content = contentTask.value;
      task.edit = false;
    }
    return task;
  });
  contentTask.value = '';
  store.dispatch('updateListTask', newListTask);
};

const deleteTask = (id) => {
  const newListTask = listTask.value.filter((item) => item.id !== id);
  store.dispatch('updateListTask', newListTask);
};

const loadData = () => {
  store.dispatch('loadListTask', listTask.value);
  store.dispatch('loadLastId', lastId.value);
};

watch(listTask, (newListTask) => {
  store.dispatch('updateListTask', newListTask);
  console.debug(1234567)
});

onMounted(() => {
  loadData();
});
</script>

<style lang="scss">
.task-editing {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &_label {
    display: flex;
    width: 20%;
  }
  &_button {
    border: none;
    background: var(--white);
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      filter: brightness(0.7);
    }
  }
  &_img {
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      filter: brightness(0.1);
    }
  }
  &_list-task {
    display: flex;
    flex-direction: column;
  }
  &_wrapper {
    display: flex;
    justify-content: space-between;
    gap: 5px;
    padding: 10px;
    background: transparent;
    border: 1px solid;
    border-radius: 10px;
    margin: 7px;
    width: 250px;
    flex-wrap: wrap;
  }
  &_task {
    display: flex;
    align-items: center;
    &:hover {
      background-color: red;
    }
  }
}
</style>