<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <rime-fieldset :label="t('fieldset.panel')">
      <rime-panel></rime-panel>
    </rime-fieldset>
    <rime-fieldset :label="t('fieldset.default')" class="column">
      <rime-color-input v-model="colorStore.text_color" :label="t('form.textColor')" hint="text_color" class="col"></rime-color-input>
      <rime-color-input v-model="colorStore.label_color" :label="t('form.labelColor')" hint="label_color"></rime-color-input>
      <rime-color-input v-model="colorStore.comment_text_color" :label="t('form.commentColor')" hint="comment_text_color"></rime-color-input>
      <rime-color-input v-model="colorStore.back_color" :label="t('form.backColor')" hint="back_color" class="col"></rime-color-input>
      <rime-color-input v-model="colorStore.border_color" :label="t('form.borderColor')" hint="border_color" class="col"></rime-color-input>
      <rime-color-input
        v-model="colorStore.shadow_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.shadowColor')"
        hint="shadow_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.preedit_back_color"
        v-show="colorStore.isSquirrelPlatform"
        :label="t('form.preeditColor')"
        hint="preedit_back_color"
        class="col"
      ></rime-color-input>
    </rime-fieldset>
    <rime-fieldset :label="t('fieldset.candidate')" class="column">
      <rime-color-input
        v-model="colorStore.candidate_text_color"
        :label="t('form.candidateTextColor')"
        hint="candidate_text_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.candidate_back_color"
        :label="t('form.candidateBackColor')"
        hint="candidate_back_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.candidate_border_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.candidateBorderColor')"
        hint="candidate_border_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.candidate_shadow_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.candidateShadowColor')"
        hint="candidate_shadow_color"
        class="col"
      ></rime-color-input>
    </rime-fieldset>
    <rime-fieldset :label="t('fieldset.hilited')" class="column">
      <rime-color-input v-model="colorStore.hilited_text_color" :label="t('form.hilitedTextColor')" hint="hilited_text_color" class="col"></rime-color-input>
      <rime-color-input v-model="colorStore.hilited_back_color" :label="t('form.hilitedBackColor')" hint="hilited_back_color" class="col"></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_shadow_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.hilitedShadowColor')"
        hint="hilited_shadow_color"
        class="col"
      ></rime-color-input>
    </rime-fieldset>
    <rime-fieldset :label="t('fieldset.selected')" class="column">
      <rime-color-input
        v-model="colorStore.hilited_candidate_text_color"
        :label="t('form.hilitedCandidateTextColor')"
        hint="hilited_candidate_text_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_label_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.hilitedCandidateLabelColor')"
        hint="hilited_label_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_candidate_label_color"
        v-show="colorStore.isSquirrelPlatform"
        :label="t('form.hilitedCandidateLabelColor')"
        hint="hilited_candidate_label_color"
        class="colr"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_comment_text_color"
        :label="t('form.hilitedCandidateCommentColor')"
        hint="hilited_comment_text_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_mark_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.markColor')"
        hint="hilited_mark_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_candidate_back_color"
        :label="t('form.hilitedCandidateBackColor')"
        hint="hilited_candidate_back_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_candidate_border_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.hilitedCandidateBorderColor')"
        hint="hilited_candidate_border_color"
        class="col"
      ></rime-color-input>
      <rime-color-input
        v-model="colorStore.hilited_candidate_shadow_color"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.hilitedCandidateShadowColor')"
        hint="hilited_candidate_shadow_color"
        class="col"
      ></rime-color-input>
    </rime-fieldset>
    <rime-fieldset v-show="colorStore.isWeaselPlatform" :label="t('fieldset.pages')" class="column">
      <rime-color-input v-model="colorStore.prevpage_color" :label="t('form.prevpageColor')" hint="prevpage_color" class="col"></rime-color-input>
      <rime-color-input v-model="colorStore.nextpage_color" :label="t('form.nextpageColor')" hint="nextpage_color" class="col"></rime-color-input>
    </rime-fieldset>
    <rime-fieldset :label="t('fieldset.info')" class="column">
      <q-input v-model="colorStore.name" :label="t('form.schemeName')" hint="name" class="col"></q-input>
      <q-input v-model="colorStore.author" :label="t('form.author')" hint="author" class="col"></q-input>
      <q-select
        v-model="colorStore.color_format"
        v-show="colorStore.isWeaselPlatform"
        :label="t('form.colorFormat')"
        hint="color_format"
        class="col"
        :options="colorFormatOptions"
      ></q-select>
      <q-select
        v-model="colorStore.color_space"
        v-show="colorStore.isSquirrelPlatform"
        :label="t('form.colorSpace')"
        hint="color_space"
        class="col"
        :options="colorSpaceOptions"
      ></q-select>
    </rime-fieldset>
    <rime-fieldset :label="t('fieldset.options')" class="column">
      <div class="col flex items-center">
        <span>{{ t('form.platform') }}：</span>
        <q-radio v-model="colorStore.platform" val="weasel" :label="t('form.weasel')" title="Weasel"></q-radio>
        <q-radio v-model="colorStore.platform" val="squirrel" :label="t('form.squirrel')" title="Squirrel"></q-radio>
      </div>
      <div class="col flex items-center">
        <span>{{ t('form.pageBackground') }}：</span>
        <q-radio v-model="colorStore.pageBackground" val="light" :label="t('form.light')"></q-radio>
        <q-radio v-model="colorStore.pageBackground" val="dark" :label="t('form.dark')"></q-radio>
      </div>
      <div class="col flex items-center">
        <span>{{ t('form.pageLanguage') }}：</span>
        <q-radio v-model="colorStore.pageLanguage" val="zh-Hans" label="简体"></q-radio>
        <q-radio v-model="colorStore.pageLanguage" val="zh-Hant" label="繁體"></q-radio>
      </div>
    </rime-fieldset>
    <rime-fieldset :label="t('fieldset.action')" class="column q-gutter-y-sm">
      <q-btn class="col" color="accent" :label="t('form.import')" @click="importVisibility = true"></q-btn>
      <q-btn class="col" color="secondary" :label="t('form.preview')" @click="previewVisibility = true"></q-btn>
      <q-btn class="col" color="primary" :label="t('form.copy')" @click="onCopyResult"></q-btn>
    </rime-fieldset>
    <rime-import-dialog v-model:visibility="importVisibility" @import="onImport"></rime-import-dialog>
    <rime-preview-dialog v-model:visibility="previewVisibility"></rime-preview-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { type MessageSchema } from '@/locales/schema';
import { useColorStore } from '@/stores/color';
import { copy } from '@/common/copy';
import { colorFormatOptions, colorSpaceOptions } from '@/common/data';
import RimePanel from './RimePanel.vue';
import RimeFieldset from './RimeFieldset.vue';
import RimeColorInput from './RimeColorInput.vue';
import RimeImportDialog from './RimeImportDialog.vue';
import RimePreviewDialog from './RimePreviewDialog.vue';

const { t } = useI18n<{
  message: MessageSchema;
}>({
  useScope: 'global',
});

const $q = useQuasar();
const colorStore = useColorStore();

const importVisibility = ref(false);
const previewVisibility = ref(false);

function onCopyResult() {
  copy(colorStore.exportScheme());
  $q.notify({
    message: t('message.copy'),
    color: 'primary',
  });
}

function onImport(text: string) {
  colorStore.importScheme(text);
  $q.notify({
    message: t('message.import'),
    color: 'accent',
  });
}
</script>
