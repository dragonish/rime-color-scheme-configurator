<template>
  <q-card
    bordered
    class="rime-panel-card"
    style="border: 4px solid"
    :style="{
      backgroundColor: colorStore.backColor,
      color: colorStore.textColor,
      borderColor: colorStore.borderColor,
      boxShadow: colorStore.shadowColor ? `4px 4px 8px ${colorStore.shadowColor}` : 'none',
    }"
  >
    <q-list>
      <q-item>
        <q-item-section>
          <rime-preedit></rime-preedit>
        </q-item-section>
      </q-item>
      <q-item v-for="({ code, hilited }, index) in condidateList" :key="index">
        <rime-candidate :index="index + 1" :text="t('panel.' + code)" :code :hilited></rime-candidate>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useColorStore } from '@/stores/color';
import { type MessageSchema } from '@/locales/schema';
import RimePreedit from './RimePreedit.vue';
import RimeCandidate from './RimeCandidate.vue';

const { t } = useI18n<{
  message: MessageSchema;
}>({
  useScope: 'global',
});

const colorStore = useColorStore();

const condidateList = [
  {
    code: 'xgqd',
    hilited: true,
  },
  {
    code: 'vhtg',
  },
  {
    code: 'hees',
  },
  {
    code: 'hkqd',
  },
  {
    code: 'sgjg',
  },
];
</script>

<style scoped>
.q-card.rime-panel-card {
  width: 256px;
  font-size: 28px;
}

.q-card.rime-panel-card .q-item {
  padding: 4px 8px;
}
</style>
