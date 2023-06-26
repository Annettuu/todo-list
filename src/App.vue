<template>
  <nav>
    <router-link to="/">Вернуться на главную</router-link> |
    <router-link to="/taskEditing">Создать новую задачу</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@import './assets/styles/main.scss'
</style>
