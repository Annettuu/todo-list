<template>
  <div class="v-empty">
    <span class="v-empty">
      {{ text }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  isFirstVisit: Boolean
});
const text = computed(() => {
  return props.isFirstVisit ? 'Чтобы начать, просто перейдите на страницу редактирования задач!' : 'Пока список задач пуст...';
});
</script>

<style lang="scss">
.v-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80vh;
  &_text {
    color: var(--black);
    font-size: 28px;
  }
}
</style>