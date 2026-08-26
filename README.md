# SF2 Clan Mark Generator

A web application for creating and customizing **Special Force 2** clan marks (emblems). Built with React, TypeScript, and Vite.

## Features

- **3-Layer Composition** — Build your clan mark by selecting assets across three layers:
  - **Logo** (background) — The main emblem or symbol
  - **Pattern** (middle) — A decorative pattern overlay
  - **Overlay** (foreground) — A foreground accent element
- **Live Preview** — See your clan mark update in real time as you make selections
- **Download as PNG** — Export your completed clan mark as a high-quality PNG image
- **Randomize** — Quickly generate a random combination of assets
- **Reset** — Clear all selections and start over
- **Dark / Light Theme** — Toggle between dark and light mode

## Usage

1. **Select a layer** — For each of the three stages (Logo, Pattern, Overlay), choose a category and then pick an asset from that category.
2. **Preview** — The live preview panel updates automatically as you select assets. A checkmark indicator shows when all three layers are filled.
3. **Download** — Once all layers are selected, click the **Download Clan Mark** button to export the composite image as a PNG file.
4. **Randomize** — Click the **Randomize** button to instantly fill all layers with randomly chosen assets.
5. **Reset** — Click the **Reset** button to clear all selections and start from scratch.
6. **Theme** — Use the sun/moon icon in the header to switch between light and dark mode.

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build

```bash
npm run build
```

The production build will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **Oxlint** — Linting

## License

This project is for educational and entertainment purposes. Special Force 2 is a trademark of its respective owners.