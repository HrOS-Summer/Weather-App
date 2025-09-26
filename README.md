### Weather App (React + Vite)

A modern weather application built with React 19 and Vite 7. It fetches geolocation (with graceful fallbacks), queries Open‑Meteo APIs for current, hourly, and 7‑day forecasts, and renders a responsive, accessible UI with Tailwind CSS 4.

---

## Features
- **Geolocation with fallback**: Uses the browser Geolocation API; if denied/unavailable, falls back to approximate IP geolocation via `https://ipwho.is/`.
- **City search**: Query by city name via Open‑Meteo Geocoding API.
- **Weather data**: Current conditions, hourly temperatures, and 7‑day forecast via Open‑Meteo Forecast API.
- **Weather code mapping**: Translates weather codes to readable descriptions and icons.
- **Responsive UI**: Mobile-first layouts; horizontal scroll on mobile, grid on desktop.
- **Accessibility**: Semantic markup, labeled icons, keyboard-friendly input.
- **Testing**: Vitest + Testing Library integration tests that cover PRD scenarios end‑to‑end.

---

## Tech Stack
- React 19, Vite 7
- Tailwind CSS 4
- Axios
- Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event

---

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended) and npm 9+
- Windows users: If using PowerShell, ensure Node/npm are on PATH.

### Install
```
npm install
```

### Run Dev Server
```
npm run dev
```
- Dev server: http://localhost:5173
- To bind a specific port: `npm run dev -- --port 5173 --strictPort`

### Build
```
npm run build
```
Outputs production assets in `dist/`.

### Preview (serve built app)
```
npm run preview
```

---

## Testing
This repo includes a runnable integration test suite covering the PRD scenarios.

- Run all tests (headless):
```
npm run test
```
- Run in watch/UI mode:
```
npm run test:ui
```

### What’s covered
- Initial load: permission denied → IP fallback; loader state hides when complete
- City search: displays current metrics, hourly, and weekly forecast
- Weather code mapping: description/icon rendered
- Loader visibility during async fetch
- Error handling: search with no results
- Accessibility: input and status areas

Tests live in `src/__tests__/app.test.jsx`.

---

## Configuration
- `vite.config.js`: Vite + React + Tailwind CSS plugin setup.
- `vitest.config.ts`: Enables jsdom environment, React plugin, and `vitest.setup.ts`.
- `vitest.setup.ts`: Extends `expect` with jest‑dom matchers and provides a `matchMedia` mock.

---

## Project Structure
```
Weather-App/
  src/
    components/
      CurrentWeather.jsx
      ErrorMessage.jsx
      HourlyTemperature.jsx
      Loader.jsx
      SearchBar.jsx
      WeatherCard.jsx
      WeeklyForecast.jsx
    constants/
      weatherCode.js
    services/
      weatherService.js
    utils/
      weatherUtils.js
    App.jsx
    main.jsx
    index.css
  public/
  testsprite_tests/           # local testing artifacts (ignored in git where appropriate)
  vitest.config.ts
  vitest.setup.ts
  vite.config.js
  package.json
```

---

## Environment Variables
The app uses only public APIs and does not require secrets by default. If you add private endpoints later, put keys in a `.env` and do not commit it.

Ignored by default:
- `.env`, `.env.local`, `.env.*.local`

---

## External APIs
- Geocoding (city → lat/lon): `https://geocoding-api.open-meteo.com/v1/search?name=...`
- Reverse geocoding: `https://geocoding-api.open-meteo.com/v1/reverse?latitude=..&longitude=..`
- Forecast: `https://api.open-meteo.com/v1/forecast?...`
- IP geolocation fallback: `https://ipwho.is/`

---

## Troubleshooting
- “vite is not recognized”: Ensure `node_modules/.bin` is available via npm scripts; run through `npm run dev` instead of `vite` directly.
- Windows EPERM unlink errors on `node_modules/*lightningcss*`:
  - Close running dev servers and editors watching files
  - Remove `node_modules` and `package-lock.json`, then `npm install`
- Port already in use: Change port `npm run dev -- --port 5174 --strictPort` or free 5173.

---

## Accessibility & Responsiveness
- Icons include accessible labels where applicable; inputs have placeholders and keyboard support.
- Mobile devices use horizontal scroll for the hourly strip; desktop renders grid layouts.

---

## Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview built app
- `npm run lint` — run ESLint
- `npm run test` — run tests once
- `npm run test:ui` — run tests in watch/UI mode

---

## License
MIT (replace or update as needed)

---

## Notes
- This app is educational and uses public APIs without authentication. Always check provider rate limits and terms before deploying to production.
