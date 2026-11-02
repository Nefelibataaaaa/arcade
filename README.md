# Cheney Gong's Arcade

A SvelteKit arcade with a full **2048** game and a ported **6×6 mini crossword**
from Project 1. The 2048 rules live in a separate, published npm package,
[`@nefelibataaaaa/arcade-core`](https://www.npmjs.com/package/@nefelibataaaaa/arcade-core).

Live site (after deployment): `https://nefelibataaaaa.github.io/arcade/`

## What is in the app

- `/2048/` — a complete 4×4 2048 game with keyboard, swipe, and on-screen controls.
- `/crossword/` — the Project 1 word square, now driven by Svelte state.
- `/` — the landing page and cabinet lineup.
- `/about/` and `/contact/` — the Project 1 pages, rebuilt as Svelte components.
- A responsive dark arcade design system shared by every route.

### 2048 features

- Arrow keys, W A S D, mobile swipe gestures, and an on-screen D-pad.
- One merge per tile per move (`2 2 2 2` becomes `4 4`).
- Live score, persistent best score, New Game, win at 2048 with continued play,
  and loss when no move remains.
- **localStorage**: the board, score, win/loss state, seed, and best score survive
  a reload.
- **Seed generator**: enter a seed and the spawn sequence is reproducible.
- Animated tile movement, spawn scale transitions, and merge pops.
- All 11 tile values from 2 to 2048 have their own colour in a single gold ramp,
  plus a deeper colour for 4096+ tiles. Every number/background pair is at least
  4.5:1.

### Accessibility

- Every page is keyboard operable with a visible focus ring.
- Score changes and game-over/win states are announced through `aria-live`.
- The on-screen D-pad is only shown at mobile widths (≤ 640px).
- The layout was checked at 320px, 640px, 1280px, 1920px.
- Lighthouse accessibility: **100** on every route.

## Svelte 5 requirements map

| Requirement | Where it appears |
|---|---|
| `$state` | `src/lib/games/2048/game.svelte.js`, `src/lib/state/scores.svelte.js`, crossword letters, nav menu, seed form |
| `$derived` | Crossword progress/solved, best score, score formatting, board description, tile classes |
| `$props` | Every component under `src/lib/components/` |
| Keyed each block | `GameBoard.svelte` (tiles by id), `CrosswordBoard.svelte` (cells), clue lists, solution rows |
| ≥ 3 non-route components | NavBar, SiteFooter, GameCard, Timeline, ContactCard, CrosswordBoard, CrosswordClues, SolutionPanel, GameBoard, Tile, ScoreBoard, NewGameButton, OnscreenKeyboard, SeedForm, GameStatus |
| Callback props (data down, events up) | `onmove` (GameBoard / OnscreenKeyboard), `onletter` (CrosswordBoard), `onnewgame`, `onstart`, `onrestart` |
| Scoped component styles | Every component has its own `<style>` block |
| `class:` / `style:` directives | Nav links, tiles, crossword cells, game cards; tile grid position uses `style:--row` / `style:--col` |
| Svelte transitions | `in:scale` and `out:scale` on tiles, `slide` on the crossword solution, `fly` on game status |
| Shared state in `.svelte.js` | `src/lib/games/2048/game.svelte.js` and `src/lib/state/scores.svelte.js` |
| No `$effect` state syncing | The game updates board, score, and flags explicitly in `move()`; `$derived` is used for computed values |

## Project structure

```
src/
├── app.css                     global base styles
├── app.html                    document shell
├── lib/
│   ├── components/             shared and game components
│   │   └── game2048/           Tile, GameBoard, ScoreBoard, controls, status
│   ├── data/crossword.js       grid, clues, numbering, solution
│   ├── games/2048/
│   │   ├── game.svelte.js      Game2048 class (state + persistence)
│   │   └── tiles.js            tile ids, board conversion, colour helpers
│   ├── state/scores.svelte.js  shared persistent best score
│   └── styles/tokens.css       colour, type, spacing, radius, motion tokens
└── routes/
    ├── +layout.svelte          nav, main landmark, footer
    ├── +page.svelte            landing page
    ├── 2048/+page.svelte
    ├── crossword/+page.svelte
    ├── about/+page.svelte
    └── contact/+page.svelte
```

## Local development

The app is one half of a two-repository project. In this workspace, the sibling
`arcade-core` package is linked through npm workspaces, so one install from the
workspace root is enough:

```bash
cd ..
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in build/
npm run check      # svelte-check
```

To run this repository by itself, the package must be installed from npm:

```bash
npm install
npm run dev
```

The dependency is declared in `package.json` as
`"@nefelibataaaaa/arcade-core": "^1.1.0"`, so the app always installs the
published package rather than a local link.

## Deployment

The site is fully static and uses `@sveltejs/adapter-static`. The GitHub Actions
workflow in `.github/workflows/deploy.yml` builds with the repository's Pages
base path and publishes `build/` to GitHub Pages.

1. Push the app repository to GitHub as `arcade`.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. Run the `Deploy to GitHub Pages` workflow (or push to `main`).

The workflow sets `BASE_PATH` from `actions/configure-pages`, so links and
assets work both at `localhost` and under `/arcade/`.

## Content and credits

- The crossword grid is adapted from a 1927 double word square published in
  *The Sun* (Auckland), digitised by Papers Past (National Library of New
  Zealand). The top-left square is blocked and all twelve clues are original
  to the Project 1 assignment.
- Fonts are the system UI and monospace stacks; no font or icon library is
  loaded.
- 2048 rules are original JavaScript in `@nefelibataaaaa/arcade-core`; no 2048
  library or third-party game code is used.
