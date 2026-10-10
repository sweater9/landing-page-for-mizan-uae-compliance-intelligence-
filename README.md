# Mizan — UAE Compliance Intelligence landing page

A responsive, buildless landing page for the Mizan demonstration application. Includes platform features, an illustrative workspace, a three-step workflow, evidence principles, native FAQ disclosures and application links.

## Run locally

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`. No dependencies, API keys, external fonts or build step are required.

## Validate

```sh
node --check app.js
node --test tests/landing.test.mjs
```

## Publish

The GitHub Pages workflow deploys the static assets after a push to `main`. In repository Settings → Pages, select **GitHub Actions** as the source. Pull requests run validation without deploying.

## Content and links

The application is hosted at https://mizan-uae-compliance-intelligence.onrender.com/ and its source is https://github.com/sweater9/mizan-uae-compliance-intelligence. The preview is illustrative; this landing page does not certify application availability, current legal data or production readiness. Regulatory claims should remain grounded in reviewed official sources.

The application’s Search and Ask Mizan views use in-page state, so their links intentionally open the application homepage. Company profiles, calendar and change monitoring use their existing route paths.

## Accessibility and privacy

Semantic landmarks, a skip link, visible focus styles, native FAQ controls, mobile menu state with Escape-to-close, reduced-motion support and readable responsive layouts. The content and navigation remain available without JavaScript. No analytics, forms, cookies or remote assets are included.
