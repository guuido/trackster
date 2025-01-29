import { generateProgressText, parseFillChar, parseFillColor } from "../src/utils";
import { FillChar, FillColor, ProgressBarConfig } from "../src/progressBar.types";

describe('parseFillChar', () => {
  
    const fillChars: FillChar[] = [
      'asterisk', 'dot', 'equals', 'hash', 'hyphen', 'bar', 
      'empty-block', 'light-block', 'medium-block', 'full-block'
    ];
  
    const expectedFillCharOutput: Record<FillChar, string> = {
      'asterisk': '*',
      'dot': '.',
      'equals': '=',
      'hash': '#',
      'hyphen': '-',
      'bar': '|',
      'empty-block': '░',
      'light-block': '▒',
      'medium-block': '▓',
      'full-block': '█'
    };
  
    fillChars.forEach((fillChar) => {
      it(`should return the correct character for '${fillChar}'`, () => {
        const result = parseFillChar(fillChar);
        expect(result).toBe(expectedFillCharOutput[fillChar]);
      });
    });
  
  });

  describe('parseFillColor', () => {

    const colors: FillColor[] = [
      'black', 'white', 'magenta', 'cyan', 'yellow', 'blue', 'green', 'red'
    ];
  
    const expectedColorCodes: Record<FillColor, string> = {
      'black': '\x1b[30m',
      'white': '\x1b[37m',
      'magenta': '\x1b[35m',
      'cyan': '\x1b[36m',
      'yellow': '\x1b[33m',
      'blue': '\x1b[34m',
      'green': '\x1b[32m',
      'red': '\x1b[31m',
    };
  
    colors.forEach((color) => {
      it(`should return the correct color code for '${color}'`, () => {
        const result = parseFillColor(color);
        expect(result).toBe(expectedColorCodes[color]);
      });
    });
  
  });

  describe('generateProgressText', () => {

    test('should return empty string when mode is none', () => {
        expect(generateProgressText(5, 10, 'none')).toBe('');
    });

    test('should return correct count format', () => {
        expect(generateProgressText(5, 10, 'count')).toBe('5/10');
        expect(generateProgressText(0, 10, 'count')).toBe('0/10');
        expect(generateProgressText(10, 10, 'count')).toBe('10/10');
    });

    test('should return correct percentage format', () => {
        expect(generateProgressText(5, 10, 'percentage')).toBe('50%');
        expect(generateProgressText(0, 10, 'percentage')).toBe('0%');
        expect(generateProgressText(10, 10, 'percentage')).toBe('100%');
        expect(generateProgressText(3, 10, 'percentage')).toBe('30%');
    });

    test('should round percentages correctly', () => {
        expect(generateProgressText(1, 3, 'percentage')).toBe('33%');
        expect(generateProgressText(2, 3, 'percentage')).toBe('67%');
        expect(generateProgressText(1, 6, 'percentage')).toBe('17%');
    });

    test('should return empty string for invalid mode', () => {
        expect(generateProgressText(5, 10, 'invalid' as any)).toBe('');
    });

    test('should handle edge cases', () => {
        expect(generateProgressText(1000000, 2000000, 'count')).toBe('1000000/2000000');
        expect(generateProgressText(1000000, 2000000, 'percentage')).toBe('50%');
        
        expect(generateProgressText(0, 0, 'percentage')).toBe('0%');
        expect(generateProgressText(0, 0, 'count')).toBe('0/0');
    });
});