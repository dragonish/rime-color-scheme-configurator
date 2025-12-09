<template>
  <q-dialog v-model="visibility" persistent>
    <q-card class="rime-import-dialog-card">
      <q-card-section>
        <div class="text-h6">{{ t('form.import') }}</div>
      </q-card-section>
      <q-card-section class="q-pa-md">
        <q-input v-model="text" filled class="rime-import-dialog-input" type="textarea" rows="15" :placeholder="inputPlaceholder"></q-input>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat :label="t('button.cancel')"></q-btn>
        <q-btn v-close-popup flat :label="t('button.ok')" @click="onOK"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { type MessageSchema } from '@/locales/schema';

const { t } = useI18n<{
  message: MessageSchema;
}>({
  useScope: 'global',
});

const inputPlaceholder = ['示例:', '', 'name: example', 'author: dragonish', 'text_color: 0xff000000', 'back_color: 0xffffffff'].join('\n');

const text = ref('');

const visibility = defineModel<boolean>('visibility', {
  required: true,
});

const emit = defineEmits<{
  import: [text: string];
}>();

function onOK() {
  const val = text.value.trim();
  if (val) {
    emit('import', val);
  }
}
</script>

<style scoped>
.rime-import-dialog-card {
  width: 360px;
}

.rime-import-dialog-input {
  max-width: 360px;
  font-family: Consolas, Menlo, Monaco, 'Courier New', Courier, monospace;
}
</style>
