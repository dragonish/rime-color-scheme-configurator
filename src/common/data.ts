export const colorFormatOptions: ColorFormat[] = ['argb', 'rgba', 'abgr'];
export const colorSpaceOptions: ColorSpace[] = ['display_p3', 'srgb'];

export const LOCALSTORAGE_KEYS = {
  PLATFORM: 'rimePlatform',
  PAGE_BACKGROUND: 'rimePageBackground',
  PAGE_LANGUAGE: 'rimePageLanguage',
};

export function isColorFormat(format: string): format is ColorFormat {
  return (colorFormatOptions as string[]).includes(format);
}

export function toYAMLString(input: string): string {
  const result = input.replace(/'/g, "''");
  return `'${result}'`;
}

/**
 * 使用正则表达式去除空格和首尾单引号或双引号
 * @param str 要处理的字符串
 */
export function trimQuotes(str: string = '') {
  return str.trim().replace(/^['"]|['"]$/g, '');
}
