export interface ProgressBarConfig {
    fillChar: FillChar;
    emptyChar?: string;
    color?: FillColor;
    length?: number;
    showBounds?: boolean
}


export type FillChar = 'dot' | 'hash' | 'bar' | 'full-block' | 'medium-block' | 'light-block' | 'empty-block' | 'asterisk' | 'equals' | 'hyphen';

export type FillColor = 'red' | 'green' | 'blue' | 'yellow' | 'cyan' | 'magenta' | 'white' | 'black';