<template>
  <q-layout>
    <q-header :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-bar>
        <div>{{ t('title') }}</div>
        <div class="text-italic" style="font-size: 12px">by dragonish</div>
        <q-space />
        <q-btn dense flat class="cursor-pointer" :icon="fabGithub" @click="onOpenGitHub"></q-btn>
      </q-bar>
    </q-header>
    <q-page-container>
      <div class="q-pa-md">
        <rime-form></rime-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { watch, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { fabGithub } from '@quasar/extras/fontawesome-v6';
import { useColorStore } from '@/stores/color';
import { type MessageSchema } from '@/locales/schema';
import RimeForm from './components/RimeForm.vue';

const { t, locale } = useI18n<[MessageSchema], PageLanguage>({
  useScope: 'global',
});

const $q = useQuasar();
const colorStore = useColorStore();

watch(
  () => colorStore.pageBackground,
  newVal => {
    $q.dark.set(newVal === 'dark');
  }
);

watch(
  () => colorStore.pageLanguage,
  newVal => {
    locale.value = newVal;
    document.title = t('title');
  }
);

onBeforeMount(() => {
  if (colorStore.pageBackground === 'dark') {
    $q.dark.set(true);
  }

  locale.value = colorStore.pageLanguage;
  document.title = t('title');
});

function onOpenGitHub() {
  window.open('https://github.com/dragonish/rime-color-scheme-configurator', '_blank');
}
</script>
