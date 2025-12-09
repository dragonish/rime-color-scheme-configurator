import { createI18n } from 'vue-i18n';
import zhHans from './zh-Hans.json';
import zhHant from './zh-Hant.json';
import { getLocalLanguage, type MessageSchema } from './schema';

const i18n = createI18n<[MessageSchema], PageLanguage>({
  legacy: false,
  locale: getLocalLanguage(),
  fallbackLocale: 'zh-Hans',
  messages: {
    'zh-Hans': zhHans,
    'zh-Hant': zhHant,
  },
});

export default i18n;
