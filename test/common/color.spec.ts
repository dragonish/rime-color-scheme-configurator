import 'mocha';
import { expect } from 'chai';
import { hexaToColorRef, colorRefToHexa, blendColors, blendHexaColors, outputColor, importColor } from '@/common/color';

describe('color.ts - Unit test', function () {
  describe('hexaToColorRef', function () {
    it('should convert valid hexa color string to COLORREF', function () {
      const result = hexaToColorRef('#663399ff');
      expect(colorRefToHexa(result)).to.equal('#663399ff');
    });

    it('should handle hexa color without hash symbol', function () {
      const result = hexaToColorRef('663399ff');
      expect(colorRefToHexa(result)).to.equal('#663399ff');
    });

    it('should convert black color correctly', function () {
      const result = hexaToColorRef('#000000ff');
      expect(colorRefToHexa(result)).to.equal('#000000ff');
    });

    it('should convert white color correctly', function () {
      const result = hexaToColorRef('#ffffffff');
      expect(colorRefToHexa(result)).to.equal('#ffffffff');
    });

    it('should handle semi-transparent color', function () {
      const result = hexaToColorRef('#ff000080');
      expect(colorRefToHexa(result)).to.equal('#ff000080');
    });
  });

  describe('colorRefToHexa', function () {
    it('should convert COLORREF to hexa color string', function () {
      const colorRef = (0xff << 24) | (0x99 << 16) | (0x33 << 8) | 0x66;
      const result = colorRefToHexa(colorRef);
      expect(result).to.equal('#663399ff');
    });

    it('should convert black COLORREF to hexa string', function () {
      const result = colorRefToHexa(hexaToColorRef('#000000ff'));
      expect(result).to.equal('#000000ff');
    });

    it('should convert white COLORREF to hexa string', function () {
      const result = colorRefToHexa(hexaToColorRef('#ffffffff'));
      expect(result).to.equal('#ffffffff');
    });

    it('should pad zeros for single digit hex values', function () {
      const original = '#0b0a09ff';
      const colorRef = hexaToColorRef(original);
      const result = colorRefToHexa(colorRef);
      expect(result).to.equal(original);
    });
  });

  describe('hexaToColorRef and colorRefToHexa', function () {
    it('should round-trip conversion correctly', function () {
      const original = '#aa55cc99';
      const colorRef = hexaToColorRef(original);
      const result = colorRefToHexa(colorRef);
      expect(result).to.equal(original);
    });
  });

  describe('blendColors', function () {
    it('should blend two fully opaque colors', function () {
      const foreground = hexaToColorRef('#ff0000ff'); // Red, fully opaque
      const background = hexaToColorRef('#0000ffff'); // Blue, fully opaque
      const result = blendColors(foreground, background);
      // Result should be the foreground color since it's fully opaque
      expect(colorRefToHexa(result)).to.equal('#ff0000ff');
    });

    it('should blend semi-transparent foreground with opaque background', function () {
      const foreground = hexaToColorRef('#ff000080'); // Red, 50% transparent
      const background = hexaToColorRef('#0000ffff'); // Blue, fully opaque
      const result = blendColors(foreground, background);
      // Result should be a mix of red and blue
      const hexResult = colorRefToHexa(result);
      expect(hexResult).to.not.equal('#ff0000ff');
      expect(hexResult).to.not.equal('#0000ffff');
    });

    it('should handle fully transparent foreground', function () {
      const foreground = hexaToColorRef('#ff000000'); // Red, fully transparent
      const background = hexaToColorRef('#0000ffff'); // Blue, fully opaque
      const result = blendColors(foreground, background);
      // Result should be the background color
      expect(colorRefToHexa(result)).to.equal('#0000ffff');
    });

    it('should handle both colors with partial transparency', function () {
      const foreground = hexaToColorRef('#ff000080'); // Red, 50% transparent
      const background = hexaToColorRef('#00ff0080'); // Green, 50% transparent
      const result = blendColors(foreground, background);
      const hexResult = colorRefToHexa(result);
      // Result should have a different alpha value than the inputs
      expect(hexResult).to.not.equal('#ff000080');
      expect(hexResult).to.not.equal('#00ff0080');
    });

    it('should preserve alpha channel in result', function () {
      const foreground = hexaToColorRef('#ffffff40'); // White, ~25% opacity
      const background = hexaToColorRef('#00000040'); // Black, ~25% opacity
      const result = blendColors(foreground, background);
      const hexResult = colorRefToHexa(result);
      // Extract alpha channel (last 2 characters)
      const alpha = hexResult.slice(-2);
      // Alpha should be a valid hex and not be '00'
      expect(parseInt(alpha, 16)).to.be.greaterThan(0);
    });
  });

  describe('blendHexaColors', function () {
    it('should blend hexa colors and return hexa string', function () {
      const foreground = '#ff0000ff';
      const background = '#0000ffff';
      const result = blendHexaColors(foreground, background);
      expect(result).to.match(/^#[0-9a-f]{8}$/i);
    });

    it('should handle hexa colors without hash symbol', function () {
      const foreground = 'ff0000ff';
      const background = '0000ffff';
      const result = blendHexaColors(foreground, background);
      expect(result).to.match(/^#[0-9a-f]{8}$/i);
    });

    it('should produce consistent results', function () {
      const foreground = '#ff000080';
      const background = '#0000ff80';
      const result1 = blendHexaColors(foreground, background);
      const result2 = blendHexaColors(foreground, background);
      expect(result1).to.equal(result2);
    });

    it('should blend same colors correctly', function () {
      const color = '#ff0000ff';
      const result = blendHexaColors(color, color);
      expect(result).to.equal(color);
    });

    it('should handle grayscale colors', function () {
      const foreground = '#80808080'; // Gray, 50% transparent
      const background = '#ffffff80'; // White, 50% transparent
      const result = blendHexaColors(foreground, background);
      expect(result).to.match(/^#[0-9a-f]{8}$/i);
    });

    it('should blend transparent and opaque colors', function () {
      const transparent = '#ff000000'; // Red, fully transparent
      const opaque = '#00ff00ff'; // Green, fully opaque
      const result = blendHexaColors(transparent, opaque);
      expect(result).to.equal('#00ff00ff');
    });
  });

  describe('Edge cases', function () {
    it('should handle zero alpha values', function () {
      const foreground = hexaToColorRef('#ff000000');
      const background = hexaToColorRef('#0000ffff');
      const result = blendColors(foreground, background);
      expect(result).to.be.a('number');
      expect(colorRefToHexa(result)).to.equal('#0000ffff');
    });

    it('should handle maximum color values', function () {
      const foreground = hexaToColorRef('#ffffffff');
      const background = hexaToColorRef('#ffffffff');
      const result = blendColors(foreground, background);
      expect(colorRefToHexa(result)).to.equal('#ffffffff');
    });

    it('should handle minimum color values', function () {
      const foreground = hexaToColorRef('#00000000');
      const background = hexaToColorRef('#00000000');
      const result = blendColors(foreground, background);
      expect(result).to.be.a('number');
    });

    it('should handle red color channel', function () {
      const result = hexaToColorRef('#ff0000ff');
      expect(colorRefToHexa(result)).to.equal('#ff0000ff');
    });

    it('should handle green color channel', function () {
      const result = hexaToColorRef('#00ff00ff');
      expect(colorRefToHexa(result)).to.equal('#00ff00ff');
    });

    it('should handle blue color channel', function () {
      const result = hexaToColorRef('#0000ffff');
      expect(colorRefToHexa(result)).to.equal('#0000ffff');
    });
  });

  describe('outputColor', () => {
    it('should output ARGB for #RRGGBB input (default opaque)', () => {
      expect(outputColor('#112233', 'argb')).to.equal('0xff112233');
    });
    it('should output RGBA for #RRGGBB input (default opaque)', () => {
      expect(outputColor('#112233', 'rgba')).to.equal('0x112233ff');
    });
    it('should output ABGR for #RRGGBB input (default opaque)', () => {
      expect(outputColor('#112233', 'abgr')).to.equal('0xff332211');
    });
    it('should output ARGB for #RRGGBBAA input', () => {
      expect(outputColor('#11223344', 'argb')).to.equal('0x44112233');
    });
    it('should output RGBA for #RRGGBBAA input', () => {
      expect(outputColor('#11223344', 'rgba')).to.equal('0x11223344');
    });
    it('should output ABGR for #RRGGBBAA input', () => {
      expect(outputColor('#11223344', 'abgr')).to.equal('0x44332211');
    });
    it('should support lowercase hex input', () => {
      expect(outputColor('#aabbccdd', 'argb')).to.equal('0xddaabbcc');
    });
    it('should support hex input without #', () => {
      expect(outputColor('aabbccdd', 'rgba')).to.equal('0xaabbccdd');
    });
    it('should throw error for invalid length input', () => {
      expect(() => outputColor('#1234', 'argb')).to.throw('Invalid color format');
    });
    it('should correctly parse short hex format #RGB', () => {
      expect(outputColor('#123', 'argb')).to.equal('0xff112233');
    });
  });

  describe('importColor', () => {
    it('should convert ARGB input 0xff0000ff to #ff0000ff', () => {
      expect(importColor('0xff0000ff', 'argb')).to.equal('#0000ffff');
    });
    it('should convert RGBA input 0xff0000ff to #ff0000ff', () => {
      expect(importColor('0xff0000ff', 'rgba')).to.equal('#ff0000ff');
    });
    it('should convert ABGR input 0xff0000ff to #ff0000ff', () => {
      expect(importColor('0xff0000ff', 'abgr')).to.equal('#ff0000ff');
    });
    it('should convert 6-digit input (no alpha) assuming alpha=ff for ARGB', () => {
      // 0xff0000 → ARGB: A=ff, R=ff, G=00, B=00 → #ff0000ff
      expect(importColor('0xff0000', 'argb')).to.equal('#ff0000ff');
    });
    it('should convert 6-digit input (no alpha) assuming alpha=ff for RGBA', () => {
      // 0xff0000 → RGBA: R=ff, G=00, B=00, A=ff → #ff0000ff
      expect(importColor('0xff0000', 'rgba')).to.equal('#ff0000ff');
    });
    it('should convert 6-digit input (no alpha) assuming alpha=ff for ABGR', () => {
      // 0xff0000 → ABGR: A=ff, B=ff, G=00, R=00 → #0000ffff
      expect(importColor('0xff0000', 'abgr')).to.equal('#0000ffff');
    });
    it('should throw error for invalid format string', () => {
      expect(() => importColor('0xff0000ff', 'invalid' as ColorFormat)).to.throw();
    });
    it('should throw error if inputColor does not start with 0x', () => {
      expect(() => importColor('ff0000ff', 'argb')).to.throw();
    });
    it('should throw error for invalid length hex string', () => {
      expect(() => importColor('0xff00', 'rgba')).to.throw();
    });
  });
});
