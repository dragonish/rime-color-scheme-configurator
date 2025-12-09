<template>
  <div class="row no-wrap rime-preedit" :style="{ backgroundColor: colorStore.preeditBackColor }">
    <span
      class="rime-preedit-code"
      :style="{
        color: colorStore.hilitedTextColor,
        backgroundColor: colorStore.hilitedBackColor,
        boxShadow: colorStore.hilitedShadowColor ? `4px 4px 6px ${colorStore.hilitedShadowColor}` : 'none',
      }"
      >`gg</span
    >
    <span class="rime-preedit-placeholder">
      <rime-chevron-up class="rime-preedit-delimiter" :style="{ color: colorStore.textColor }"></rime-chevron-up>
      <span :style="{ color: colorStore.textColor }">〔{{ t('panel.py') }}〕</span>
    </span>

    <span v-show="colorStore.showPages" class="rime-preedit-pages">
      <rime-chevron-left class="rime-preedit-prevpage" :style="{ color: colorStore.prevpageColor }"></rime-chevron-left>
      <rime-chevron-right class="rime-preedit-nextpage" :style="{ color: colorStore.nextpageColor }"></rime-chevron-right>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useColorStore } from '@/stores/color';
import { type MessageSchema } from '@/locales/schema';
import RimeChevronUp from './RimeChevronUp.vue';
import RimeChevronLeft from './RimeChevronLeft.vue';
import RimeChevronRight from './RimeChevronRight.vue';

const { t } = useI18n<{
  message: MessageSchema;
}>({
  useScope: 'global',
});

const colorStore = useColorStore();
</script>

<style scoped>
.rime-preedit {
  flex: 1;
  border-radius: 6px;
}

.rime-preedit-code {
  border-radius: 6px;
  padding: 0px 2px;
}

.rime-preedit-placeholder {
  display: flex;
  align-items: end;
}

.rime-preedit-delimiter,
.rime-preedit-prevpage,
.rime-preedit-nextpage {
  stroke: currentColor;
}

.rime-preedit-delimiter {
  width: 16px;
  height: 16px;
  stroke-width: 3;
}

.rime-preedit-pages {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto;
}

.rime-preedit-prevpage,
.rime-preedit-nextpage {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}
</style>
