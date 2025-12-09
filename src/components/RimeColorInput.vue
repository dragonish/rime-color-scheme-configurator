<template>
  <q-input v-model="modelValue">
    <template #before>
      <rime-color-square :show-color="modelValue"></rime-color-square>
    </template>
    <template #append>
      <q-icon class="cursor-pointer" name="colorize">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="modelValue" :format-model="'hexa'" no-header-tabs></q-color>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import RimeColorSquare from './RimeColorSquare.vue';

const modelValue = defineModel<string | null>('model-value', {
  required: true,
});
</script>
