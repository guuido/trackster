import { FillChar, FillColor, TextMode } from "./progressBar.types";

export function parseFillChar (fillChar: FillChar): string {
    switch(fillChar){
        case 'asterisk':
            return '*';
        case 'dot':
            return '.';
        case 'equals':
            return '=';
        case 'hash':
            return '#';
        case 'hyphen':
            return '-';
        case 'bar':
            return '|';
        case 'empty-block':
            return '░';
        case 'light-block':
            return '▒';
        case 'medium-block':
            return '▓';
        case 'full-block':
            return '█';
        default:
            return '#';
    }
}

export function parseFillColor (fillColor: FillColor): string {
    switch(fillColor){
        case 'black':
            return '\x1b[30m';
        case 'white':
            return '\x1b[37m';
        case 'magenta':
            return '\x1b[35m';
        case 'cyan':
            return '\x1b[36m';
        case 'yellow':
            return '\x1b[33m';
        case 'blue':
            return '\x1b[34m';
        case 'green':
            return '\x1b[32m';
        case 'red':
            return '\x1b[31m';
        default:
            return '\x1b[30m';
    }
}

export function generateProgressText (completed: number, total: number, mode: TextMode): string {
    switch(mode){
        case 'none':
            return '';
        case 'count':
            return `${completed}/${total}`;
        case 'percentage':
            if(completed == 0 && total == 0) return '0%';
            return `${Math.round((completed/total)*100)}%`;
        default:
            return '';
    }
}