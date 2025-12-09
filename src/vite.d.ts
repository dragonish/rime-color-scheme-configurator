/// <reference types="vite/client" />

type ColorString = string | null;

type InputMethodPlatform = 'weasel' | 'squirrel';

type ColorFormat = 'argb' | 'rgba' | 'abgr';

type ColorSpace = 'display_p3' | 'srgb';

type PageBackgroundMode = 'light' | 'dark';

type PageLanguage = 'zh-Hans' | 'zh-Hant';

/** 通用配色方案 */
interface ColorScheme {
  /** 配色名称 */
  name: string;
  /** 配色作者名称 */
  author: string;
  /** 文字颜色 (编辑区编码颜色) */
  text_color: ColorString;
  /** 标签颜色 */
  label_color: ColorString;
  /** 注释颜色 */
  comment_text_color: ColorString;
  /** 背景颜色 */
  back_color: ColorString;
  /** 边框颜色 */
  border_color: ColorString;
  /** 候选项文字颜色 */
  candidate_text_color: ColorString;
  /** 候选项背景颜色 */
  candidate_back_color: ColorString;
  /** 高亮区域文字颜色 */
  hilited_text_color: ColorString;
  /** 高亮区域背景颜色 */
  hilited_back_color: ColorString;
  /** 选中的候选区域文字颜色 */
  hilited_candidate_text_color: ColorString;
  /** 选中的候选区域注释颜色 */
  hilited_comment_text_color: ColorString;
  /** 选中的候选区域背景颜色 */
  hilited_candidate_back_color: ColorString;
}

/** 小狼毫配色方案 */
interface WeaselColorScheme extends ColorScheme {
  /** 颜色格式 */
  color_format: ColorFormat;
  /** 阴影颜色 */
  shadow_color: ColorString;
  /** 候选项边框颜色 */
  candidate_border_color: ColorString;
  /** 候选项阴影颜色 */
  candidate_shadow_color: ColorString;
  /** 选中的候选区域标签颜色 */
  hilited_label_color: ColorString;
  /** 选中的候选区域标签前的标记颜色 */
  hilited_mark_color: ColorString;
  /** 高亮区域阴影颜色 */
  hilited_shadow_color: ColorString;
  /** 选中的候选区域边框颜色 */
  hilited_candidate_border_color: ColorString;
  /** 选中的候选区域阴影颜色 */
  hilited_candidate_shadow_color: ColorString;
  /** 上一页箭头颜色 */
  prevpage_color: ColorString;
  /** 下一页箭头颜色 */
  nextpage_color: ColorString;
}

/** 鼠须管配色方案 */
interface SquirrelColorScheme extends ColorScheme {
  /** 色值所用色域 */
  color_space: ColorSpace;
  /** 编辑区背景颜色 */
  preedit_back_color: ColorString;
  /** 选中的候选区域标签颜色 */
  hilited_candidate_label_color: ColorString;
}
