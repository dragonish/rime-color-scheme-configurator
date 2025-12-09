import 'mocha';
import { expect } from 'chai';
import { toYAMLString, trimQuotes } from '@/common/data';

describe('data.ts - Unit test', function () {
  describe('toYAMLString', function () {
    it('should escape single quotes in the input string', function () {
      const input = "This is a 'test' string.";
      const expected = "'This is a ''test'' string.'";
      const result = toYAMLString(input);
      expect(result).to.equal(expected);
    });
  });

  describe('trimQuotes', function () {
    it('should remove single quotes from the input string', function () {
      const input = "'This is a test string.'";
      const expected = 'This is a test string.';
      const result = trimQuotes(input);
      expect(result).to.equal(expected);
    });

    it('should remove double quotes from the input string', function () {
      const input = '"This is a test string."';
      const expected = 'This is a test string.';
      const result = trimQuotes(input);
      expect(result).to.equal(expected);
    });
  });
});
