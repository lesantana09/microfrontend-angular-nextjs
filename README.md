# Microfrontend Angular + Next.js

## Project Purpose
This repository showcases a microfrontend architecture in which a Next.js host dynamically loads and renders an Angular 16 application exposed through Webpack Module Federation. The objective is to demonstrate how independent frameworks can share UI features at runtime while keeping their build and deployment lifecycles isolated.

## Repository Structure
- `angular-app`: Angular standalone remote exposed as `angularApp/HomePage`.
- `next-host`: Next.js 14 host application responsible for loading the remote.

## Requirements
- Node.js 18.17+ (use the same version for both projects if possible).
- npm 9+.

## Installation
Install the dependencies in each project:

```bash
cd angular-app
npm install

cd ../next-host
npm install
```

## Running Locally

### Angular Remote (`angular-app`)
1. `cd angular-app`
2. `npm install` (only for the first run)
3. `npm run run:all`

This command starts the Angular dev server on port `4200` and exposes the `remoteEntry.js`, `runtime.js`, and `polyfills.js` files required by the host. They become available at `http://localhost:4200/`.

If the remote runs on a different origin, update the `ANGULAR_REMOTE_URL` environment variable on the host to point to the new base URL.

### Next.js Host (`next-host`)
1. `cd next-host`
2. `npm install` (only for the first run)
3. `npm run dev`

The host runs at `http://localhost:3000`. Before starting, you can set `ANGULAR_REMOTE_URL` if the remote is not available at `http://localhost:4200`.

## Testing the Microfrontend
1. Ensure the Angular remote is running on port `4200` and the Next.js host is running on port `3000`.
2. Navigate to `http://localhost:3000`. The home page displays the heading "Next Host + Angular Remote".
3. Below the heading, the Angular remote renders a card with the title "Angular Remote" and the configured message. Seeing this component means the host successfully loaded the scripts from the remote and executed its `renderHome` function.
4. Optional: Open the browser DevTools Network tab and confirm that `remoteEntry.js`, `runtime.js`, and `polyfills.js` were fetched from `http://localhost:4200`. Missing files indicate that the remote was not found.

## Useful Scripts
- `angular-app`: `npm test -- --watch=false --browsers=ChromeHeadless` runs Angular unit tests.
- `angular-app`: `npm run build` produces the production bundle in `dist/angular-app`.
- `next-host`: `npm run build` builds the host for production.

With both projects running, the Next.js host consumes the Angular component at runtime, allowing you to validate integration flows typical of a microfrontend architecture.
