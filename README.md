# ec-app-playwright

E2E test suite for an EC site built with Playwright and GitHub Actions CI.

## Tech Stack

- [Playwright](https://playwright.dev/) — E2E testing
- GitHub Actions — CI/CD (auto-run on push)

## Getting Started

```bash
npm ci
npx playwright install --with-deps
npx playwright test
