# Varun's portfolio

This repository contains the React/Vite source for [thisisvarun.me](https://thisisvarun.me).

## Local development

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deployment

Every push to `main` builds the app and deploys the `dist` directory to GitHub Pages through
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The [`CNAME`](CNAME) file keeps
the custom domain attached to the deployed site.
