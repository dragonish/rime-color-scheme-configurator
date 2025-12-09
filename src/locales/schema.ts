import zhHans from './zh-Hans.json';

/** message schema */
export type MessageSchema = typeof zhHans;

export function getLocalLanguage(): PageLanguage {
  const lang = navigator.language;
  if (lang.toLowerCase().includes('zh-hant')) {
    return 'zh-Hant';
  }
  return 'zh-Hans';
}
