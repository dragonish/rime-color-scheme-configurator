<template>
  <q-dialog v-model="visibility" persistent>
    <q-card class="rime-preview-dialog-card">
      <q-card-section>
        <div class="text-h6">{{ t('form.preview') }}</div>
      </q-card-section>
      <q-card-section>
        <p v-for="(item, index) in content.split('\n')" :key="index" class="rime-preview-dialog-content">{{ item }}</p>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat :label="t('button.copy')" @click="emit('copy')"></q-btn>
        <q-btn v-close-popup flat :label="t('button.close')"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useColorStore } from '@/stores/color';
import { type MessageSchema } from '@/locales/schema';

const { t } = useI18n<{
  message: MessageSchema;
}>({
  useScope: 'global',
});

const colorStore = useColorStore();

const visibility = defineModel<boolean>('visibility', {
  required: true,
});

const emit = defineEmits<{
  copy: [];
}>();

const content = ref('');

watch(
  () => visibility.value,
  newVal => {
    if (newVal) {
      content.value = colorStore.exportScheme();
    }
  }
);
</script>

<style scoped>
.rime-preview-dialog-content {
  margin: 0px 0px;
  font-family: Consolas, Menlo, Monaco, 'Courier New', Courier, monospace;
}
</style>
