import { createProgressBar } from "../src/index";
import { parseFillChar, parseFillColor } from "../src/utils";
import { FillChar, FillColor, ProgressBarConfig } from "../types/progressBar";

jest.mock('process', () => ({
    stdout: {
        write: jest.fn(),
    },
}));

describe('createProgressBar', () => {
    let progressBar: { updateProgressBar: Function; completeProgressBar: Function };

    beforeEach(() => {
        jest.spyOn(process.stdout, 'write').mockImplementation(() => true); 
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should initialize the progress bar with default configuration', () => {
        progressBar = createProgressBar(100);
        progressBar.updateProgressBar(50);

        expect(process.stdout.write).toHaveBeenCalledWith(
            '\r[##################################################                                                  ]'
        );
    });

    it('should correctly update progress bar with custom length', () => {
        const config: ProgressBarConfig = {
            fillChar: 'hash',
            length: 50,
        };

        progressBar = createProgressBar(100, config);
        progressBar.updateProgressBar(25);

        expect(process.stdout.write).toHaveBeenCalledWith(
            '\r[#############                                     ]'
        );
    });

    it('should throw an error if the completed value exceeds the total', () => {
        progressBar = createProgressBar(100);

        expect(() => progressBar.updateProgressBar(150)).toThrow(
            new Error('Completion amount is higher than total')
        );
    });

    it('should handle custom characters and colors', () => {
        const config: ProgressBarConfig = {
            fillChar: 'dot',
            color: 'red',
            length: 50,
            showBounds: false,
            emptyChar: '-',
        };

        progressBar = createProgressBar(100, config);
        progressBar.updateProgressBar(50);

        expect(process.stdout.write).toHaveBeenCalledWith(
            '\r\x1b[31m.........................-------------------------\x1b[39m'
        );
    });

    it('should handle progress completion', () => {
        progressBar = createProgressBar(100);
        progressBar.completeProgressBar();

        expect(process.stdout.write).toHaveBeenCalledWith('\n');
    });

});

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