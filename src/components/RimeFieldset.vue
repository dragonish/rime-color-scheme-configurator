<template>
  <fieldset class="rime-fieldset">
    <legend>{{ label }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<style scoped>
.rime-fieldset {
  border: 1px solid var(--rime-fieldset-border-color);
  border-radius: 4px;
  padding: 16px;
}

.rime-fieldset legend {
  padding: 0px 10px;
  font-weight: 600;
  font-size: 16px;
}
</style>
