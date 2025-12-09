<template>
  <div
    class="row no-wrap rime-candidate-item"
    :style="{
      backgroundColor: hilited ? colorStore.hilitedCandidateBackColor : colorStore.candidateBackColor,
      border: candidateBorder,
      boxShadow: candidateBoxShadow,
    }"
  >
    <rime-vertical-line
      v-if="hilited"
      v-show="colorStore.hilitedMarkColor"
      class="rime-candidate-hilited-line"
      :style="{ color: colorStore.hilitedMarkColor }"
    ></rime-vertical-line>
    <span
      class="rime-candidate-label"
      :style="{ color: hilited ? colorStore.hilitedLabelColor || colorStore.hilitedCandidateLabelColor : colorStore.labelColor }"
      >{{ index }}.</span
    >
    <span class="rime-candidate-text" :style="{ color: hilited ? colorStore.hilitedCandidateTextColor : colorStore.candidateTextColor }">{{ text }}</span>
    <span class="rime-candidate-comment" :style="{ color: hilited ? colorStore.hilitedCommentTextColor : colorStore.commentTextColor }">{{ code }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RimeVerticalLine from './RimeVerticalLine.vue';
import { useColorStore } from '@/stores/color';

const colorStore = useColorStore();

const props = defineProps<{
  index: number;
  text: string;
  code: string;
  hilited?: boolean;
}>();

const candidateBorder = computed(() => {
  if (props.hilited) {
    return colorStore.hilitedCandidateBorderColor ? `2px solid ${colorStore.hilitedCandidateBorderColor}` : 'none';
  } else {
    return colorStore.candidateBorderColor ? `2px solid ${colorStore.candidateBorderColor}` : 'none';
  }
});

const candidateBoxShadow = computed(() => {
  if (props.hilited) {
    return colorStore.hilitedCandidateShadowColor ? `4px 4px 6px ${colorStore.hilitedCandidateShadowColor}` : 'none';
  } else {
    return colorStore.candidateShadowColor ? `4px 4px 6px ${colorStore.candidateShadowColor}` : 'none';
  }
});
</script>

<style scoped>
.rime-candidate-item {
  flex: 1;
  border-radius: 6px;
  align-items: center;
}

.rime-candidate-label {
  margin-left: 10px;
}

.rime-candidate-text {
  margin-left: 10px;
}

.rime-candidate-comment {
  margin-left: 25px;
}

.rime-candidate-hilited-line {
  stroke: currentColor;
  width: 24px;
  height: 24px;
  stroke-width: 2;
  position: absolute;
  left: 0px;
}
</style>
