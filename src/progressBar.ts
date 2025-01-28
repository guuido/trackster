import { ProgressBarConfig } from "../types/progressBar";
import { parseFillChar, parseFillColor } from "./utils";

export function createProgressBar(
  total: number,
  config: ProgressBarConfig = { fillChar: 'hash' }
) {

  let completed = 0;

  function updateProgressBar(newCompleted: number) {
    if (newCompleted > total) {
      throw new Error("Completion amount is higher than total");
    }

    completed = newCompleted;
    const progressBarLength = config.length ? config.length : 100;
    const completedLength = Math.round((progressBarLength * completed) / total);

    const showBounds = config.showBounds !== undefined ? config.showBounds : true;

    const start = showBounds ? '[' : '';
    const colorPrefix = config.color ? parseFillColor(config.color) : '';
    const filled = parseFillChar(config.fillChar).repeat(completedLength);
    const empty = config.emptyChar? config.emptyChar.repeat(progressBarLength - completedLength) : ' '.repeat(progressBarLength - completedLength);
    const colorSuffix = config.color ? '\x1b[39m' : '';
    const end = showBounds ? ']' : '';

    const bar = `${start}${colorPrefix}${filled}${empty}${colorSuffix}${end}`;

    process.stdout.write(`\r${bar}`);
  }

  function completeProgressBar() {
    process.stdout.write('\n'); 
  }

  return { updateProgressBar, completeProgressBar };
}