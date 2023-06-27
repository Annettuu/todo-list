<template>
  <nav>
    <router-link 
      @dragstart.prevent 
      to="/"
    >
      {{ linkTextHome }}
    </router-link> |
    <router-link 
      @dragstart.prevent 
      to="/taskEditing"
    >
      {{ linkTextEdit }}
    </router-link>
  </nav>
  <router-view/>
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
      linkTextEdit = 'Редактирование задач'
      linkTextHome = 'Вернуться на главную'
    } else if (route.path === '/') {
      linkTextEdit = 'Изменить задачи'
      linkTextHome = 'Список задач'
    }
  }
)
</script>

<style lang="scss">
@import './assets/styles/main.scss'
</style>
