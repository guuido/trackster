# Trackster

A customizable and lightweight CLI progress bar for Node.js, with support for dynamic colors, fill characters and progress updates.

## Features

- **Customizable Fill Characters**: Use different characters to represent progress (`#`, `.`, `*`, etc.)
- **Support for Colors**: Change the color of the progress bar.
- **Flexible Length**: Control the length of the progress bar.
- **Real-time Updates**: Easily update the progress bar during long-running tasks.

## Usage
Once installed, you can import and use the progress bar in your project.
  
### Basic Usage
```typescript
import { createProgressBar } from 'trackster';

const config = {
  fillChar: 'hash', // default is 'hash'
  color: 'green',   // optional, default is no color
  length: 50,       // optional, default is 100
  showBounds: true  // optional, default is true
};

const progressBar = createProgressBar(100, config);

for (let i = 0; i <= 100; i++) {
  // Update progress bar
  progressBar.updateProgressBar(i);
  setTimeout(() => {}, 100);
}

// Complete the progress bar once done
progressBar.completeProgressBar();
```
### Available Configuration Options

- `fillChar`: The character used to fill the progress bar. Options include:
  - `'dot'`
  - `'hash'`
  - `'asterisk'`
  - `'equals'`
  - `'hyphen'`
  - `'bar'`
  - `'empty-block'`
  - `'light-block'`
  - `'medium-block'`
  - `'full-block'`

  **Default**: `'hash'`

- `color`: The color of the progress bar. You can use the following colors:
  - `'red'`
  - `'green'`
  - `'blue'`
  - `'yellow'`
  - `'cyan'`
  - `'magenta'`
  - `'white'`
  - `'black'`

  **Default**: No color (use terminal defaults)

- `length`: The length of the progress bar in characters.

  **Default**: `100`

- `showBounds`: Whether to show square brackets around the progress bar.

  **Default**: `true`

- `emptyChar`: The character used to represent the empty space in the progress bar.

  **Default**: `' '` (space)
