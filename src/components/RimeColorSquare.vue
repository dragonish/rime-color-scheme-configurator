<template>
  <span class="rime-color-square" :style="{ 'background-color': dispalyColor }"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  showColor: string | null;
}>();

const dispalyColor = computed(() => {
  if (!props.showColor) {
    return 'transparent';
  }

  const sColor = props.showColor.trim();
  if (sColor.match('^#[a-f0-9]{6}')) {
    return sColor;
  }
  return 'transparent';
});
</script>

<style scoped>
.rime-color-square {
  width: 20px;
  height: 20px;
  border-radius: 2px;
}
</style>
