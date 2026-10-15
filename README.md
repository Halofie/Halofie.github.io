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

## Private interviewer galleries

The gallery UI is available at `/gallery/<token>`. Photos must be uploaded to a **private**
Supabase Storage bucket; never add them to `public/` or `src/assets/`.

### Supabase setup

1. Create a Supabase project and install the Supabase CLI.
2. Link the project, then apply the migration:

   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   supabase db push
   ```

3. Set two Edge Function secrets. Keep the admin secret private:

   ```bash
   supabase secrets set GALLERY_ADMIN_SECRET="use-a-long-random-secret"
   supabase secrets set GALLERY_ALLOWED_ORIGIN="https://thisisvarun.me"
   ```

4. Deploy the function:

   ```bash
   supabase functions deploy gallery --no-verify-jwt
   ```

5. Copy `.env.example` to `.env.local`, replace the project reference, and rebuild:

   ```text
   VITE_SUPABASE_FUNCTION_URL=https://YOUR_PROJECT_REF.supabase.co/functions/v1
   ```

   For the GitHub Pages build, add the same value as a repository variable named
   `VITE_SUPABASE_FUNCTION_URL` under **Settings → Secrets and variables → Actions → Variables**.
   The deployment workflow reads this variable during the build.

### Creating a gallery link

Upload images into the private `gallery` bucket in Supabase Storage. Use paths such as
`interviews/2026/demo-1.jpg`, then create a link from a trusted terminal. Do not put the
admin secret in frontend code:

```bash
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/gallery" \
  -H "x-gallery-admin-secret: use-a-long-random-secret" \
  -H "Content-Type: application/json" \
  -d '{"title":"Selected work","description":"A private selection for your interview.","expiresAt":"2026-10-22T23:59:00Z","images":[{"path":"interviews/2026/demo-1.jpg","alt":"Project preview"}]}'
```

The response contains a one-time token. Send this URL to the interviewer:

```text
https://thisisvarun.me/gallery/TOKEN_FROM_RESPONSE
```

The gallery API validates the token and returns image URLs that expire after ten minutes.
The gallery token itself expires at the `expiresAt` value.
