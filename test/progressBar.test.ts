import { createProgressBar } from "../src/index";
import { generateProgressText, parseFillChar, parseFillColor } from "../src/utils";
import { FillChar, FillColor, ProgressBarConfig } from "../src/progressBar.types";

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