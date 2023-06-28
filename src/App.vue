<template>
  <nav>
    <router-link
      to="/"
      @dragstart.prevent
    >
      {{ linkTextHome }}
    </router-link> |
    <router-link
      to="/taskEditing"
      @dragstart.prevent
    >
      {{ linkTextEdit }}
    </router-link>
  </nav>
  <router-view />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let linkTextEdit = ref('');
let linkTextHome = ref('');

watch(route,
  () => {
    if (route.path === '/taskEditing') {
      linkTextEdit.value = 'Редактирование задач';
      linkTextHome.value = 'Вернуться на главную';
    } else if (route.path === '/') {
      linkTextEdit.value = 'Изменить задачи';
      linkTextHome.value = 'Список задач';
    }
  }
);
</script>

<style lang="scss">
@import './assets/styles/main.scss'
</style>
