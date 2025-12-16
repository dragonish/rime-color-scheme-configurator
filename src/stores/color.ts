import { defineStore } from 'pinia';
import { useLocalStorage, type RemovableRef } from '@vueuse/core';
import { LOCALSTORAGE_KEYS, isColorFormat, toYAMLString, trimQuotes } from '@/common/data';
import { blendHexaColors, outputColor, importColor } from '@/common/color';
import { getLocalLanguage } from '@/locales/schema';

interface SchemeSavedItem extends Partial<WeaselColorScheme & SquirrelColorScheme> {
  id: string;
}

interface RuntimeState {
  platform: RemovableRef<InputMethodPlatform>;
  pageBackground: RemovableRef<PageBackgroundMode>;
  pageLanguage: RemovableRef<PageLanguage>;
  saved: RemovableRef<SchemeSavedItem[]>;
}

export const useColorStore = defineStore('ColorStore', {
  state: (): WeaselColorScheme & SquirrelColorScheme & RuntimeState => {
    const platform = useLocalStorage<InputMethodPlatform>(LOCALSTORAGE_KEYS.PLATFORM, 'weasel');
    const pageBackground = useLocalStorage<PageBackgroundMode>(LOCALSTORAGE_KEYS.PAGE_BACKGROUND, 'light');
    const pageLanguage = useLocalStorage<PageLanguage>(LOCALSTORAGE_KEYS.PAGE_LANGUAGE, getLocalLanguage());
    const saved = useLocalStorage<SchemeSavedItem[]>(LOCALSTORAGE_KEYS.SAVED, []);

    return {
      name: '',
      author: '',
      back_color: null,
      border_color: null,
      text_color: null,
      hilited_back_color: null,
      hilited_text_color: null,
      candidate_back_color: null,
      candidate_text_color: null,
      label_color: null,
      comment_text_color: null,
      hilited_candidate_back_color: null,
      hilited_candidate_text_color: null,
      hilited_comment_text_color: null,

      color_format: 'abgr',
      shadow_color: null,
      candidate_border_color: null,
      candidate_shadow_color: null,
      hilited_shadow_color: null,
      hilited_mark_color: null,
      hilited_label_color: null,
      hilited_candidate_border_color: null,
      hilited_candidate_shadow_color: null,
      prevpage_color: null,
      nextpage_color: null,

      color_space: 'srgb',
      preedit_back_color: null,
      hilited_candidate_label_color: null,

      platform,
      pageBackground,
      pageLanguage,
      saved,
    };
  },
  getters: {
    isWeaselPlatform: state => state.platform === 'weasel',
    isSquirrelPlatform: state => state.platform === 'squirrel',

    colorFormat(): ColorFormat {
      return this.isWeaselPlatform ? this.color_format : 'abgr';
    },
    colorSpace(): ColorSpace {
      return this.isSquirrelPlatform ? this.color_space : 'srgb';
    },

    backColor: state => state.back_color || '#ffffffff',
    textColor: state => state.text_color || '#000000ff',
    borderColor(): string {
      return this.border_color || this.textColor;
    },
    labelColor(): string {
      return this.label_color || blendHexaColors(this.candidateTextColor, this.candidateBackColor);
    },
    commentTextColor(): string {
      return this.comment_text_color || this.labelColor;
    },
    shadowColor(): string {
      if (this.isWeaselPlatform) {
        return this.shadow_color || '';
      }
      return '';
    },

    preeditBackColor(): string {
      if (this.isSquirrelPlatform) {
        return this.preedit_back_color || '';
      }
      return '';
    },

    candidateTextColor(): string {
      return this.candidate_text_color || this.textColor;
    },
    candidateBackColor: state => state.candidate_back_color || '',
    candidateBorderColor(): string {
      if (this.isWeaselPlatform) {
        return this.candidate_border_color || '';
      }
      return '';
    },
    candidateShadowColor(): string {
      if (this.isWeaselPlatform) {
        return this.candidate_shadow_color || '';
      }
      return '';
    },

    hilitedTextColor(): string {
      return this.hilited_text_color || this.textColor;
    },
    hilitedBackColor(): string {
      return this.hilited_back_color || this.preeditBackColor || this.backColor;
    },
    hilitedLabelColor(): string {
      if (this.isWeaselPlatform) {
        return this.hilited_label_color || blendHexaColors(this.hilitedCandidateTextColor, this.hilitedCandidateBackColor);
      }
      return '';
    },
    hilitedMarkColor(): string {
      if (this.isWeaselPlatform) {
        return this.hilited_mark_color || '';
      }
      return '';
    },
    hilitedShadowColor(): string {
      if (this.isWeaselPlatform) {
        return this.hilited_shadow_color || '';
      }
      return '';
    },

    hilitedCandidateTextColor(): string {
      return this.hilited_candidate_text_color || this.hilitedTextColor;
    },
    hilitedCandidateBackColor(): string {
      return this.hilited_candidate_back_color || this.hilitedBackColor;
    },
    hilitedCommentTextColor(): string {
      if (this.isWeaselPlatform) {
        return this.hilited_comment_text_color || this.hilitedLabelColor;
      } else {
        return this.hilited_comment_text_color || this.commentTextColor;
      }
    },
    hilitedCandidateBorderColor(): string {
      if (this.isWeaselPlatform) {
        return this.hilited_candidate_border_color || '';
      }
      return '';
    },
    hilitedCandidateShadowColor(): string {
      if (this.isWeaselPlatform) {
        return this.hilited_candidate_shadow_color || '';
      }
      return '';
    },

    hilitedCandidateLabelColor(): string {
      if (this.isSquirrelPlatform) {
        return this.hilited_candidate_label_color || this.hilitedCandidateTextColor;
      }
      return '';
    },

    prevpageColor(): string {
      if (this.isWeaselPlatform) {
        return this.prevpage_color || '';
      }
      return '';
    },
    nextpageColor(): string {
      if (this.isWeaselPlatform) {
        return this.nextpage_color || '';
      }
      return '';
    },
    showPages(): boolean {
      if (this.isWeaselPlatform && this.prevpageColor && this.nextpageColor) {
        return true;
      }
      return false;
    },
  },
  actions: {
    /**
     * 导出配色方案
     * @returns 配色方案字符串
     */
    exportScheme(): string {
      const res: string[] = [];

      if (this.name) {
        res.push(`name: ${toYAMLString(this.name)}`);
      }
      if (this.author) {
        res.push(`author: ${toYAMLString(this.author)}`);
      }
      if (this.textColor) {
        res.push(`text_color: ${outputColor(this.textColor, this.colorFormat)}`);
      }
      if (this.labelColor) {
        res.push(`label_color: ${outputColor(this.labelColor, this.colorFormat)}`);
      }
      if (this.commentTextColor) {
        res.push(`comment_text_color: ${outputColor(this.commentTextColor, this.colorFormat)}`);
      }
      if (this.backColor) {
        res.push(`back_color: ${outputColor(this.backColor, this.colorFormat)}`);
      }
      if (this.borderColor) {
        res.push(`border_color: ${outputColor(this.borderColor, this.colorFormat)}`);
      }
      if (this.candidateTextColor) {
        res.push(`candidate_text_color: ${outputColor(this.candidateTextColor, this.colorFormat)}`);
      }
      if (this.candidateBackColor) {
        res.push(`candidate_back_color: ${outputColor(this.candidateBackColor, this.colorFormat)}`);
      }
      if (this.hilitedTextColor) {
        res.push(`hilited_text_color: ${outputColor(this.hilitedTextColor, this.colorFormat)}`);
      }
      if (this.hilitedBackColor) {
        res.push(`hilited_back_color: ${outputColor(this.hilitedBackColor, this.colorFormat)}`);
      }
      if (this.hilitedCandidateTextColor) {
        res.push(`hilited_candidate_text_color: ${outputColor(this.hilitedCandidateTextColor, this.colorFormat)}`);
      }
      if (this.hilitedCommentTextColor) {
        res.push(`hilited_comment_text_color: ${outputColor(this.hilitedCommentTextColor, this.colorFormat)}`);
      }
      if (this.hilitedCandidateBackColor) {
        res.push(`hilited_candidate_back_color: ${outputColor(this.hilitedCandidateBackColor, this.colorFormat)}`);
      }

      if (this.isWeaselPlatform) {
        if (this.shadowColor) {
          res.push(`shadow_color: ${outputColor(this.shadowColor, this.colorFormat)}`);
        }
        if (this.candidateBorderColor) {
          res.push(`candidate_border_color: ${outputColor(this.candidateBorderColor, this.colorFormat)}`);
        }
        if (this.candidateShadowColor) {
          res.push(`candidate_shadow_color: ${outputColor(this.candidateShadowColor, this.colorFormat)}`);
        }
        if (this.hilitedLabelColor) {
          res.push(`hilited_label_color: ${outputColor(this.hilitedLabelColor, this.colorFormat)}`);
        }
        if (this.hilitedMarkColor) {
          res.push(`hilited_mark_color: ${outputColor(this.hilitedMarkColor, this.colorFormat)}`);
        }
        if (this.hilitedShadowColor) {
          res.push(`hilited_shadow_color: ${outputColor(this.hilitedShadowColor, this.colorFormat)}`);
        }
        if (this.hilitedCandidateBorderColor) {
          res.push(`hilited_candidate_border_color: ${outputColor(this.hilitedCandidateBorderColor, this.colorFormat)}`);
        }
        if (this.hilitedCandidateShadowColor) {
          res.push(`hilited_candidate_shadow_color: ${(this.hilitedCandidateShadowColor, this.colorFormat)}`);
        }
        if (this.showPages) {
          res.push(
            `prevpage_color: ${outputColor(this.prevpageColor, this.colorFormat)}`,
            `nextpage_color: ${outputColor(this.nextpageColor, this.colorFormat)}`
          );
        }

        res.push(`color_format: ${this.colorFormat}`);
      } else {
        if (this.preeditBackColor) {
          res.push(`preedit_back_color: ${outputColor(this.preeditBackColor, this.colorFormat)}`);
        }
        if (this.hilitedCandidateLabelColor) {
          res.push(`hilited_candidate_label_color: ${outputColor(this.hilitedCandidateLabelColor, this.colorFormat)}`);
        }

        res.push(`color_space: ${this.colorSpace}`);
      }
      return res.join('\n');
    },
    /**
     * 导入配色方案
     * @param input 配色方案字符串
     */
    importScheme(input: string): void {
      this.restoreScheme();

      const tempObj: Record<string, string> = {};
      const arr = input.split('\n').map(v => v.replace(/#.*/, ''));
      for (const item of arr) {
        const fields = item
          .split(':')
          .map(v => v.trim())
          .filter(v => v);
        if (fields.length === 2) {
          const [key, value] = fields as [string, string];
          tempObj[key] = trimQuotes(value);
        }
      }

      let inputFormat: ColorFormat = 'abgr';
      const tempColorFormat = tempObj['color_format'];
      if (tempColorFormat && isColorFormat(tempColorFormat)) {
        inputFormat = tempColorFormat;
      }
      this.color_format = inputFormat;

      for (const key of Object.keys(tempObj)) {
        const value = tempObj[key];
        if (!value) {
          continue;
        }
        switch (key as keyof (WeaselColorScheme & SquirrelColorScheme)) {
          case 'name':
          case 'author':
          case 'color_space':
            this.$patch({
              [key]: value,
            });
            break;
          case 'text_color':
          case 'label_color':
          case 'comment_text_color':
          case 'back_color':
          case 'border_color':
          case 'candidate_text_color':
          case 'candidate_back_color':
          case 'hilited_text_color':
          case 'hilited_back_color':
          case 'hilited_candidate_text_color':
          case 'hilited_comment_text_color':
          case 'hilited_candidate_back_color':
          case 'shadow_color':
          case 'candidate_border_color':
          case 'candidate_shadow_color':
          case 'hilited_label_color':
          case 'hilited_mark_color':
          case 'hilited_shadow_color':
          case 'hilited_candidate_border_color':
          case 'hilited_candidate_shadow_color':
          case 'prevpage_color':
          case 'nextpage_color':
          case 'preedit_back_color':
          case 'hilited_candidate_label_color':
            this.$patch({
              [key]: importColor(value, inputFormat),
            });
            break;
        }
      }
    },
    /**
     * 还原配色方案
     */
    restoreScheme(): void {
      this.$patch({
        name: '',
        author: '',
        text_color: null,
        label_color: null,
        comment_text_color: null,
        back_color: null,
        border_color: null,
        candidate_text_color: null,
        candidate_back_color: null,
        hilited_text_color: null,
        hilited_back_color: null,
        hilited_candidate_text_color: null,
        hilited_comment_text_color: null,
        hilited_candidate_back_color: null,
        shadow_color: null,
        candidate_border_color: null,
        candidate_shadow_color: null,
        hilited_label_color: null,
        hilited_mark_color: null,
        hilited_shadow_color: null,
        hilited_candidate_border_color: null,
        hilited_candidate_shadow_color: null,
        prevpage_color: null,
        nextpage_color: null,
        preedit_back_color: null,
        hilited_candidate_label_color: null,
        color_format: 'abgr',
        color_space: 'srgb',
      });
    },

    /**
     * 暂存当前方案
     */
    saveScheme() {
      const savedItem: SchemeSavedItem = {
        id: Date.now().toString(),
      };

      const keys = Object.keys(this.$state);
      for (const key of keys) {
        switch (key) {
          case 'name':
          case 'author':
          case 'color_space':
          case 'color_format':
          case 'text_color':
          case 'label_color':
          case 'comment_text_color':
          case 'back_color':
          case 'border_color':
          case 'candidate_text_color':
          case 'candidate_back_color':
          case 'hilited_text_color':
          case 'hilited_back_color':
          case 'hilited_candidate_text_color':
          case 'hilited_comment_text_color':
          case 'hilited_candidate_back_color':
          case 'shadow_color':
          case 'candidate_border_color':
          case 'candidate_shadow_color':
          case 'hilited_label_color':
          case 'hilited_mark_color':
          case 'hilited_shadow_color':
          case 'hilited_candidate_border_color':
          case 'hilited_candidate_shadow_color':
          case 'prevpage_color':
          case 'nextpage_color':
          case 'preedit_back_color':
          case 'hilited_candidate_label_color':
            if (this.$state[key]) {
              Object.assign(savedItem, { [key]: this.$state[key] });
            }
            break;
        }
      }

      this.saved.push(savedItem);
    },

    /**
     * 删除暂存的方案
     * @param id 方案的唯一标识符
     */
    removeSavedScheme(id: string) {
      const index = this.saved.findIndex(item => item.id === id);
      if (index > -1) {
        this.saved.splice(index, 1);
      }
    },

    /**
     * 从暂存的方案导入
     * @param id 方案的唯一标识符
     */
    importSavedSeheme(id: string) {
      for (const item of this.saved) {
        if (item.id === id) {
          this.restoreScheme();
          this.$patch(item);
          break;
        }
      }
    },
  },
});
