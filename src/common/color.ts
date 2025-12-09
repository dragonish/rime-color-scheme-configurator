/**
 * 将 hexa 颜色字符串转换为 COLORREF 数值
 * @param hexaColor 例如 #000000ff
 * @returns COLORREF 数值
 */
export function hexaToColorRef(hexaColor: string): number {
  // 移除 # 符号
  const hex = hexaColor.replace('#', '');

  // 解析颜色值
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const a = parseInt(hex.substring(6, 8), 16);

  // 构建 COLORREF (ARGB 格式)
  return (a << 24) | (b << 16) | (g << 8) | r;
}

/**
 * 将 COLORREF 数值转换为 hexa 颜色字符串
 * @param colorRef COLORREF 数值
 * @returns hexa 颜色字符串，例如 #000000ff
 */
export function colorRefToHexa(colorRef: number): string {
  const a = (colorRef >> 24) & 0xff;
  const b = (colorRef >> 16) & 0xff;
  const g = (colorRef >> 8) & 0xff;
  const r = colorRef & 0xff;

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
}

/**
 * 混合两个颜色
 * @param fcolor 前景色 (COLORREF)
 * @param bcolor 背景色 (COLORREF)
 * @returns 混合后的颜色 (COLORREF)
 */
export function blendColors(fcolor: number, bcolor: number): number {
  // 提取各通道的值
  const fA = (fcolor >> 24) & 0xff; // 获取前景的 alpha 通道
  const fB = (fcolor >> 16) & 0xff; // 获取前景的 blue 通道
  const fG = (fcolor >> 8) & 0xff; // 获取前景的 green 通道
  const fR = fcolor & 0xff; // 获取前景的 red 通道
  const bA = (bcolor >> 24) & 0xff; // 获取背景的 alpha 通道
  const bB = (bcolor >> 16) & 0xff; // 获取背景的 blue 通道
  const bG = (bcolor >> 8) & 0xff; // 获取背景的 green 通道
  const bR = bcolor & 0xff; // 获取背景的 red 通道

  // 将 alpha 通道转换为 [0, 1] 的浮动值
  const fAlpha = fA / 255.0;
  const bAlpha = bA / 255.0;

  // 计算每个通道的加权平均值
  const retAlpha = fAlpha + (1 - fAlpha) * bAlpha;

  // 混合红、绿、蓝通道
  const retR = Math.round((fR * fAlpha + bR * bAlpha * (1 - fAlpha)) / retAlpha);
  const retG = Math.round((fG * fAlpha + bG * bAlpha * (1 - fAlpha)) / retAlpha);
  const retB = Math.round((fB * fAlpha + bB * bAlpha * (1 - fAlpha)) / retAlpha);

  // 返回合成后的颜色
  return (Math.round(retAlpha * 255) << 24) | (retB << 16) | (retG << 8) | retR;
}

/**
 * 混合两个 hexa 格式的颜色
 * @param fcolor 前景色 (hexa 格式)
 * @param bcolor 背景色 (hexa 格式)
 * @returns 混合后的颜色 (hexa 格式)
 */
export function blendHexaColors(fcolor: string, bcolor: string): string {
  const fColorRef = hexaToColorRef(fcolor);
  const bColorRef = hexaToColorRef(bcolor);
  const resultColorRef = blendColors(fColorRef, bColorRef);
  return colorRefToHexa(resultColorRef);
}

/**
 * 将 hex 或 hexa 字符串转换为 32位整数格式颜色（ARGB 格式）
 * 支持 #RRGGBB 或 #RRGGBBAA，若无 alpha 则默认 alpha = 255
 */
function parseColor(inputColor: string): { a: number; r: number; g: number; b: number } {
  let hex = inputColor.toLowerCase().replace('#', '');
  if (hex.length === 3) {
    // 支持 #RGB 简写
    hex = hex
      .split('')
      .map(ch => ch + ch)
      .join('');
  }
  if (hex.length === 6) {
    hex += 'ff'; // 默认为不透明
  }
  if (hex.length !== 8) {
    throw new Error('Invalid color format');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const a = parseInt(hex.substring(6, 8), 16);
  return { a, r, g, b };
}

/**
 * 输出对应格式的颜色字符串，格式以 0x 开头，保证 8 位十六进制字母小写填充
 * ARGB: alpha red green blue
 * RGBA: red green blue alpha
 * ABGR: alpha blue green red
 */
export function outputColor(inputColor: string, outputFormat: ColorFormat): string {
  const { a, r, g, b } = parseColor(inputColor);
  let val: number;
  switch (outputFormat) {
    case 'argb':
      val = (a << 24) | (r << 16) | (g << 8) | b;
      break;
    case 'rgba':
      val = (r << 24) | (g << 16) | (b << 8) | a;
      break;
    case 'abgr':
      val = (a << 24) | (b << 16) | (g << 8) | r;
      break;
    default:
      throw new Error('Unsupported color format');
  }

  //! 使用无符号 32 位整数，避免负数
  const unsignedVal = val >>> 0; // 转为无符号 32 位整数
  // 输出格式：0x开头，8位16进制小写字符串
  return '0x' + unsignedVal.toString(16).padStart(8, '0');
}

/**
 * 解析 inputColor（0x 开头 hex 数字字符串）为 RGBA 对象
 */
function parseInputColor(inputColor: string, inputFormat: ColorFormat): { r: number; g: number; b: number; a: number } {
  if (!inputColor.startsWith('0x')) {
    throw new Error('inputColor must start with 0x');
  }
  let hex = inputColor.slice(2).toLowerCase();
  // 6 位补全为 8 位（补 alpha = ff）
  if (hex.length === 6) {
    switch (inputFormat) {
      case 'rgba':
        hex += 'ff';
        break;
      case 'abgr':
      case 'argb':
      default:
        hex = 'ff' + hex;
        break;
    }
  }
  if (hex.length !== 8) {
    throw new Error('inputColor must have 6 or 8 hex digits after 0x');
  }
  let a: number, r: number, g: number, b: number;
  switch (inputFormat) {
    case 'argb':
      // 0xAARRGGBB
      a = parseInt(hex.slice(0, 2), 16);
      r = parseInt(hex.slice(2, 4), 16);
      g = parseInt(hex.slice(4, 6), 16);
      b = parseInt(hex.slice(6, 8), 16);
      break;
    case 'rgba':
      // 0xRRGGBBAA
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16);
      break;
    case 'abgr':
      // 0xAABBGGRR
      a = parseInt(hex.slice(0, 2), 16);
      b = parseInt(hex.slice(2, 4), 16);
      g = parseInt(hex.slice(4, 6), 16);
      r = parseInt(hex.slice(6, 8), 16);
      break;
    default:
      throw new Error(`Unsupported inputFormat: ${inputFormat}`);
  }
  return { r, g, b, a };
}

/**
 * 格式化为 hexa 格式字符串 "#rrggbbaa"
 */
function toHexaColor({ r, g, b, a }: { r: number; g: number; b: number; a: number }): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;
}

/**
 * 导入颜色
 */
export function importColor(inputColor: string, inputFormat: ColorFormat): string {
  const rgba = parseInputColor(inputColor, inputFormat);
  return toHexaColor(rgba);
}
