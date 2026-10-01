# Prep Kitchen

The complete personal meal-prep website, ready for GitHub Pages or Vercel. Includes images, recipe content, scalable ingredients, cooking stages, independent timers, local saved progress, storage guidance and nutrition estimates.

## Host directly on GitHub Pages

1. Extract this ZIP.
2. Create a GitHub repository, for example `prep-kitchen`. For free GitHub Pages hosting, use a public repository.
3. Upload the **contents** of the `prep-kitchen-source` folder into the repository root. `package.json`, `app`, `public` and `.github` must be at the root, not inside another folder. Include `.github/workflows/deploy-pages.yml`; hidden folders can be missed when dragging files through the browser.
4. Commit the files to the `main` branch.
5. In the repository, open **Settings > Pages** and choose **GitHub Actions** as the build source.
6. Open **Actions > Publish Prep Kitchen to GitHub Pages > Run workflow**. Wait for both build and deploy to finish. Later pushes to `main` publish automatically.
7. Open the website URL shown in the successful deployment. For a normal repository it will look like `https://YOUR-USERNAME.github.io/prep-kitchen/`.

The workflow reads the repository's Pages base path automatically, so images and links work for a project repository, a user site or a configured custom domain. No API keys, database or extra repository secrets are needed. Your Pages site is public; cooking progress stays locally on each visitor's device.

Official hosting references:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://nextjs.org/docs/app/guides/static-exports

## Host on Vercel instead

Import your GitHub repository into Vercel. Keep the Next.js framework preset. `vercel.json` contains the build configuration; do not set `GITHUB_PAGES` or `NEXT_PUBLIC_BASE_PATH` for a normal Vercel deployment.

## Run locally

Requires Node.js 22.13 or newer and pnpm. Run:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Then open the local URL printed in the terminal. Use `pnpm build` for a normal production build and `pnpm typecheck` to check TypeScript.

For a static Pages build:

```sh
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/prep-kitchen pnpm build
```

The generated website will be in `out/`. The repository name used in `NEXT_PUBLIC_BASE_PATH` must match your Pages URL; the included workflow handles this automatically.

## Add recipes

Recipe data lives in `lib/recipes.ts`. Add a unique slug, image, ingredients, equipment, nutrition and stage instructions. The homepage lists records automatically and `app/recipes/[slug]/page.tsx` builds the recipe routes. The shared companion is currently tailored to soy-based meal-prep batches; different meal structures can extend its small preference and assembly sections.

## Practical notes

Checks, cooking progress and timers use localStorage on the same browser and device. Timers use actual end timestamps, but alerts require the page to be open; the site does not send phone notifications. Screen-awake support depends on your browser.

Nutrition values are approximate and depend on brands. The Store & reheat view links to official food-safety guidance. The food image is an original AI-generated serving illustration; actual results and cooked weights vary.
